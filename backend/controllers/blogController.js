import Blog from "../models/Blog.js"

export const getAllBlogs = async (req, res) => {
  try {
    const { category, tags, search, featured, page = 1, limit = 10, published = true } = req.query
    
    let query = {}
    
    if (published === 'true') query.isPublished = true
    if (category) query.category = category
    if (featured === 'true') query.isFeatured = true
    if (tags) {
      const tagsArray = tags.split(',')
      query.tags = { $in: tagsArray }
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ]
    }

    const blogs = await Blog.find(query)
      .populate("author", "name email")
      .select("-content") // Exclude full content for list view
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Blog.countDocuments(query)

    res.status(200).json({
      success: true,
      count: blogs.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: blogs,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "name email")
      .populate("comments.user", "name email")
      .populate("comments.replies.user", "name email")

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" })
    }

    // Increment views
    blog.views += 1
    await blog.save()

    res.status(200).json({
      success: true,
      data: blog,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true })
      .populate("author", "name email")
      .populate("comments.user", "name email")
      .populate("comments.replies.user", "name email")

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" })
    }

    // Increment views
    blog.views += 1
    await blog.save()

    res.status(200).json({
      success: true,
      data: blog,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id })
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createBlog = async (req, res) => {
  try {
    const blogData = {
      ...req.body,
      author: req.user.id,
    }

    // Generate slug if not provided
    if (!blogData.slug && blogData.title) {
      blogData.slug = blogData.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/\s+/g, "-")
    }

    const blog = await Blog.create(blogData)
    
    res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      data: blog,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id, author: req.user.id },
      req.body,
      { new: true, runValidators: true }
    )

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found or unauthorized" })
    }

    res.status(200).json({
      success: true,
      message: "Blog post updated successfully",
      data: blog,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ 
      _id: req.params.id, 
      author: req.user.id 
    })
    
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found or unauthorized" })
    }

    res.status(200).json({
      success: true,
      message: "Blog post deleted successfully",
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" })
    }

    const isLiked = blog.likes.includes(req.user.id)
    
    if (isLiked) {
      blog.likes = blog.likes.filter(id => id.toString() !== req.user.id)
    } else {
      blog.likes.push(req.user.id)
    }

    await blog.save()

    res.status(200).json({
      success: true,
      message: isLiked ? "Blog unliked" : "Blog liked",
      data: { likes: blog.likes.length, isLiked: !isLiked },
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const addComment = async (req, res) => {
  try {
    const { content } = req.body
    const blog = await Blog.findById(req.params.id)
    
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" })
    }

    blog.comments.push({
      user: req.user.id,
      content,
    })

    await blog.save()

    // Populate the new comment
    await blog.populate("comments.user", "name email")

    res.status(200).json({
      success: true,
      message: "Comment added successfully",
      data: blog.comments[blog.comments.length - 1],
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const addReply = async (req, res) => {
  try {
    const { content } = req.body
    const { id: blogId, commentId } = req.params
    
    const blog = await Blog.findById(blogId)
    
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" })
    }

    const comment = blog.comments.id(commentId)
    
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" })
    }

    comment.replies.push({
      user: req.user.id,
      content,
    })

    await blog.save()

    // Populate the new reply
    await blog.populate("comments.replies.user", "name email")

    const updatedComment = blog.comments.id(commentId)

    res.status(200).json({
      success: true,
      message: "Reply added successfully",
      data: updatedComment.replies[updatedComment.replies.length - 1],
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getBlogCategories = async (req, res) => {
  try {
    const categories = await Blog.distinct("category")
    
    res.status(200).json({
      success: true,
      data: categories,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getBlogTags = async (req, res) => {
  try {
    const tags = await Blog.distinct("tags")
    
    res.status(200).json({
      success: true,
      data: tags,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
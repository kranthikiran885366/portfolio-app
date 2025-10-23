import Notification from "../models/Notification.js"

export const getMyNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query
    
    const notifications = await Notification.find({ recipient: req.user.id })
      .populate("sender", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const unreadCount = await Notification.countDocuments({ 
      recipient: req.user.id, 
      isRead: false 
    })

    res.status(200).json({
      success: true,
      data: notifications,
      unreadCount,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true })
    
    res.status(200).json({
      success: true,
      message: "Notification marked as read",
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user.id, isRead: false },
      { isRead: true }
    )
    
    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createNotification = async (recipientId, data, io) => {
  try {
    const notification = await Notification.create({
      recipient: recipientId,
      ...data,
    })

    await notification.populate("sender", "name email")

    // Emit real-time notification
    io.to(`user_${recipientId}`).emit("new_notification", notification)

    return notification
  } catch (error) {
    console.error("Error creating notification:", error)
  }
}
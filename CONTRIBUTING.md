# Contributing to Portfolio Builder

We love your input! We want to make contributing to Portfolio Builder as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## Pull Requests

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using GitHub's [issue tracker](https://github.com/kranthikiran885366/portfolio-app/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/kranthikiran885366/portfolio-app/issues/new).

## Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Development Setup

1. Clone the repository
```bash
git clone https://github.com/kranthikiran885366/portfolio-app.git
cd portfolio-app
```

2. Install dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ..
npm install
```

3. Set up environment variables
```bash
# Backend
cp backend/.env.example backend/.env
# Update with your MongoDB URI and JWT secret

# Frontend
cp .env.example .env
# Update with your API URL
```

4. Start development servers
```bash
# Backend (in backend directory)
npm run dev

# Frontend (in root directory)
npm run dev
```

## Code Style

- Use ESLint for JavaScript linting
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

## Commit Messages

- Use clear and meaningful commit messages
- Start with a verb (Add, Fix, Update, Remove, etc.)
- Keep the first line under 50 characters
- Reference issues and pull requests when applicable

Example:
```
Add user authentication middleware

- Implement JWT token validation
- Add role-based access control
- Update API documentation

Fixes #123
```

## Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Include both unit and integration tests where appropriate

## Documentation

- Update README.md if you change functionality
- Add JSDoc comments for new functions
- Update API documentation for endpoint changes

## License

By contributing, you agree that your contributions will be licensed under its MIT License.

## Questions?

Feel free to contact the project maintainers if you have any questions about contributing.
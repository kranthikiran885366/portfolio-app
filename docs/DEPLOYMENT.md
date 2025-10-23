# Deployment Guide

This guide covers deploying the Portfolio Builder application to production environments.

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   (Vercel)      │◄──►│   (Render)      │◄──►│ (MongoDB Atlas) │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Prerequisites

- GitHub account
- Vercel account
- Render account
- MongoDB Atlas account

## Database Setup (MongoDB Atlas)

### 1. Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up or log in
3. Create a new project
4. Build a database (choose free tier for development)
5. Select cloud provider and region
6. Create cluster

### 2. Configure Database Access

1. **Database Access**:
   - Create database user
   - Set username and password
   - Grant read/write access

2. **Network Access**:
   - Add IP address: `0.0.0.0/0` (allow from anywhere)
   - Or add specific Render IP ranges

### 3. Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

## Backend Deployment (Render)

### 1. Prepare Repository

Ensure your repository has:
- `backend/package.json` with start script
- `backend/server.js` as entry point
- Environment variables configured

### 2. Deploy to Render

1. Go to [Render](https://render.com)
2. Sign up/log in and connect GitHub
3. Click "New +" → "Web Service"
4. Select your repository
5. Configure service:
   - **Name**: `portfolio-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 3. Environment Variables

Add these environment variables in Render:

```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-make-it-long-and-random
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### 4. Custom Domain (Optional)

1. Go to Settings → Custom Domains
2. Add your domain
3. Configure DNS records as instructed

## Frontend Deployment (Vercel)

### 1. Prepare Repository

Ensure your repository has:
- `package.json` in root directory
- `vite.config.js` configured
- Build command: `npm run build`
- Output directory: `dist`

### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign up/log in and connect GitHub
3. Import your repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3. Environment Variables

Add these environment variables in Vercel:

```env
VITE_API_URL=https://your-backend-domain.onrender.com/api
```

### 4. Custom Domain (Optional)

1. Go to Settings → Domains
2. Add your domain
3. Configure DNS records as instructed

## Environment Configuration

### Backend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port | `10000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | JWT signing secret | `super-secret-key-256-bits` |
| `FRONTEND_URL` | Frontend domain for CORS | `https://app.example.com` |

### Frontend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://api.example.com/api` |

## SSL/HTTPS Configuration

Both Vercel and Render provide automatic SSL certificates:

- **Vercel**: Automatic SSL for all domains
- **Render**: Automatic SSL for .onrender.com domains and custom domains

## Performance Optimization

### Backend (Render)

1. **Enable HTTP/2**: Automatic on Render
2. **Gzip Compression**: Configure in Express
3. **Caching Headers**: Set appropriate cache headers
4. **Database Indexing**: Ensure proper MongoDB indexes

### Frontend (Vercel)

1. **Static Asset Optimization**: Automatic on Vercel
2. **Image Optimization**: Use Vercel's image optimization
3. **Code Splitting**: Vite handles this automatically
4. **CDN**: Global CDN included with Vercel

## Monitoring and Logging

### Backend Monitoring

1. **Render Logs**: Available in Render dashboard
2. **Health Checks**: Implement `/health` endpoint
3. **Error Tracking**: Consider Sentry integration
4. **Performance**: Monitor response times

### Frontend Monitoring

1. **Vercel Analytics**: Built-in analytics
2. **Error Tracking**: Consider Sentry integration
3. **Performance**: Use Lighthouse CI
4. **User Analytics**: Consider Google Analytics

## Backup and Recovery

### Database Backups

MongoDB Atlas provides:
- Continuous backups
- Point-in-time recovery
- Cross-region backups
- Automated backup scheduling

### Application Backups

- Code is backed up in GitHub
- Environment variables should be documented
- Database connection strings should be secure

## Security Considerations

### Backend Security

1. **Environment Variables**: Never commit secrets
2. **CORS Configuration**: Restrict to known domains
3. **Rate Limiting**: Implement API rate limiting
4. **Input Validation**: Validate all user inputs
5. **Authentication**: Use secure JWT practices

### Frontend Security

1. **Environment Variables**: Only expose VITE_ prefixed vars
2. **Content Security Policy**: Configure CSP headers
3. **HTTPS Only**: Ensure all traffic is encrypted
4. **Dependency Updates**: Keep dependencies updated

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Check FRONTEND_URL in backend environment
   - Verify CORS configuration in server.js

2. **Database Connection**:
   - Verify MongoDB URI format
   - Check network access settings in Atlas
   - Ensure password is URL encoded

3. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Check build logs for specific errors

4. **Environment Variables**:
   - Ensure all required variables are set
   - Check variable names (case sensitive)
   - Verify values are correct

### Debugging Steps

1. **Check Logs**:
   - Render: Service logs in dashboard
   - Vercel: Function logs in dashboard

2. **Test Endpoints**:
   - Use curl or Postman to test API
   - Check network tab in browser dev tools

3. **Verify Environment**:
   - Check environment variables are loaded
   - Test database connection

## Scaling Considerations

### Horizontal Scaling

- **Render**: Upgrade to higher tier plans
- **Vercel**: Automatic scaling included
- **MongoDB Atlas**: Upgrade cluster tier

### Performance Optimization

- **Caching**: Implement Redis for session storage
- **CDN**: Use for static assets
- **Database**: Optimize queries and indexes
- **Load Balancing**: Consider multiple backend instances

## Cost Optimization

### Free Tier Limits

- **Render**: 750 hours/month free
- **Vercel**: 100GB bandwidth/month free
- **MongoDB Atlas**: 512MB storage free

### Cost Monitoring

- Set up billing alerts
- Monitor usage regularly
- Optimize resource usage
- Consider reserved instances for production

## Maintenance

### Regular Tasks

1. **Update Dependencies**: Monthly security updates
2. **Monitor Performance**: Weekly performance reviews
3. **Backup Verification**: Monthly backup tests
4. **Security Audits**: Quarterly security reviews

### Automated Tasks

- Dependency updates with Dependabot
- Automated testing with GitHub Actions
- Performance monitoring with alerts
- Backup verification scripts
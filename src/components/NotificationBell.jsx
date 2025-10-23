import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useSocket } from '../hooks/useSocket'
import { apiCall } from '../services/api'
import './NotificationBell.css'

const NotificationBell = () => {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const socket = useSocket(import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000', user?.id)

  useEffect(() => {
    if (user) {
      fetchNotifications()
    }
  }, [user])

  useEffect(() => {
    if (socket && user) {
      socket.on('new_notification', (notification) => {
        setNotifications(prev => [notification, ...prev])
        setUnreadCount(prev => prev + 1)
      })

      return () => {
        socket.off('new_notification')
      }
    }
  }, [socket, user])

  const fetchNotifications = async () => {
    try {
      const response = await apiCall('/notifications')
      setNotifications(response.data)
      setUnreadCount(response.unreadCount)
    } catch (error) {
      console.error('Error fetching notifications:', error)
    }
  }

  const markAsRead = async (id) => {
    try {
      await apiCall(`/notifications/${id}/read`, { method: 'PUT' })
      setNotifications(prev => 
        prev.map(notif => 
          notif._id === id ? { ...notif, isRead: true } : notif
        )
      )
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  if (!user) return null

  return (
    <div className="notification-bell">
      <button 
        className="bell-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Notifications</h3>
          </div>
          
          <div className="notification-list">
            {notifications.length > 0 ? (
              notifications.slice(0, 5).map((notification) => (
                <div 
                  key={notification._id}
                  className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                  onClick={() => !notification.isRead && markAsRead(notification._id)}
                >
                  <div className="notification-content">
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                  </div>
                  {!notification.isRead && <div className="unread-dot"></div>}
                </div>
              ))
            ) : (
              <div className="no-notifications">
                <span>🔔</span>
                <p>No notifications</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationBell
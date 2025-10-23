import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

export const useSocket = (serverPath, userId) => {
  const socket = useRef()

  useEffect(() => {
    if (userId) {
      socket.current = io(serverPath)
      
      socket.current.on('connect', () => {
        socket.current.emit('join-room', `user_${userId}`)
      })

      return () => {
        socket.current.disconnect()
      }
    }
  }, [serverPath, userId])

  return socket.current
}
'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function useAuthHook() {
  const router = useRouter()
  useEffect(() => {
    const isAuth = localStorage.getItem('access-token')
    if (!isAuth) {
      router.push('/login')
    }
    setTimeout(() => {
      localStorage.removeItem('access-token')
      router.push('/login')
      alert('Your session has expired. Please login again.')
    }, 300000)
  }, [router])
  return { accessToken: localStorage.getItem('access-token') }
}

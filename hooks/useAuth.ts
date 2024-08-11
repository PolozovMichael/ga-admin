import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function useAuth() {
  const router = useRouter()
  useEffect(() => {
    const isAuth = localStorage.getItem('authenticated')
    if (!isAuth) {
      router.push('/login')
    } else {
      router.push('/')
    }
  }, [router])
}

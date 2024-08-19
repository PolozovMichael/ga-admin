'use client'

import useAuthHook from '@/hooks/useAuth'
import { createContext, useContext } from 'react'

type AuthContextType = {
  accessToken: string
}

const AuthContext = createContext<AuthContextType>({
  accessToken: '',
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useAuthHook()

  const value = {
    accessToken: user?.accessToken || ('' as string),
  }
  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  )
}

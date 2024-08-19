'use client'

import { Charts } from '@/components/Charts'
import { DataTable } from '@/components/Table'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
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
  return (
    <div className="mx-auto w-full gap-5 flex flex-col overflow-y-scroll">
      <div className="w-full flex gap-3">
        <Charts />
      </div>
      <h1 className="text-2xl font-semibold mt-2">List of clients</h1>
      <DataTable />
    </div>
  )
}

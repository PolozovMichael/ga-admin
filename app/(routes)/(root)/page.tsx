'use client'

import { Charts } from '@/components/Charts'
import { DataTable } from '@/components/Table'
import { Form } from '@/components/Form'
import React from 'react'
import useAuth from '@/hooks/useAuth'

export default function Home() {
  useAuth()
  return (
    <div className="mx-auto w-full gap-5 flex flex-col overflow-y-scroll">
      <div className="w-full flex gap-3">
        <Form />
        <Charts />
      </div>
      <h1 className="text-2xl font-semibold mt-2">List of clients</h1>
      <DataTable />
    </div>
  )
}

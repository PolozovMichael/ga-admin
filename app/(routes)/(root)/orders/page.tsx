import { DataTableOrders } from '@/components/TableOrders'
import React from 'react'
import { OrderForm } from '@/components/OrderForm'

export default function Orders() {
  return (
    <section className="w-full h-screen flex gap-5 flex-col overflow-y-auto">
      <h1 className="text-2xl font-semibold mt-2">List of orders</h1>
      <OrderForm />
      <div>
        <DataTableOrders />
      </div>
    </section>
  )
}

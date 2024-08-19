import CreateAppointmentForm from '@/components/createAppointmentForm'
import { ListOfServicesTable } from '@/components/ListOfServicesTable'
import { ListOfSubServicesTable } from '@/components/ListOfSubServicesTable'
import { ServicesTable } from '@/components/ServicesTable'
import { TableAppointments } from '@/components/TableAppointments'
import React from 'react'

export default function ServicesPage() {
  return (
    <section className="w-full h-screen overflow-y-auto flex-col space-y-2 gap-5">
      <h1 className="text-2xl font-semibold">List of services</h1>
      <h3 className="text-lg font-medium text-gray-500">
        Services application and settings
      </h3>
      <CreateAppointmentForm />
      <ServicesTable />
      <div className="w-full flex gap-5">
        <ListOfServicesTable />
        <ListOfSubServicesTable />
      </div>
      <TableAppointments />
    </section>
  )
}

import { CategoriesTable } from '@/components/CategoriesTable'
import CreateCategoryForm from '@/components/CreateCategoryForm'
import { ProductsTable } from '@/components/ProductsTable'
import { DataTable } from '@/components/Table'
import React from 'react'

export default function page() {
  return (
    <section className="w-full h-screen flex-col gap-5 overflow-y-auto">
      <h1 className="text-2xl font-semibold">List of products</h1>
      <div className="flex-col mt-5 gap-5">
        <CreateCategoryForm />
        <CategoriesTable />
        <ProductsTable />
      </div>
    </section>
  )
}

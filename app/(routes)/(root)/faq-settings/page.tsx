import { DataTableFAQs } from '@/components/TableFAQs'
import { FAQForm } from '@/components/FAQForm'
import { revalidatePath } from 'next/cache'



export default function FAQPage() {
  return (
    <section className="w-full h-screen overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-5">FAQ Settings Page</h1>
      <div className="w-full h-full flex-col gap-5">
        <FAQForm />
        <DataTableFAQs />
      </div>
    </section>
  )
}

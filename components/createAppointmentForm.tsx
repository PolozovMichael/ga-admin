'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { useState } from 'react'
import { Label } from './ui/label'

export const formSchema = z.object({
  comments: z.string().min(1),
  full_name: z.string().min(1),
  phone_number: z.string().min(1),
})

export default function CreateAppointmentForm() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comments: '',
      full_name: '',
      phone_number: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    try {
      setIsLoading(true)
      const res = await fetch('http://ga-api.13lab.tech/api/v1/appointments', {
        method: 'POST',
        body: JSON.stringify({
          staff_id: 1,
          start_time: Date.now().toString(),
          service_item_id: 2,
          comments: values.comments,
          full_name: values.full_name,
          phone_number: values.phone_number,
        }),
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      })
      if (res.ok) {
        toast.success('Appointment created successfully!')
      }
    } catch (error) {
      console.log(error)
      toast.error('Error creating appointment')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="Content">Comments to appointment</Label>
              <FormControl>
                <Input className="rounded-[12px]" id="comments" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="Fullname">Fullname</Label>
              <FormControl>
                <Input className="rounded-[12px]" id="Fullname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="Phone">Phone number</Label>
              <FormControl>
                <Input className="rounded-[12px]" id="Phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="ml-2 rounded-[12px]"
          disabled={isLoading}
        >
          Create an appointment
        </Button>
      </form>
    </Form>
  )
}

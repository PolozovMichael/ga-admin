'use client'

import React, { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from 'sonner'

export const formSchema = z.object({
  name: z.string().min(2),
})

export default function CreateSubServiceForm() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      const res = await fetch(
        'http://ga-api.13lab.tech/api/v1/admin/subservices',
        {
          method: 'POST',
          body: JSON.stringify({
            name: values.name,
            service_id: 2,
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
          },
        },
      )
      if (res.ok) {
        toast.success('Service created successfully!')
      }
    } catch (error) {
      toast.error('Failed to create a service!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subervice name</FormLabel>
              <FormControl>
                <Input
                  className="rounded-[12px]"
                  id="name"
                  placeholder="New subservice name..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="rounded-[12px]">
          {isLoading ? 'Loading...' : 'Create'}
        </Button>
      </form>
    </Form>
  )
}

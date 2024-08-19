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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from 'sonner'

interface EditSubCtFormProps {
  category_id: string
  subcategory_id: string
  old_name: string
}

export const formSchema = z.object({
  new_name: z.string().min(2),
})

export default function EditSubCtForm({
  category_id,
  subcategory_id,
  old_name,
}: EditSubCtFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      new_name: old_name,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      const res = await fetch(
        `http://ga-api.13lab.tech/api/v1/admin/subcategories/${subcategory_id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            name: values.new_name,
            category_id: category_id,
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
          },
        },
      )
      if (res.ok) {
        toast.success('Subcategory updated successfully!')
      }
    } catch (error) {
      toast.error('Failed to update Subcategory!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="new_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subcategory name</FormLabel>
              <FormControl>
                <Input
                  className="rounded-[12px]"
                  id="new_name"
                  defaultValue={old_name}
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

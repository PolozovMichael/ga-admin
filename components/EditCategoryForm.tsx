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

interface EditCategoryFormProps {
  id: string
  name: string
}

export const formSchema = z.object({
  name: z.string().min(2),
})

export default function EditCategoryForm({ id, name }: EditCategoryFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      const res = await fetch(
        `http://ga-api.13lab.tech/api/v1/admin/categories/${id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            name: values.name,
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
          },
        },
      )
      if (res.ok) {
        toast.success('Category updated successfully!')
      }
    } catch (error) {
      toast.error('Failed to update category!')
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
              <FormLabel>Category name</FormLabel>
              <FormControl>
                <Input
                  className="rounded-[12px]"
                  id="name"
                  placeholder="New category name..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="rounded-[12px]">
          {isLoading ? 'Loading...' : 'Save changes'}
        </Button>
      </form>
    </Form>
  )
}

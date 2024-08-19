'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const formSchema = z.object({
  name: z.string().min(2).max(50),
})

export default function CreateCategoryForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [fetchedData, setFetchedData] = useState([])

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
        'http://ga-api.13lab.tech/api/v1/admin/categories',
        {
          method: 'POST',
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
        toast.success('Category created successfully!')
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to create category!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-[450px] rounded-[15px]">
      <CardHeader>
        <CardTitle>Create a new category</CardTitle>
      </CardHeader>
      <CardContent>
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
                      placeholder="Enter a category name..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="rounded-[12px]">
              Create
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

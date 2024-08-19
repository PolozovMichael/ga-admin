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
import { DialogClose } from './ui/dialog'
import { Label } from './ui/label'

export const formSchema = z.object({
  Name: z.string().min(2),
  Content: z.string().min(2),
})

export default function ChangeFAQForm({
  id,
  name,
  content,
}: {
  id: string
  name: string
  content: string
}) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: name,
      Content: content,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    try {
      setIsLoading(true)
      const res = await fetch(
        `http://ga-api.13lab.tech/api/v1/admin/profile-sections/${id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            name: values.Name,
            content: values.Content,
          }),
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
          },
        },
      )

      if (res.ok) {
        toast.success('FAQ updated successfully')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="Name"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="Name">Question name</Label>
              <FormControl>
                <Input className="rounded-[12px]" id="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Content"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="Content">Question content</Label>
              <FormControl>
                <Input className="rounded-[12px]" id="Content" {...field} />
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
          Save changes
        </Button>
      </form>
    </Form>
  )
}

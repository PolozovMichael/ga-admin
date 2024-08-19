'use client'

import * as React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { revalidatePath } from 'next/cache'

export const formSchema = z.object({
  question: z.string().min(2),
  answer: z.string().min(2),
})

export function FAQForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
      answer: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    try {
      const res = await fetch(
        'http://ga-api.13lab.tech/api/v1/admin/profile-sections',
        {
          method: 'POST',
          body: JSON.stringify({
            name: values.question,
            content: values.answer,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
          },
        },
      )
      if (res.ok) {
        toast.success('FAQ created successfully')
      }
      revalidatePath('/faq-settings')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card className="w-[450px] rounded-[15px]">
      <CardHeader>
        <CardTitle>Add FAQ</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question name</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-[12px]"
                      id="name"
                      placeholder="your question..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name">Answer</Label>
                  <FormControl>
                    <Input
                      className="rounded-[12px]"
                      id="name"
                      placeholder="your question..."
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

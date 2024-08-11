'use client'

import { useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const formPhoneSchema = z.object({
  phoneNumber: z.string().min(2).max(50),
})

const formOTPSchema = z.object({
  otp: z.string().length(4),
})

export default function LoginForm() {
  const router = useRouter()

  const [isSubmittingPhoneForm, setIsSubmittingPhoneForm] = useState(false)
  const [isSubmittingOTPForm, setIsSubmittingOTPForm] = useState(false)

  const [phoneNumber, setPhoneNumber] = useState('')
  const [OTP, setOTP] = useState('')

  const phoneForm = useForm<z.infer<typeof formPhoneSchema>>({
    resolver: zodResolver(formPhoneSchema),
    defaultValues: {
      phoneNumber: '',
    },
  })

  const otpForm = useForm<z.infer<typeof formOTPSchema>>({
    resolver: zodResolver(formOTPSchema),
    defaultValues: {
      otp: '',
    },
  })

  async function onPhoneSubmit(values: z.infer<typeof formPhoneSchema>) {
    try {
      setIsSubmittingPhoneForm(true)
      console.log(values.phoneNumber)
      setPhoneNumber(values.phoneNumber)
      const res = await fetch('http://ga-api.13lab.tech/api/v1/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phoneNumber }),
      })
      if (res.ok) toast.success('OTP sent successfully.')
    } catch (error) {
      console.log(error)
      toast.error('An error occurred while processing the request.')
    } finally {
      setIsSubmittingPhoneForm(false)
    }
  }

  async function onOTPSubmit(values: z.infer<typeof formOTPSchema>) {
    try {
      setIsSubmittingOTPForm(true)
      setOTP(values.otp)
      console.log(values.otp)
      const res = await fetch(
        'http://ga-api.13lab.tech/api/v1/auth/verify-otp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phone: phoneNumber, otp: OTP }),
        },
      )
      console.log(res)
      if (res.ok) {
        toast.success('OTP verified successfully.')
        localStorage.setItem('authenticated', 'true')
        router.push('/')
      }
    } catch (error) {
      console.log(error)
      toast.error('An error occurred while processing the request.')
    } finally {
      setIsSubmittingOTPForm(false)
    }
  }

  return (
    <Tabs defaultValue="phone" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="phone">OTP Request</TabsTrigger>
        <TabsTrigger value="otp">OTP Verification</TabsTrigger>
      </TabsList>
      <TabsContent value="phone">
        <Card>
          <CardHeader>
            <CardTitle>OTP Request</CardTitle>
            <CardDescription>Enter your phone number.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...phoneForm}>
              <form
                onSubmit={phoneForm.handleSubmit(onPhoneSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={phoneForm.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your phone number.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">
                  {isSubmittingPhoneForm
                    ? 'Processing...'
                    : 'Submit phone number'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="otp">
        <Card>
          <CardHeader>
            <CardTitle>OTP verification</CardTitle>
            <CardDescription>Verify your OTP code.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Form {...otpForm}>
              <form
                onSubmit={otpForm.handleSubmit(onOTPSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter your OTP code</FormLabel>
                      <FormControl>
                        <Input placeholder="OTP code..." {...field} />
                      </FormControl>
                      <FormDescription>This is your OTP code.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">
                  {isSubmittingOTPForm ? 'Processing...' : 'Submit OTP Code'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

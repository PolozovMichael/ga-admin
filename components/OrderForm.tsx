import * as React from 'react'

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function OrderForm() {
  return (
    <Card className="w-[450px] rounded-[15px]">
      <CardHeader>
        <CardTitle>Create order</CardTitle>
        <CardDescription>Create order.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Username or email</Label>
              <Input
                className="rounded-[12px]"
                id="name"
                placeholder="Email..."
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Order name</Label>
              <Input
                className="rounded-[12px]"
                id="name"
                placeholder="Order name..."
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="rounded-[12px]" variant="outline">
          Cancel
        </Button>
        <Button className="rounded-[12px]">Create</Button>
      </CardFooter>
    </Card>
  )
}

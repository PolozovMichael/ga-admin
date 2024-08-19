import React, { useState } from 'react'
import { Button } from './ui/button'
import { toast } from 'sonner'

export default function DeleteSubServiceBtn({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit() {
    try {
      setIsLoading(true)
      const res = await fetch(
        `http://ga-api.13lab.tech/api/v1/admin/subservices/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
          },
        },
      )
      if (res.ok) {
        toast.success('Subservice deleted successfully!')
      }
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Button
      onClick={onSubmit}
      className="rounded-[12px] bg-white text-black hover:text-white"
      variant="outline"
    >
      {isLoading ? 'Deleting...' : 'Delete subservice'}
    </Button>
  )
}

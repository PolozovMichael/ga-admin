import React, { useEffect, useState } from 'react'
import { EditIcon, Plus, X } from 'lucide-react'
import { toast } from 'sonner'
import { ScrollArea } from './ui/scroll-area'
import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import EditCategoryForm from './EditCategoryForm'
import CreateSubCtForm from './CreateSubCtForm'
import EditSubCtForm from './EditSubCtForm'
import DeleteSubCtnForm from './DeleteSubCtnForm'

type Subcategory = {
  id: string
  name: string
}

export default function SubcategoriesList({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [fetchedData, setFetchedData] = useState<Subcategory[]>([])

  useEffect(() => {
    async function getSubcategories() {
      try {
        setIsLoading(true)
        const res = await fetch(
          `http://ga-api.13lab.tech/api/v1/categories/${id}/subcategories`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access-token')}`,
            },
          },
        )

        if (res.ok) {
          toast.success('Data fetched successfully')
          const data = await res.json()
          setFetchedData(data.payload)
        }
      } catch (error) {
        toast.error('Failed to get Subcategories!')
      } finally {
        setIsLoading(false)
      }
    }
    getSubcategories()
  }, [])

  return (
    <div className="h-fit flex-col gap-5 w-full rounded-[12px] border p-2">
      <div className="flex w-full items-center justify-between">
        {isLoading ? (
          <p>Loading...</p>
        ) : fetchedData.length === 0 ? (
          <div className="w-full flex items-center justify-between">
            <h3 className="truncate">-- No data found --</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="rounded-[12px]">
                  <Plus className="cursor-pointer" height={15} width={15} />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create a new subcategory.</DialogTitle>
                </DialogHeader>
                <CreateSubCtForm category_id={id} />
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <ScrollArea className="h-fit flex-col gap-2 p-1 w-full">
            {fetchedData.map((subcategory) => (
              <div className="flex items-center justify-between">
                <h3 key={subcategory.id}>{subcategory.name}</h3>
                <div className="flex gap-1">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="rounded-[12px]">
                        <Plus
                          className="cursor-pointer"
                          height={15}
                          width={15}
                        />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Create a new subcategory.</DialogTitle>
                      </DialogHeader>
                      <CreateSubCtForm category_id={id} />
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="rounded-[12px]">
                        <EditIcon
                          className="cursor-pointer"
                          height={15}
                          width={15}
                        />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Change a subcategory.</DialogTitle>
                      </DialogHeader>
                      <EditSubCtForm
                        category_id={id}
                        subcategory_id={subcategory.id}
                        old_name={subcategory.name}
                      />
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="rounded-[12px]">
                        <X className="cursor-pointer" height={15} width={15} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] flex-col">
                      <DialogHeader>
                        <DialogTitle>Delete a subcategory.</DialogTitle>
                      </DialogHeader>
                      <DialogFooter className="w-full flex justify-between">
                        <DialogClose asChild>
                          <Button
                            type="button"
                            className="rounded-[12px]"
                            variant="secondary"
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                        <DeleteSubCtnForm id={subcategory.id} />
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </ScrollArea>
        )}
      </div>
    </div>
  )
}

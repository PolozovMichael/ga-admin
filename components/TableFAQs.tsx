'use client'

import * as React from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from 'sonner'
import { revalidatePath } from 'next/cache'
import ChangeFAQForm from './changeFAQForm'
import { Input } from './ui/input'
import { useState } from 'react'

export type Question = {
  Id: string
  Content: string
  Name: string
  ParentId?: null
  ProfileSections?: null
}

let data: Question[] = []

export function DeleteFAQBtn({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false)

  async function deleteFAQ() {
    try {
      setIsLoading(true)
      const res = await fetch(
        `http://ga-api.13lab.tech/api/v1/admin/profile-sections/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
          },
        },
      )
      if (res.ok) {
        toast.success('FAQ deleted successfully')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={deleteFAQ}
      className="rounded-[12px] bg-white text-black hover:text-white"
      variant="outline"
    >
      {isLoading ? 'Deleting...' : 'Delete FAQ'}
    </Button>
  )
}

export const columns: ColumnDef<Question>[] = [
  {
    accessorKey: 'Id',
    header: 'Question ID',
    cell: ({ row }) => <div className="capitalize">{row.getValue('Id')}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'Name',
    header: 'Question name',
    cell: ({ row }) => <div className="capitalize">{row.getValue('Name')}</div>,
  },
  {
    accessorKey: 'Content',
    header: 'Question answer',
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue('Content') || '-- No data --'}
      </div>
    ),
  },
  {
    id: 'Edit',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="rounded-[15px] bg-secondary">
              Edit FAQ
            </Button>
          </DialogTrigger>
          <DialogContent
            aria-describedby="dialog-description"
            className="sm:max-w-[325px]"
          >
            <DialogHeader>
              <DialogTitle>Edit FAQ</DialogTitle>
            </DialogHeader>
            <ChangeFAQForm
              id={row.getValue('Id')}
              name={row.getValue('Name')}
              content={row.getValue('Content')}
            />
          </DialogContent>
        </Dialog>
      )
    },
  },
  {
    id: 'Delete',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="rounded-[15px] bg-secondary">
              Delete FAQ
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to delete this FAQ?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  className="rounded-[12px]"
                  variant="secondary"
                >
                  Cancel
                </Button>
              </DialogClose>
              <DeleteFAQBtn id={row.getValue('Id')} />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
    },
  },
]

export function DataTableFAQs() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [faqData, setFaqData] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    async function fetchFAQ() {
      try {
        setIsLoading(true)
        const response = await fetch(
          'http://ga-api.13lab.tech/api/v1/profile-sections',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access-token')}`,
            },
          },
        )
        const resData = await response.json()
        setFaqData(resData.payload)
        revalidatePath('/faq-settings')
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchFAQ()
  }, [])

  data = faqData

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter questions..."
          value={(table.getColumn('Name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('Name')?.setFilterValue(event.target.value)
          }
          className="max-w-md rounded-[12px]"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto rounded-[12px]">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-[12px]" align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize rounded-[15px]"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-[12px] border">
        <Table className="bg-card rounded-[12px]">
          <TableHeader className="rounded-[12px]">
            {table?.getHeaderGroups().map((headerGroup) => (
              <TableRow className="rounded-[12px]" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="rounded-[12px]">
            {table?.getRowModel().rows?.length ? (
              table?.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center rounded-[12px]"
                >
                  {isLoading ? 'Loading...' : 'No data found'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            className="rounded-[12px]"
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            className="rounded-[12px]"
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

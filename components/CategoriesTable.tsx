'use client'

import * as React from 'react'
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

import { ScrollArea } from '@/components/ui/scroll-area'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from 'sonner'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import EditCategoryForm from './EditCategoryForm'
import { useState } from 'react'
import SubcategoriesList from './SubcategoriesList'

export type Category = {
  id: string
  name: string
  subcategories: { id: string; name: string }[]
}

export function DeleteCategoryBtn({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false)

  async function deleteCategory() {
    try {
      setIsLoading(true)
      const res = await fetch(
        `http://ga-api.13lab.tech/api/v1/admin/categories/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
          },
        },
      )
      if (res.ok) {
        toast.success('Category deleted successfully')
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to delete category')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={deleteCategory}
      className="rounded-[12px] bg-white text-black hover:text-white"
      variant="outline"
    >
      {isLoading ? 'Deleting...' : 'Delete FAQ'}
    </Button>
  )
}

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <div className="capitalize">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'name',
    header: 'Category name',
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'subcategories',
    header: 'Subcategory name',
    cell: ({ row }) => {
      return <SubcategoriesList id={row.getValue('id')} />
    },
  },
  {
    id: 'Edit',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="rounded-[15px] bg-secondary">
              Edit Category
            </Button>
          </DialogTrigger>
          <DialogContent
            aria-describedby="dialog-description"
            className="sm:max-w-[325px]"
          >
            <DialogHeader>
              <DialogTitle>Edit category</DialogTitle>
            </DialogHeader>
            <EditCategoryForm
              id={row.getValue('id')}
              name={row.getValue('name')}
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
              <DeleteCategoryBtn id={row.getValue('id')} />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-[12px]" align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy category ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function CategoriesTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(false)
  const [fetchedData, setFetchedData] = React.useState([])

  async function getData() {
    try {
      setIsLoading(true)
      const res = await fetch('http://ga-api.13lab.tech/api/v1/categories', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      })
      if (res.ok) {
        toast.success('Data fetched successfully')
        const categories = await res.json()
        setFetchedData(categories.payload)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    getData()
  }, [])

  console.log(fetchedData)
  const data = fetchedData

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
          placeholder="Filter categories..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm rounded-[12px]"
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
                    className="capitalize"
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
            {table.getHeaderGroups().map((headerGroup) => (
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
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
                  No results.
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

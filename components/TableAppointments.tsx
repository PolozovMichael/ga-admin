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
  UserId: string
  User: string
  StaffId: string
  Staff: {
    Id: string
    FullName: string
    Occupation: string
    Experience: string
    ServiceId: string
    ServiceAddressId: string
  }
  StartTime: Date
  EndTime: Date
  ServiceItemId: string
  ServiceItemDomain: {
    Id: string
    Title: string
    Duration: string
    Description: string
    Price: string
    SubServiceId: string
  }
  Comments: string
  Status: string
  FullName: string
  PhoneNumber: string
}

let data: Question[] = []

export const columns: ColumnDef<Question>[] = [
  {
    accessorKey: 'Id',
    header: 'Appointment ID',
    cell: ({ row }) => <div className="capitalize">{row.getValue('Id')}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'User',
    header: 'User',
    cell: ({ row }) => <div className="capitalize">{row.getValue('User')}</div>,
    enableSorting: true,
    enableHiding: false,
  },

  {
    accessorKey: 'Staff',
    header: 'Staff fullname',
    cell: ({ row }) => {
      const data = row.getValue('Staff') as {
        Id: string
        FullName: string
        Occupation: string
        Experience: string
        ServiceId: string
        ServiceAddressId: string
      }
      return <div className="capitalize">{data.FullName}</div>
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'Staff',
    header: 'Staff occupation',
    cell: ({ row }) => {
      const data = row.getValue('Staff') as {
        Id: string
        FullName: string
        Occupation: string
        Experience: string
        ServiceId: string
        ServiceAddressId: string
      }
      return <div className="capitalize">{data.Occupation}</div>
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'Staff',
    header: 'Staff Experience',
    cell: ({ row }) => {
      const data = row.getValue('Staff') as {
        Id: string
        FullName: string
        Occupation: string
        Experience: string
        ServiceId: string
        ServiceAddressId: string
      }
      return <div className="capitalize">{data.Experience}</div>
    },
    enableSorting: true,
    enableHiding: false,
  },

  {
    accessorKey: 'StartTime',
    header: 'Start time',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('StartTime')}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'EndTime',
    header: 'End time',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('EndTime')}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'Comments',
    header: 'Comments',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('Comments')}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'Status',
    header: 'Status',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('Status')}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'FullName',
    header: 'FullName',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('FullName')}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },

  {
    accessorKey: 'PhoneNumber',
    header: 'Phone number',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('PhoneNumber')}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
]

export function TableAppointments() {
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
          'http://ga-api.13lab.tech/api/v1/admin/appointments',
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

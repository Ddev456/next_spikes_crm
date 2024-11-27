"use client";

import {
  type SortingState,
  type ColumnDef,
  type ColumnFiltersState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExportIcon } from "@/app/assets/icons/ExportIcon";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClientStore } from "@/app/store/clientStore";
import { useToast } from "@/components/ui/use-toast";
import { getToken } from "@/app/actions/deals";
import { NewClient } from "./NewClient";

interface DataTableProps<TData extends { documentId: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends { documentId: string }, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const { toast } = useToast();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const { removeClients } = useClientStore();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const removeClientsFromServer = async () => {
    const token = await getToken();
    if (token) {
      try {
        const selectedRows = table.getSelectedRowModel().flatRows;
        const documentIds = selectedRows.map((row) => row.original.documentId);
        await removeClients(token, documentIds);
        toast({
          title: "Client(s) deleted",
          description: "Client(s) deleted successfully",
          duration: 3000,
          variant: "default",
        });
        table.resetRowSelection();
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to delete client(s)",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="w-full max-h-[500px] md:max-h-[700px] no-scrollbar overflow-auto">
      <div className="w-full h-[750px]">
        <div className="w-full flex flex-col items-center py-4 sticky top-0 z-10 bg-[#FFFF]">
          <div className="flex w-full h-[40px] ml-2 items-center">
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
              <>
                <div className="flex-1 text-sm text-muted-foreground">
                  {table.getFilteredSelectedRowModel().rows.length} of{" "}
                  {table.getFilteredRowModel().rows.length} client(s) selected.
                </div>
                <div className="flex items-center gap-2 mr-9">
                  <Button
                    className="text-[12px] flex h-[32px] w-[121px] gap-[12px] rounded-[5px] bg-red-400 hover:bg-red-500"
                    onClick={removeClientsFromServer}
                  >
                    Delete
                  </Button>
                  <Button
                    className="text-[12px] flex h-[32px] w-[121px] gap-[12px] rounded-[5px] bg-blue-400 hover:bg-blue-500"
                    onClick={() => {
                      table.resetRowSelection();
                    }}
                  >
                    Reset Selection
                  </Button>
                </div>
              </>
            )}
          </div>
          <div className="w-full flex flex-row flex-wrap md:flex-nowrap justify-between gap-[20px] items-center">
            <div className="flex gap-[12px]">
              <div
                className="max-w-24 xl:max-w-48 h-8 border flex items-center border-b py-[4px] px-[16px] bg-[#ffffff] text-card-foreground rounded-[8px]"
                cmdk-input-wrapper=""
              >
                <Search className="mr-2 shrink-0 h-[13px] w-[13px]" />
                <Input
                  value={(table.getColumn("Company")?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                    table.getColumn("Company")?.setFilterValue(event.target.value)
                  }
                  className={cn(
                    "h-6 ring-0 border-0 flex rounded-md text-sm outline-none bg-[#ffffff] placeholder:text-card-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="mr-8 flex gap-[8px]">
              <Button
                onClick={() => {
                  toast({
                    title: "Clients exported successfully!",
                    description: new Date(Date.now()).toDateString(),
                  });
                }}
                className="hover:bg-[#E8E7EA] text-[12px] flex gap-[5px] px-[16px] py-[4px] w-[50px] lg:w-[89px] h-[32px] border border-[#E8E7EA] bg-white text-[#101828]"
              >
                <ExportIcon />
                <span className="hidden lg:block">Export</span>
              </Button>
              <NewClient />
            </div>
          </div>
        </div>
        <Table className="relative">
          <TableHeader className="sticky z-1">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="bg-[#F9FAFB]">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="h-fit">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

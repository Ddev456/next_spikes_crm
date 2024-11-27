import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import type { Client } from "@/app/store/clientStore";
import Image from "next/image";

export const columns: ColumnDef<Client>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="hidden lg:flex gap-[12px] lg:px-[24px] py-[12px]">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="hidden lg:flex gap-[12px] lg:px-[24px] py-[12px]">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Company",
    header: () => (
      <div className="font-medium text-[12px] leading-[18px] lg:px-[24px] py-[12px]">
        Company
      </div>
    ),
    cell: ({ row }) => {
      const name = row.original.Company;
      const logoUrl = row.original.Logo?.url;
      
      return (
        <div className="flex text-[#344054] font-medium text-[14px] gap-[12px] lg:px-[24px] py-[12px] items-center">
          {logoUrl ? (
            <Image 
              src={logoUrl}
              alt={name}
              width={24}
              height={24}
              className="rounded-full"
            />
          ) : (
            <div className="w-6 h-6 bg-gray-200 rounded-full" />
          )}
          <span>{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "Add",
    header: () => (
      <div className="font-medium text-[12px] leading-[18px] lg:px-[24px] py-[12px]">
        Add
      </div>
    ),
    cell: ({ row }) => {
      const date = row.original.updatedAt;
        const formattedDate = new Date(date).toLocaleDateString("en-EN", {
            month: "short",
        year: "2-digit",
      });
      return (
        <div className="hidden xl:flex text-[#344054] font-medium text-[14px] gap-[12px] lg:px-[24px] py-[12px] items-center">
          <span>{`${formattedDate.split(" ")[0]}. ${
            formattedDate.split(" ")[1]
          }`}</span>
        </div>
      );
    },
  }
];

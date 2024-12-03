"use client";

import type { Deal } from "@/app/store/store";
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface DealsTableProps {
  deals: Deal[];
}

export const DealsTable = ({ deals }: DealsTableProps) => {
  return <DataTable columns={columns} data={deals} />;
};

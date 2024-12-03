"use client";

import { DataTable } from "./data-table";
import { columns, type DealWithLogo } from "./columns";

interface DealsTableProps {
  deals: DealWithLogo[];
}

export const DealsTable = ({ deals }: DealsTableProps) => {
  return <DataTable<DealWithLogo, unknown> columns={columns} data={deals} />;
};
"use client";

import type { Client } from "@/app/store/clientStore";
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface ClientsTableProps {
  clients: Client[];
}

export const ClientsTable = ({ clients }: ClientsTableProps) => {
  return <DataTable columns={columns} data={clients} />;
};

"use client";

import type { Client } from "@/app/store/clientStore";
import { DataTable } from "./data-table";
import { useClientStore } from "@/app/store/clientStore";
import { useEffect } from "react";
import { getToken } from '@/app/actions/deals';
import { columns } from "./columns";

interface ClientsTableProps {
  clients: Client[];
}

export const ClientsTable = ({ clients }: ClientsTableProps) => {
  const { fetchClients, isLoading, error } = useClientStore();

  useEffect(() => {
    const fetchUserClients = async () => {
      try {
        const token = await getToken();
        if (token) {
          await fetchClients(token);
        } else {
          console.error('No JWT token found');
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchUserClients();
  }, [fetchClients]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <DataTable columns={columns} data={clients} />;
};

import type { Deal } from "@/app/store/store";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useDealStore } from "@/app/store/store";
import { useEffect } from "react";
import { getToken } from '@/app/actions/deals';

interface DealsTableProps {
  deals: Deal[];
}

export const DealsTable = ({ deals }: DealsTableProps) => {
  const { fetchDeals, isLoading, error } = useDealStore();

  useEffect(() => {
    const fetchUserDeals = async () => {
      try {
        const token = await getToken();
        if (token) {
          await fetchDeals(token);
        } else {
          console.error('No JWT token found');
        }
      } catch (error) {
        console.error('Error fetching deals:', error);
      }
    };

    fetchUserDeals();
  }, [fetchDeals]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <DataTable columns={columns} data={deals} />;
};

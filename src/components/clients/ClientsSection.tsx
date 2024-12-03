"use client";

import { ClientsTable } from "./ClientsTable";
import { useClientStore } from "@/app/store/clientStore";
import { useEffect } from "react";
import { getToken } from "@/app/actions/deals";

export const ClientsSection = () => {
  const { clients, fetchClients, isLoading, error } = useClientStore();

  useEffect(() => {
    const loadClients = async () => {
      try {
        const token = await getToken();
        if (token) {
          await fetchClients(token);
        }
      } catch (error) {
        console.error("Error loading clients:", error);
      }
    };

    loadClients();
  }, [fetchClients]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-h-[46rem] md:max-h-[54rem] bg-[#ffffff] rounded-l-[12px] border border-[#DEDEE8] w-full flex flex-col gap-[36px] md:mt-[30px]">
      <div className="mt-[34px] flex gap-[36px] w-full">
        <div className="w-full navigation-tabs flex flex-col gap-[16px] pl-[12px]">
          <h3 className="text-[36px] leading-[44px] font-semibold text-[#344054]">
            Clients
          </h3>
          <ClientsTable clients={clients} />
        </div>
      </div>
    </div>
  );
};

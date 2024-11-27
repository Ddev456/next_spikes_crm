"use client";

import { ClientsTable } from "./ClientsTable";
import { useClientStore } from "@/app/store/clientStore";
export const ClientsSection = () => {
  const { clients } = useClientStore();
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

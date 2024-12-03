"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DealsTable } from "./DealsTable";
import { useState, useEffect } from "react";
import { Statue, useDealStore } from "@/app/store/store";
import { getToken } from "@/app/actions/deals";

export const DealsSection = () => {
  const { deals, fetchDeals, isLoading, error } = useDealStore();
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const loadDeals = async () => {
      try {
        const token = await getToken();
        if (token) {
          await fetchDeals(token);
        } else {
          console.error("No token available");
        }
      } catch (error) {
        console.error("Error in loadDeals:", error);
      }
    };

    loadDeals();
  }, [fetchDeals]);

  const filteredDeals = deals?.filter((deal) => {
    if (activeTab === "all") {
      return true;
    }
    return activeTab === deal.Statue;
  }) || [];

  const filteredDealsWithLogo = filteredDeals.map((deal) => ({
    ...deal,
    Logo: { url: deal.Company?.Logo.url || "" },
  }));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-h-[46rem] md:max-h-[54rem] bg-[#ffffff] rounded-l-[12px] border border-[#DEDEE8] w-full flex flex-col gap-[36px] md:mt-[30px]">
      <div className="mt-[34px] flex gap-[36px] w-full">
        <div className="w-full navigation-tabs flex flex-col gap-[16px] pl-[12px]">
          <h3 className="text-[36px] leading-[44px] font-semibold text-[#344054]">
            Deals
          </h3>
          <Tabs
            onValueChange={(value) => setActiveTab(value)}
            defaultValue="all"
            className="w-full"
          >
            <div className="flex gap-[3px]">
              <TabsList className="mb-[2rem] md:mb-0 flex-wrap max-w-[450px] md:max-w-full md:flex-nowrap">
                <TabsTrigger value="all">All deals</TabsTrigger>
                <TabsTrigger value={Statue.completed}>Completed</TabsTrigger>
                <TabsTrigger value={Statue.pending}>Pending</TabsTrigger>
                <TabsTrigger value={Statue.ongoing}>Ongoing</TabsTrigger>
                <TabsTrigger value={Statue.waiting}>Waiting for confirmation</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all">
              <DealsTable deals={filteredDealsWithLogo} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

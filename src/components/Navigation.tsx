import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DealsTable } from "@/components/deals/DealsTable";

import { useState } from "react";
import { Statue, useDealStore } from "@/app/store/store";

export const Navigation = () => {
  const { deals = [] } = useDealStore();

  const tabs = [
    {
      name: "All deals",
      value: "all",
    },
    {
      name: "Completed",
      value: Statue.completed,
      quantity: deals?.filter((deal) => deal.Statue === Statue.completed)?.length || 0,
    },
    {
      name: "Pending",
      value: Statue.pending,
      quantity: deals?.filter((deal) => deal.Statue === Statue.pending)?.length || 0,
    },
    {
      name: "Ongoing",
      value: Statue.ongoing,
      quantity: deals?.filter((deal) => deal.Statue === Statue.ongoing)?.length || 0,
    },
    {
      name: "Waiting for confirmation",
      value: Statue.waiting,
      quantity: deals?.filter((deal) => deal.Statue === Statue.waiting)?.length || 0,
    },
  ];

  const [activeTab, setActiveTab] = useState("all");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const filteredDeals = deals?.filter((deal) => {
    if (activeTab === "all") {
      return true;
    }
    return activeTab === deal.Statue;
  }) || [];

  return (
    <div className="mt-[34px] flex gap-[36px]">
      <div className="w-full navigation-tabs flex flex-col gap-[16px] pl-[12px]">
        <h3 className="text-[36px] leading-[44px] font-semibold text-[#344054]">
          Deals
        </h3>
        <Tabs
          onValueChange={(value) => handleTabClick(value)}
          defaultValue="all"
          className="w-full"
        >
          <div className="flex gap-[3px]">
            <TabsList className="mb-[2rem] md:mb-0 flex-wrap max-w-[450px] md:max-w-full md:flex-nowrap">
              {tabs.map((tab) => (
                <TabsTrigger
                  aria-describedby={`${tab.value}-tab`}
                  key={tab.value}
                  value={tab.value}
                >
                  {tab.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <DealsTable deals={filteredDeals} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

"use client";

import * as React from "react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { BarChartSquareIcon } from "@/app/assets/icons/BarChartSquareIcon";
import { LayerIcon } from "@/app/assets/icons/LayerIcon";
import { CheckDoneIcon } from "@/app/assets/icons/CheckDoneIcon";
import Link from "next/link";
export function SearchModal() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <>
      <Command>
        <CommandInput onClick={() => setOpen(true)} placeholder="Search" />
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem className="hover:bg-white nav-item-base rounded-[6px] h-[40px] px-[12px] py-[8px] flex gap-[8px]">
                <Link
                  href="#"
                  className="hover:text-[#344054] flex items-center h-[24px] gap-[12px] text-[#344054] font-semibold text-[16px] leading-[24px]"
                >
                  <BarChartSquareIcon />
                  <span>Clients</span>
                </Link>
              </CommandItem>
              <CommandItem className="hover:bg-white nav-item-base rounded-[6px] h-[40px] px-[12px] py-[8px] flex gap-[8px]">
                <Link
                  href="#"
                  className="hover:text-[#344054] flex items-center h-[24px] gap-[12px] text-[#344054] font-semibold text-[16px] leading-[24px]"
                >
                  <LayerIcon />
                  <span>Leads</span>
                </Link>
              </CommandItem>
              <CommandItem className="bg-white nav-item-base rounded-[6px] h-[40px] px-[12px] py-[8px] flex gap-[8px]">
                <Link
                  href="#"
                  className="hover:text-[#344054] flex items-center h-[24px] gap-[12px] text-[#344054] font-semibold text-[16px] leading-[24px]"
                >
                  <CheckDoneIcon />
                  Deals
                </Link>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </Command>
    </>
  );
}

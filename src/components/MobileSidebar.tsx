"use client";

import { HomeLineIcon } from "@/app/assets/icons/HomeLineIcon";
import { BarChartSquareIcon } from "@/app/assets/icons/BarChartSquareIcon";
import { LayerIcon } from "@/app/assets/icons/LayerIcon";
import { CheckDoneIcon } from "@/app/assets/icons/CheckDoneIcon";
import { ArrowDownIcon } from "@/app/assets/icons/ArrowDownIcon";
import { ArrowUpIcon } from "@/app/assets/icons/ArrowUpIcon";
import { AdsIcon } from "@/app/assets/icons/AdsIcon";
import { BellIcon } from "@/app/assets/icons/BellIcon";
import { Badge } from "@/components/ui/badge";
import { SettingsIcon } from "@/app/assets/icons/SettingsIcon";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { UserDropdownMenu } from "@/components/UserDropdownMenu";
import { UserAvatar } from "@/app/assets/UserAvatar";
import { useDealStore } from "@/app/store/store";
import { useEffect, useState } from "react";
import Link from "next/link";

export const MobileSidebar = () => {
  const { deals = [] } = useDealStore((state) => ({
    deals: state.deals ?? [],
  }));
  const [progressQuantity, setProgressQuantity] = useState(13 - (deals?.length || 0));
  const [progress, setProgress] = useState(((deals?.length || 0) / 13) * 100);

  useEffect(() => {
    setProgress(((deals.length) / 13) * 100);
    setProgressQuantity(13 - deals.length);
  }, [deals]);
  return (
    <aside className="h-full flex flex-col justify-around w-[350px] bg-background">
      <div className="w-full aside_links flex flex-col">
        {/* <div className="aside_links_header flex flex-col gap-[10px] items-start px-[16px] py-[9px]">
          <SearchModal />
        </div> */}
        <div className="w-full navigation aside_links_navigation pl-[28px] flex flex-col gap-[4px] px-[32px] py-[6px]">
          <span className="text-[#A0A2A6] text-[14px] leading-[10px] font-semibold">
            Navigation
          </span>
          <ul>
            <li className="hover:bg-white nav-item-base rounded-[6px] h-[32px] px-[12px] py-[4px] flex gap-[8px]">
              <Link
                href="#"
                className="hover:text-[#344054] flex items-center h-[24px] gap-[12px] text-[#344054] font-semibold text-[16px] leading-[10px]"
              >
                <HomeLineIcon />
                <span>Home</span>
              </Link>
            </li>
            <li className="hover:bg-white nav-item-base rounded-[6px] h-[32px] px-[12px] py-[4px] flex gap-[8px]">
              <Link
                href="#"
                className="hover:text-[#344054] flex items-center h-[24px] gap-[12px] text-[#344054] font-semibold text-[16px] leading-[10px]"
              >
                <BarChartSquareIcon />
                <span>Clients</span>
              </Link>
            </li>
            <li className="hover:bg-white nav-item-base rounded-[6px] h-[32px] px-[12px] py-[4px] flex gap-[8px]">
              <Link
                href="#"
                className="hover:text-[#344054] flex items-center h-[24px] gap-[12px] text-[#344054] font-semibold text-[16px] leading-[10px]"
              >
                <LayerIcon />
                <span>Leads</span>
              </Link>
            </li>
            <li className="bg-white nav-item-base rounded-[6px] h-[32px] px-[12px] py-[4px] flex gap-[8px]">
              <Link
                href="#"
                className="hover:text-[#344054] flex items-center h-[24px] gap-[12px] text-[#344054] font-semibold text-[16px] leading-[10px]"
              >
                <CheckDoneIcon />
                Deals
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full aside_links_lists pl-[28px] flex flex-col gap-[4px] py-[6px] px-[32px]">
          <span className="text-[#A0A2A6] text-[14px] leading-[10px] font-semibold">
            Your lists
          </span>
          <ul>
            <li className="hover:bg-white nav-item-base rounded-[6px] h-[32px] px-[12px] py-[4px] flex gap-[8px]">
              <Link
                href="#"
                className="hover:text-[#344054] flex items-center h-[24px] gap-[12px] text-[#344054] font-semibold text-[16px] leading-[10px]"
              >
                <ArrowDownIcon />
                <span>Inboud</span>
              </Link>
            </li>
            <li className="hover:bg-white nav-item-base rounded-[6px] h-[32px] px-[12px] py-[4px] flex gap-[8px]">
              <Link
                href="#"
                className="hover:text-[#344054] flex items-center h-[24px] gap-[12px] text-[#344054] font-semibold text-[16px] leading-[10px]"
              >
                <ArrowUpIcon />
                <span>Outbound</span>
              </Link>
            </li>
            <li className="hover:bg-white nav-item-base rounded-[6px] h-[32px] px-[12px] py-[4px] flex gap-[8px]">
              <Link
                href="#"
                className="hover:text-[#344054] flex items-center h-[24px] gap-[12px] text-[#344054] font-semibold text-[16px] leading-[10px]"
              >
                <AdsIcon />
                <span>Ads</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full aside_links_settings pl-[28px] flex flex-col gap-[4px] py-[6px] px-[32px]">
          <span className="text-[#A0A2A6] text-[14px] leading-[10px] font-semibold"></span>
          <ul>
            <li className="hover:bg-white nav-item-base rounded-[6px] h-[32px] px-[12px] py-[4px] flex gap-[8px]">
              <Link
                href="#"
                className="hover:text-[#344054] flex items-center h-[24px] gap-[12px] text-[#344054] font-semibold text-[16px] leading-[10px]"
              >
                <BellIcon />
                <span>Notifications</span>
                <Badge className="bg-[#101828D4] h-[16px] w-[30px] text-[8px] font-semibold rounded-[4px] text-center">
                  3
                </Badge>
              </Link>
            </li>
            <li className="hover:bg-white nav-item-base rounded-[6px] h-[32px] px-[12px] py-[4px] flex gap-[8px]">
              <Link
                href="#"
                className="hover:text-[#344054] flex items-center h-[24px] gap-[12px] text-[#344054] font-semibold text-[16px] leading-[10px]"
              >
                <SettingsIcon />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="aside_cta flex flex-col gap-[6px] px-[28px]">
        <div className="cta flex flex-col px-[16px] py-[6px] gap-[5px] bg-white rounded-[12px] border">
          <div className="flex flex-col gap-[12px]">
            <div className="title flex items-center justify-start gap-[15px] text-[14px] font-semibold text-[#344054] leading-[10px]">
              <CheckDoneIcon />
              <span>Deals</span>
            </div>
            <div className="cta-progress-bar flex flex-col gap-[5px]">
              <Progress value={progress} className="h-[8px] rounded-[17px]" />

              <span className="text-[#344054] text-[12px] leading-[16px]">
                {progressQuantity} Deals left from 30 Leads
              </span>
            </div>
            <div className="cta-button flex gap-[12px]">
              <Button className="w-full flex items-center px-[18px] py-[10px] rounded-[8px] gap-[12px] shadow-[0px_0px_0px_2px_rgba(240,240,240,1)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] shadow-[0px_4px_9.8px_0px_rgba(255,255,255,0.25)_inset]">
                <svg
                  width="22"
                  height="16"
                  viewBox="0 0 22 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.5057 4.43066C21.2931 4.25564 21.0298 4.14422 20.7495 4.11067C20.4691 4.07711 20.1845 4.12296 19.9321 4.24232L15.7719 6.19066L12.2238 0.64982C12.0966 0.451565 11.9171 0.287549 11.7027 0.173691C11.4882 0.0598329 11.246 0 10.9997 0C10.7533 0 10.5111 0.0598329 10.2966 0.173691C10.0822 0.287549 9.90266 0.451565 9.77555 0.64982L6.22741 6.19066L2.06634 4.24316C1.81416 4.1248 1.53033 4.07921 1.25061 4.11213C0.970893 4.14505 0.707804 4.25501 0.494486 4.42814C0.281168 4.60128 0.127164 4.82985 0.051875 5.08507C-0.0234136 5.34029 -0.0166187 5.61073 0.0714038 5.86232L3.35343 15.3082C3.40286 15.4505 3.48566 15.5805 3.59574 15.6888C3.70582 15.797 3.84035 15.8806 3.98942 15.9335C4.13849 15.9864 4.29829 16.0071 4.45704 15.9942C4.61578 15.9813 4.76942 15.9351 4.90662 15.859C4.92791 15.8473 7.12953 14.6665 10.9979 14.6665C14.8662 14.6665 17.0678 15.849 17.0847 15.8582C17.2219 15.9353 17.3758 15.9824 17.5351 15.9959C17.6943 16.0095 17.8547 15.9892 18.0045 15.9365C18.1542 15.8838 18.2894 15.8001 18.4 15.6916C18.5105 15.5831 18.5937 15.4526 18.6432 15.3098L21.9252 5.86899C22.0158 5.61726 22.0243 5.34584 21.9495 5.08956C21.8748 4.83328 21.7202 4.60383 21.5057 4.43066ZM16.988 13.6265C15.8038 13.1998 13.7654 12.6665 10.9979 12.6665C8.23034 12.6665 6.19193 13.2015 5.00774 13.6282L2.61275 6.73566L5.85309 8.24983C6.17512 8.39913 6.54501 8.42966 6.88982 8.33541C7.23463 8.24116 7.52935 8.02896 7.71586 7.74066L10.9979 2.61649L14.2799 7.74149C14.4664 8.0298 14.7612 8.24194 15.106 8.33605C15.4509 8.43016 15.8208 8.39939 16.1427 8.24983L19.3821 6.73316L16.988 13.6265Z"
                    fill="white"
                  />
                </svg>
                <span>Upgrade to pro</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="avatar bg-white rounded-[12px] border flex gap-[10px] items-center p-[8px]">
          <UserDropdownMenu>
            <div className="cursor-pointer flex items-center gap-[11px] text-[14px]">
              <div className="avatar-thumbnail">
                <Avatar>
                  <AvatarImage src="/avatar.png" className="relative" />
                  <UserAvatar />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="avatar-infos flex justify-between items-center gap-[20px] text-[#344054]">
                <div className="avatar-infos-name flex flex-col">
                  <div className="avatar-name font-semibold text-[#344054] ">
                    Arthur Bossuyt
                  </div>
                  <span>Arthur@squared.studio</span>
                </div>
                <svg
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 0.999999L6 6L11 1"
                    stroke="#475467"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </UserDropdownMenu>
        </div>
      </div>
    </aside>
  );
};

"use client";

import { MobileNav } from "@/components/bottom-nav";
import { UserModal } from "@/components/user-modal";
import { cn } from "@/utils/utils";
import { useEffect, useMemo, useState } from "react";

export const Page = () => {
  if (typeof window !== "undefined") {
    return (
      <div
        className={cn(
          "flex max-w-sm flex-col items-start justify-between rounded-md pb-10 pt-10 sm:border sm:border-gray-100",
        )}
        style={{
          height: `${window.innerHeight}px`,
        }}
      >
        <UserModal />
        <MobileNav />
      </div>
    );
  } else {
    return (
      <div
        className={cn(
          "flex h-screen max-w-sm flex-col items-start justify-between rounded-md pb-10 pt-10 sm:border sm:border-gray-100",
        )}
      >
        <UserModal />
        <MobileNav />
      </div>
    );
  }
};

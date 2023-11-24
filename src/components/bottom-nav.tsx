import Link from "next/link";
import { useState } from "react";
import { ChatDrawer } from "./drawers/chat-drawer";
import { RankDrawer } from "./drawers/rank-drawer";
import { StatusDrawer } from "./drawers/status-drawer";
import { HistoryDrawer } from "./drawers/history-drawer";

export const MobileNav = () => {
  return (
    <div className="inline-flex w-full flex-col items-center justify-start gap-2.5 px-4">
      <ChatDrawer />
      <div className="flex flex-col items-center justify-end gap-5 rounded-xl bg-white px-5 pb-3.5 pt-5 shadow">
        <div className="flex  flex-col items-start justify-start gap-4 self-stretch">
          <div className="self-stretch">
            <span className="font-semibold leading-snug tracking-tight text-indigo-700">
              Oi, João!
              <br />
            </span>
            <span className="font-normal leading-snug tracking-tight text-zinc-900">
              Qual o seu destino de hoje?
            </span>
          </div>
        </div>
        <div className="inline-flex h-12 w-80 items-center justify-start gap-2.5 rounded-xl bg-gray-200 p-4">
          <div className="h-4 shrink grow basis-0 text-sm font-normal leading-tight text-slate-400">
            Escreva o endereço...
          </div>
          <div className="flex h-6 w-6 origin-top-left rotate-90 items-center justify-center" />
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <StatusDrawer />
        <RankDrawer />
        <HistoryDrawer />
      </div>
    </div>
  );
};

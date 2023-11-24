"use client";

import Image from "next/image";
import { Drawer } from "vaul";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

const trips = [
  {
    origin: "Rua Marechal Pires F.",
    date: "24 de set. · 6:02 PM",
  },
  {
    origin: "Av. do Estado",
    date: "24 de set. · 6:02 PM",
  },
  {
    origin: "Av. Santa Maria",
    date: "24 de set. · 6:02 PM",
  },
  {
    origin: "Rua MMDC",
    date: "24 de set. · 6:02 PM",
  },
  {
    origin: "Rod. Presidente Dutra",
    date: "24 de set. · 6:02 PM",
  },
  {
    origin: "Raposo Tavares",
    date: "24 de set. · 6:02 PM",
  },
];

export function HistoryDrawer() {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <div className="flex h-12 w-28 items-center justify-center gap-2 rounded-xl bg-white px-3.5 py-5">
          <div className="text-center text-sm font-normal leading-tight text-zinc-900">
            Histórico
          </div>
          <div className="flex h-6 w-6 origin-top-left rotate-90 items-center justify-center" />
        </div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex h-[96%] flex-col rounded-t-xl bg-white pt-5">
          <div className="mx-auto h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300" />
          <div className="flex flex-col items-center justify-start gap-6 p-4">
            <div className="inline-flex items-start justify-between self-stretch px-2">
              <div className="inline-flex flex-col items-start justify-start gap-0.5">
                <div className="text-2xl font-semibold leading-normal text-indigo-700">
                  Histórico
                </div>
                <div className="text-base font-normal leading-normal text-stone-500">
                  Solicitações
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 self-stretch rounded-3xl border border-zinc-100 bg-white p-4">
              <Image
                className="self-stretch rounded-xl"
                src="/trip-map.png"
                alt="map"
                width={326}
                height={105}
              />
              <div className="flex h-12 flex-col items-start justify-start gap-1.5 self-stretch">
                <div className="w-72  text-xl font-semibold leading-normal text-slate-900">
                  Estrada dos Bandeirantes
                </div>
                <div className="text-xs font-normal leading-none text-stone-500">
                  25 de set. 6:02 PM
                </div>
              </div>
            </div>
            <ScrollArea className="flex h-1/2 flex-col items-start justify-start gap-0.5 self-stretch overflow-y-auto">
              {trips.map((trip, i) => (
                <>
                  <Trip origin={trip.origin} date={trip.date} />
                  {trips.length - 1 !== i && <Separator className="m-2" />}
                </>
              ))}
            </ScrollArea>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

const Trip = ({ origin, date }: { origin: string; date: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3.5 self-stretch">
      <div className="inline-flex items-center justify-between self-stretch">
        <div className="flex items-center justify-start gap-3">
          <Image src="/tow-truck.png" alt="tow truck" width={64} height={41} />
          <div className="inline-flex flex-col items-start justify-start">
            <div className=" text-base font-semibold leading-normal text-slate-900">
              {origin}
            </div>
            <div className="text-xs font-normal leading-none text-stone-500">
              {date}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

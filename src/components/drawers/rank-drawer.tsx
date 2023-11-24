"use client";

import { Drawer } from "vaul";

export function RankDrawer() {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <div className="flex h-12 w-28 items-center justify-center gap-2 rounded-xl bg-white px-3.5 py-5">
          <div className="text-center text-sm font-normal leading-tight text-zinc-900">
            Rank
          </div>
          <div className="flex h-6 w-6 origin-top-left rotate-90 items-center justify-center" />
        </div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex h-[96%] flex-col rounded-t-[10px] bg-zinc-100">
          <div className="flex-1 rounded-t-[10px] bg-white p-4">
            <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300" />
            <div className="mx-auto max-w-md">
              <Drawer.Title className="mb-4 font-medium">Rank</Drawer.Title>
              <p className="mb-2 text-zinc-600">
                Essa pagina ainda está em construção
              </p>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

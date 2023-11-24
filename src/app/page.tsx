import Link from "next/link";

import { createPost } from "@/app/_actions";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { Drawer } from "vaul";
import { MobileNav } from "@/components/bottom-nav";
import { Page } from "./_page";

export default async function Home() {
  return (
    <main className="flex justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <Page />
    </main>
  );
}

"use server";

import { loggerLink } from "@trpc/client";
import { experimental_nextHttpLink } from "@trpc/next/app-dir/links/nextHttp";
import { experimental_createTRPCNextAppDirServer } from "@trpc/next/app-dir/server";
import { type AppRouter } from "@/server/api/root";
import { cookies } from "next/headers";
import { getUrl, transformer } from "./shared";

export const api = experimental_createTRPCNextAppDirServer<AppRouter>({
  config() {
    return {
      transformer,
      links: [
        loggerLink({
          enabled: () => true,
        }),
        experimental_nextHttpLink({
          batch: true,
          url: getUrl(),
          headers() {
            return {
              cookie: cookies().toString(),
              "x-trpc-source": "rsc-http",
            };
          },
        }),
      ],
    };
  },
});

// export const createAction =

"use client";

import { useRef } from "react";
import { FormProvider } from "react-hook-form";

import { useAction } from "@/trpc/client";
import { createPost } from "@/app/_actions";
import { createPostSchema } from "./Schema";
import { Button } from "@/ui/button";
import { useZodForm } from "@/hooks/useZodForm";

export function ReactHookFormExample() {
  const mutation = useAction(createPost);
  const form = useZodForm({
    schema: createPostSchema,
  });
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="w-full max-w-xs">
      <p>Check the console for the logger output.</p>
      <FormProvider {...form}>
        <form
          action={createPost}
          ref={formRef}
          onSubmit={form.handleSubmit(async () => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await mutation.mutateAsync(new FormData(formRef.current!));
          })}
        >
          <div>
            <input
              type="text"
              {...form.register("text")}
              aria-invalid={form.formState.errors.text ? "true" : "false"}
              name="text"
              className="w-full rounded bg-primary p-2 text-background"
            />
          </div>
          {form.formState.errors.text && (
            <p role="alert">{form.formState.errors.text.message}</p>
          )}
          <div>
            <Button type="submit">Run server action raw debugging</Button>
          </div>

          <h2>Form state</h2>
          <pre
            style={{
              overflowX: "scroll",
            }}
          >
            {JSON.stringify(
              {
                formState: {
                  isSubmitting: form.formState.isSubmitting,
                },
              },
              null,
              4,
            )}
          </pre>
          <h2>Mutation state</h2>
          <pre
            style={{
              overflowX: "scroll",
            }}
          >
            {JSON.stringify(mutation, null, 4)}
          </pre>
        </form>
      </FormProvider>
    </div>
  );
}

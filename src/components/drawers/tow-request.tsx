import { useEffect, useRef, useState } from "react";
import { Drawer } from "vaul";
import { Separator } from "../ui/separator";

export const RequestTow = () => {
  const [text, setText] = useState<string>("");

  return (
    <Drawer.NestedRoot>
      <Drawer.Trigger className="w-full">
        <input
          className="inline-flex w-full items-start justify-start gap-2.5 rounded-full border p-2.5 text-sm font-normal text-indigo-700"
          placeholder="Digite o endereço..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex h-full max-h-[94%] flex-col rounded-t-[10px] bg-gray-100">
          <div className="flex-1 rounded-t-[10px] bg-white p-4">
            <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />
            <div className="mx-auto max-w-md">
              <Drawer.Title className="-mt-5 mb-10 font-medium">
                <div className="inline-flex flex-col items-start justify-start gap-0.5">
                  <div className="w-32 text-2xl font-semibold leading-normal text-indigo-700">
                    Solicitação
                  </div>
                  <div className="font-normal leading-normal text-stone-500">
                    Endereço
                  </div>
                </div>
              </Drawer.Title>

              <div className="inline-flex h-24 w-full flex-col items-start justify-center">
                <div className="flex h-10 w-full items-center justify-start gap-1 rounded-full border border-zinc-400 py-1 pl-3 pr-1 text-slate-700">
                  <img src="/location.svg" className="h-5 w-5" />
                  Sua localização
                </div>
                <div className="inline-flex items-start justify-center gap-2.5 pl-6">
                  <div className="h-6 w-px border border-indigo-700" />
                </div>
                <div className="group flex h-10 w-full items-center justify-start gap-2.5 self-stretch rounded-full border border-zinc-400 p-2.5 text-base font-normal text-indigo-700 group-focus:border-2">
                  <img src="/MapPin.svg" className="h-5 w-5" />
                  <input
                    className=" w-full focus:outline-none"
                    placeholder="Digite o endereço..."
                    value={"marechal deodo"}
                    // onChange={(e) => setText(e.target.value)}
                  />
                </div>
              </div>
              <Result />
              <Separator />
              <Result2 />
              <Separator />
              <Result3 />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.NestedRoot>
  );
};

const Result = () => (
  <div className="inline-flex h-20 w-96 flex-col items-center justify-center gap-3.5">
    <div className="inline-flex items-center justify-between self-stretch pr-5">
      <div className="flex items-center justify-start gap-3">
        <div className="inline-flex flex-col items-start justify-start">
          <div>
            <span className="font-semibold leading-normal text-slate-900">
              Rua{" "}
            </span>
            <span className="font-semibold leading-normal text-indigo-700">
              Marechal Deodo
            </span>
            <span className="font-semibold leading-normal text-slate-900">
              ro da Fonseca
            </span>
          </div>
          <div className="text-xs font-normal leading-none text-stone-500">
            Belo Horizonte, BH
          </div>
        </div>
      </div>
      <img src="/ChevronRight.svg" className="h-6 w-6" />
    </div>
  </div>
);

const Result2 = () => (
  <div className="inline-flex h-20 w-96 flex-col items-center justify-center gap-3.5">
    <div className="inline-flex items-center justify-between self-stretch pr-5">
      <div className="flex items-center justify-start gap-3">
        <div className="inline-flex flex-col items-start justify-start">
          <div>
            <span className="font-semibold leading-normal text-slate-900">
              Avenida{" "}
            </span>
            <span className="font-semibold leading-normal text-indigo-700">
              Marechal Deodo
            </span>
            <span className="font-semibold leading-normal text-slate-900">
              ro
            </span>
          </div>
          <div className="text-xs font-normal leading-none text-stone-500">
            Porto Alegre, RS
          </div>
        </div>
      </div>
      <img src="/ChevronRight.svg" className="h-6 w-6" />
    </div>
  </div>
);

const Result3 = () => (
  <div className="inline-flex h-20 w-96 flex-col items-center justify-center gap-3.5">
    <div className="inline-flex items-center justify-between self-stretch">
      <div className="flex w-full items-center justify-between gap-3 pr-5">
        <div className="inline-flex flex-col items-start justify-start">
          <div>
            <span className="font-semibold leading-normal text-slate-900">
              Rua{" "}
            </span>
            <span className="font-semibold leading-normal text-indigo-700">
              Marechal Deodo
            </span>
            <span className="font-semibold leading-normal text-slate-900">
              ro da Fonseca
            </span>
          </div>
          <div className="text-xs font-normal leading-none text-stone-500">
            Belo Horizonte, BH
          </div>
        </div>
        <img src="/ChevronRight.svg" className="h-6 w-6" />
      </div>
    </div>
  </div>
);

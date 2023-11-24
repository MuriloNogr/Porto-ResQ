"use client";

import { api } from "@/trpc/client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Drawer } from "vaul";
import { ScrollArea } from "../ui/scroll-area";
import { RequestTow } from "./tow-request";

const initial = {
  question: "Olá, como posso ajudar?",
  options: [
    { text: "Meu caminhão não liga", value: 1, type: "button" as const },
    {
      text: "Tenho problemas com os pneus",
      value: 20,
      type: "button" as const,
    },
    {
      text: "Tenho problemas com combustíveis",
      value: 20,
      type: "button" as const,
    },
    { text: "Problemas elétricos/luzes", value: 20, type: "button" as const },
    { text: "Problema na bateria", value: 20, type: "button" as const },
  ],
};

const carga = {
  question: "Certo, seu caminhão está com carga?",
  options: [
    { text: "Sim, está carregado", value: 20, type: "button" as const },
    { text: "Não, está vazio", value: 2, type: "button" as const },
  ],
};

const incomun = {
  question: "Entendido. Quando ele parou você notou algo de incomum?",
  options: [
    { text: "Fumaça subindo", value: 3, type: "button" as const },
    { text: "Cheiro de queimado", value: 20, type: "button" as const },
    { text: "Barulho diferente", value: 20, type: "button" as const },
    { text: "Nada de incomum", value: 20, type: "button" as const },
  ],
};

const fumaca = {
  question: "Esta fumaça estava vindo diretamente do motor?",
  options: [
    { text: "Do motor", value: 4, type: "button" as const },
    { text: "De outra área", value: 20, type: "button" as const },
  ],
};

const motor = {
  question:
    "Isso sugere um superaquecimento do motor. \n É importante não tentar liga-lo novamente, pois pode causar danos permanentes. \n Recomendamos que você se afaste do caminhão. \n Nesse caso, o que você deseja fazer?",
  options: [
    { text: "Solicitar um guincho", value: 5, type: "button" as const },
    {
      text: "Obter dicas de primero socorros",
      value: 20,
      type: "button" as const,
    },
    {
      text: "Entrar em contato com um especialista",
      value: 20,
      type: "button" as const,
    },
  ],
};

const guincho = {
  question: "Ok, qual é o local de destino do seu caminhão?",
  options: [{ text: "Digite o endereço", value: 6, type: "input" as const }],
};

const fullChat = [initial, carga, incomun, fumaca, motor, guincho];

export function ChatDrawer() {
  const [chat, setChat] = useState<{
    question: string;
    options: {
      text: string;
      value: number;
      type: "input" | "button";
    }[];
  }>();

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setChat(fullChat[index]);
  }, [index]);

  const [history, setHistory] = useState<
    { question: string; answer: string; value: number }[]
  >([]);

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <div className="inline-flex h-10 w-80 items-center justify-center gap-2.5 rounded-full bg-indigo-700 px-7 shadow">
          <div className="flex items-center justify-center gap-2.5 pb-0.5" />
          <div className="font-semibold leading-normal text-white">
            Solicitar Ajuda
          </div>
        </div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex h-[96%] flex-col rounded-t-xl bg-white pt-5">
          <div className="mx-auto h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300" />
          <div className="flex h-full w-full flex-col items-center justify-start gap-6 rounded-tl-xl rounded-tr-xl  bg-white px-4 pb-20 pt-4">
            <div className="inline-flex items-start justify-between self-stretch px-2">
              <div className="inline-flex flex-col items-start justify-start gap-0.5">
                <div className="w-32 text-2xl font-semibold leading-normal text-indigo-700">
                  Suporte
                </div>
                <div className="font-normal leading-normal text-stone-500">
                  Chat
                </div>
              </div>
            </div>
            {!!chat && (
              <ScrollArea className="flex h-full w-full flex-col justify-end gap-3.5 overflow-y-auto">
                {!!history.length && (
                  <div className="flex flex-col items-start justify-start gap-2.5 self-stretch pb-10">
                    {history.map((item) => (
                      <button
                        className="flex w-full flex-col items-start justify-start gap-2.5"
                        onClick={() => {
                          // remove all items after this one
                          setHistory(history.slice(0, item.value));

                          setIndex(item.value);
                        }}
                      >
                        <div className="inline-flex h-14 w-72 items-center justify-start gap-2.5">
                          <img className="h-9 w-9" src="/Porto.svg" />
                          <div className="flex items-start justify-start gap-2.5 rounded-lg border border-zinc-100 p-2.5 text-start text-sm">
                            {item.question}
                          </div>
                        </div>
                        <div className="inline-flex h-16 w-full items-start justify-end gap-2.5 pb-8">
                          <div className="flex items-start justify-start gap-2.5 rounded-lg bg-indigo-700 p-2.5">
                            <div className="text-start font-['Roobert-Regular'] text-sm font-normal text-white">
                              {item.answer}
                            </div>
                          </div>
                          <img
                            className="h-9 w-9 rounded-full"
                            src="/profile-pic1.png"
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                <CurrentQuestion question={chat.question} />
                <div className="flex flex-col items-start justify-start gap-3.5">
                  {chat.options.map((option, i) => {
                    return (
                      <Option
                        ref={
                          chat.options.length - 1 === i
                            ? endOfMessagesRef
                            : undefined
                        }
                        option={option}
                        onClick={() => {
                          if (option.value === 20) {
                            return;
                          }
                          setHistory([
                            ...history,
                            {
                              question:
                                chat.question.split("\n")[
                                  chat.question.split("\n").length - 1
                                ] ?? chat.question,
                              answer: option.text,
                              value: index,
                            },
                          ]);
                          setIndex(option.value);
                        }}
                      />
                    );
                  })}
                </div>
              </ScrollArea>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

type CurrentQuestionProps = {
  question: string;
};

const CurrentQuestion: React.FC<CurrentQuestionProps> = ({ question }) => {
  const renderBox = (
    content: string,
    size: "text-lg" | "text-sm",
    color: "text-slate-900" | "text-neutral-400",
  ) => (
    <div className="flex flex-col items-start justify-start gap-2.5 px-1 py-2">
      {content.split("\n").map((line) => (
        <span className={`${size} font-normal ${color}`}>{line}</span>
      ))}
    </div>
  );

  return (
    <article className="flex w-3/4 flex-col items-start justify-start gap-3.5 self-stretch pb-4">
      <Image src="/Porto.svg" alt="Avatar of Porto" width={51} height={52} />
      {renderBox(question, "text-lg", "text-slate-900")}
      {/* {renderBox(details, "text-sm", "text-neutral-400")} */}
    </article>
  );
};

const Option = ({
  option,
  onClick,
  ref,
}: {
  option: {
    text: string;
    value: number;
    type: "input" | "button";
  };
  onClick?: () => void;
  ref?: React.Ref<HTMLDivElement>;
}) => {
  if (option.type === "button") {
    return (
      <button
        className="flex flex-col items-end justify-start gap-2.5 self-stretch"
        onClick={onClick}
      >
        <div
          className="inline-flex items-start justify-start gap-2.5 rounded-lg border border-indigo-700 p-2.5"
          ref={ref}
        >
          <div className="text-sm font-normal text-indigo-700">
            {option.text} {!!ref && <span className="text-xs">?</span>}
          </div>
        </div>
      </button>
    );
  }
  if (option.type === "input") {
    return <RequestTow />;
  }
};

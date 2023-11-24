import Image from "next/image";

export function UserModal() {
  return (
    <div className="flex w-60 items-center justify-start gap-3 rounded-br-xl rounded-tr-xl bg-white px-5 py-2.5">
      <div className="flex items-start justify-start gap-3 rounded-full">
        <Image
          className="rounded-full"
          src="/profile-pic1.png"
          alt="Profile picture"
          width={63}
          height={63}
        />
      </div>
      <div className="inline-flex flex-col items-start justify-start gap-2.5 pt-1">
        <div className="font-['Roobert'] text-base font-semibold leading-7 text-indigo-700">
          Olá, João Pedro!
        </div>
        <div className="inline-flex items-start justify-start gap-7 self-stretch">
          <div className="inline-flex flex-col items-start justify-start gap-1">
            <div className="font-['Roobert-Regular'] text-xs font-normal leading-none text-slate-900 opacity-75">
              Pontos
            </div>
            <div className="inline-flex items-center justify-center gap-1">
              <div className="font-['Roobert-Regular'] text-sm font-normal text-slate-900">
                3.500
              </div>
            </div>
          </div>
          <div className="inline-flex flex-col items-start justify-between self-stretch">
            <div className="font-['Roobert-Regular'] text-xs font-normal leading-none text-slate-900 opacity-75">
              Rank
            </div>
            <div className="inline-flex items-center justify-center gap-1">
              <div className="font-['Roobert-Regular'] text-sm font-normal text-slate-900">
                1°
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

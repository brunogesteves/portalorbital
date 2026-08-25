"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import Header from "@/components/Header/Header";
import { ButtonBlue } from "@/components/buttons";

export default function NotFoundPage() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/");
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <Header slug="Search" />
      <div className="hidden md:flex flex-col flex-1 bg-white">
        <main className="p-4 bg-white overflow-y-auto no-scrollbar pb-20 flex-1">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="mb-8">
              <Image src="/logo.png" alt="Logo" width={100} height={100} />
            </div>
            <h2 className="text-gray-900 font-bold text-xl tracking-widest uppercase mb-4">
              CONTEÚDO NÃO ENCONTRADO
            </h2>
            {/* <p className="text-gray-700 text-sm leading-relaxed max-w-[280px] mb-10">
              O servidor não localizou o protocolo solicitado ou a URL inserida
              é inexistente.
            </p> */}

            <ButtonBlue
              text="Home"
              onClick={handleNavigate} // Passando a função sem argumentos
            />
          </div>
        </main>
      </div>
      <div className="block md:hidden flex-1 bg-white">
        <main className="p-4 bg-white overflow-y-auto no-scrollbar pb-20 flex-1">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="mb-8">
              <Image src="/logo.png" alt="Logo" fill />
            </div>
            <h2 className="text-gray-900 font-bold text-xl tracking-widest uppercase mb-4">
              CONTEÚDO NÃO ENCONTRADO
            </h2>
            {/* <p className="text-gray-700 text-sm leading-relaxed max-w-[280px] mb-10">
              O servidor não localizou o protocolo solicitado ou a URL inserida
              é inexistente.
            </p> */}
            <ButtonBlue
              text="Home"
              onClick={handleNavigate} // Passando a função sem argumentos
            />
          </div>
        </main>
      </div>
    </div>
  );
}

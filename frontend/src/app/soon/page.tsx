"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeRemaining(): TimeLeft {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const diff = tomorrow.getTime() - now.getTime();

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const EMPTY_TIME: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

export default function SoonPage() {
  const router = useRouter();
  const [time, setTime] = useState<TimeLeft>(EMPTY_TIME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const tick = () => {
      const remaining = getTimeRemaining();
      setTime(remaining);

      const total =
        remaining.days * 86400 +
        remaining.hours * 3600 +
        remaining.minutes * 60 +
        remaining.seconds;

      if (total <= 0) {
        router.push("/");
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [router]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-2xl text-center">
          <div className="mb-8 flex justify-center items-center gap-2 md:gap-4">
            <Image
              alt="Orbital Channel Logo"
              src="/logo.png"
              width={40}
              height={40}
              loading="eager"
              style={{ height: "40px", width: "auto", objectFit: "contain" }}
            />
            <Image
              alt="Orbital Logo"
              src="/orbitaWritten.png"
              width={160}
              height={40}
              loading="eager"
              style={{ height: "20px", width: "auto", objectFit: "contain" }}
            />
          </div>
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-red-500/20 rounded-full animate-spin-slow" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
          </div>
          <h2 className="text-2xl md:text-9xl text-red-400 mb-8 font-semibold leading-relaxed">
            Em breve!
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center items-center gap-2 md:gap-4">
          <Image
            alt="Orbital Channel Logo"
            src="/logo.png"
            width={40}
            height={40}
            loading="eager"
            style={{ height: "40px", width: "auto", objectFit: "contain" }}
          />
          <Image
            alt="Orbital Logo"
            src="/orbitaWritten.png"
            width={160}
            height={40}
            loading="eager"
            style={{ height: "20px", width: "auto", objectFit: "contain" }}
          />
        </div>

        {/* Ícone de engrenagem animado */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-red-500/20 rounded-full animate-spin-slow" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-9xl text-red-400 mb-8 font-semibold leading-relaxed">
          Em breve!
        </h2>

        {/* Countdown */}
        <div className="mb-8">
          <p className="text-zinc-500 text-sm mb-4">
            Estamos quase lá! Lance em:
          </p>
          <div className="flex justify-center gap-4 md:gap-8">
            {[
              { value: time.days, label: "Dias" },
              { value: time.hours, label: "Horas" },
              { value: time.minutes, label: "Min" },
              { value: time.seconds, label: "Seg" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-zinc-900 rounded-xl flex items-center justify-center">
                  <span className="text-2xl md:text-3xl font-bold text-white font-mono">
                    {String(value).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-xs text-zinc-500 mt-2">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contato */}
        <div className="text-zinc-500 text-sm">
          <p>Dúvidas? Entre em contato:</p>
          <a
            href="mailto:contato@orbitaltv.net"
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            contato@orbitaltv.net
          </a>
        </div>

        {/* Redes sociais */}
        <div className="mt-8 flex justify-center gap-4">
          <a href="#" className="text-zinc-500 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

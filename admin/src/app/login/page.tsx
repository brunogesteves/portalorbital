"use client";

import { FiMail, FiLock, FiArrowRight, FiAlertCircle } from "react-icons/fi";
import useLogin from "./Login.logic";

export default function Login() {
  const { data, methods } = useLogin();

  return (
    <div className="min-h-screen flex bg-gray-50 overflow-hidden">
      <div className="hidden lg:flex w-1/2 bg-[#0f172a] relative items-center justify-center p-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-600 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 space-y-8 max-w-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center font-black text-3xl italic shadow-2xl">
              PP
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter">
              PORTAL<span className="text-red-600">POLÍTICO</span>
            </h1>
          </div>
          <div className="space-y-4">
            <h2 className="text-5xl font-black text-white leading-tight">
              Gerencie a informação <br />
              <span className="text-red-500">com precisão técnica.</span>
            </h2>
            <p className="text-gray-400 text-xl font-medium leading-relaxed">
              Plataforma de administração centralizada para jornalismo político
              de alto impacto.
            </p>
          </div>
        </div>
      </div>

      {/* Lado Direito - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white lg:rounded-l-[3rem] shadow-[-20px_0_40px_rgba(0,0,0,0.02)] z-20">
        <div className="max-w-md w-full space-y-12">
          <div className="text-center lg:text-left">
            <h3 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">
              Bem-vindo de volta
            </h3>
            <p className="text-gray-500 font-medium">
              Insira suas credenciais para acessar o painel.
            </p>
          </div>

          {data.error && (
            <div className="bg-red-50 text-red-600 p-5 rounded-2xl text-sm font-bold border border-red-100 flex items-center gap-3 animate-shake">
              <FiAlertCircle size={20} className="shrink-0" />
              {data.error}
            </div>
          )}

          <form
            onSubmit={methods.handleSubmit(methods.onSubmit)}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                E-mail Corporativo
              </label>
              <div className="relative group">
                <div
                  className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${data.errors.email ? "text-red-500" : "text-gray-400 group-focus-within:text-red-600"}`}
                >
                  <FiMail size={20} />
                </div>
                <input
                  {...methods.register("email")}
                  type="email"
                  className={`w-full bg-gray-50 border-2 rounded-2xl pl-12 pr-4 py-4 outline-none transition-all font-semibold text-gray-800 ${data.errors.email ? "border-red-200 focus:border-red-500 bg-red-50/30" : "border-transparent focus:border-red-600 focus:bg-white"}`}
                  placeholder="admin@portal.com"
                />
              </div>
              {data.errors.email && (
                <span className="text-xs font-bold text-red-500 ml-1 flex items-center gap-1">
                  <FiAlertCircle size={12} /> {data.errors.email.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                Senha de Acesso
              </label>
              <div className="relative group">
                <div
                  className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${data.errors.password ? "text-red-500" : "text-gray-400 group-focus-within:text-red-600"}`}
                >
                  <FiLock size={20} />
                </div>
                <input
                  {...methods.register("password")}
                  type="password"
                  className={`w-full bg-gray-50 border-2 rounded-2xl pl-12 pr-4 py-4 outline-none transition-all font-semibold text-gray-800 ${data.errors.password ? "border-red-200 focus:border-red-500 bg-red-50/30" : "border-transparent focus:border-red-600 focus:bg-white"}`}
                  placeholder="••••••••"
                />
              </div>
              {data.errors.password && (
                <span className="text-xs font-bold text-red-500 ml-1 flex items-center gap-1">
                  <FiAlertCircle size={12} /> {data.errors.password.message}
                </span>
              )}
            </div>

            {/* <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-bold text-gray-500 cursor-pointer select-none"
                >
                  Lembrar de mim
                </label>
              </div>
              <button
                type="button"
                className="text-sm font-bold text-red-600 hover:underline transition-all"
              >
                Esqueceu a senha?
              </button>
            </div> */}

            <button
              type="submit"
              disabled={data.loading}
              className="w-full bg-red-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-red-700 transition-all shadow-xl shadow-red-100 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {data.loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Entrar no Painel <FiArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-gray-400 text-xs font-medium">
            Acesso restrito a colaboradores autorizados do Portal Político.
          </p>
        </div>
      </div>
    </div>
  );
}

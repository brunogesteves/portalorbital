import Footer from "./Footer";
import Header from "./Header/Header";

export default function Loading() {
  return (
    <>
      <Header slug="" />
      <div className="hidden md:flex  min-h-[calc(100vh-600px)]  justify-center items-center ">
        <span className="text-gray-800 text-center text-6xl font-bold">
          Carregando...
        </span>
      </div>
      <div className="flex md:hidden text-gray-800 min-h-[calc(100vh-150px)] bg-white flex flex-col w-full justify-center items-center ">
        <span className="text-gray-800 text-center text-6xl font-bold">
          Carregando...
        </span>
      </div>

      <Footer />
    </>
  );
}

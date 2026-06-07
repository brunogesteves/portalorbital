import { useRouter } from "next/navigation";
import { IoIosClose } from "react-icons/io";

import { MobileSearchProps } from "@/utils/types";

export const ModalSearchlMobile = ({
  searchTerm,
  setSearchTerm,
  setOpenMobileSearch,
}: MobileSearchProps) => {
  const router = useRouter();
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
      <div className="bg-[#fefefe] border-2 border-[#b5bec5] rounded-lg w-full max-w-[320px] p-6 shadow-2xl flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-gray-900 tracking-tighter uppercase">
            Buscar
          </h2>
          <button className="text-gray-500 hover:text-black">
            <span className="material-symbols-outlined">
              <IoIosClose
                size={30}
                onClick={() => setOpenMobileSearch(false)}
              />
            </span>
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <input
              className="w-full bg-transparent border border-black rounded-lg py-1 focus:outline-none focus:border-[#3b82f6] text-sm text-black px-3"
              placeholder={searchTerm ? "Buscar..." : ""}
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>
        </div>
        <span className="text-black">Digite pelo menos 2 caracteres</span>
        <button
          onClick={() => {
            if (searchTerm.length > 1) {
              router.push(`/search?term=${searchTerm}`);
              setOpenMobileSearch(false);
            }
          }}
          disabled={searchTerm.length <= 1}
          className="btn-blue-glossy w-full py-3 uppercase tracking-widest font-bold"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

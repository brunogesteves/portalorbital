import { UserProps } from "@/Utils/types";
import { create } from "zustand";

// interface Userprops {
//   email: string,
//   name: string,
//   role: string,
// }
interface UIState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setIsSidebarOpen: (isOpen: boolean) => void;
  userData: UserProps
  setUserData: (content: UserProps) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setIsSidebarOpen: (isOpen: boolean) => set({ isSidebarOpen: isOpen }),
  userData: {
    email: "",
    name: "",
    role: "PBR",
  },
  setUserData: (content: UserProps) => set({
    userData: {
      email: content.name,
      name: content.email,
      role: content.role
    }
  }),
}));

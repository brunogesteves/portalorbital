import { ButtonBlueProps } from "@/utils/types";


export const ButtonBlue = ({ text, onClick, disabled }: ButtonBlueProps) => (
  <button
    className="btn-blue-glossy uppercase tracking-widest px-8 py-3 cursor-pointer"
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);



interface ButtonBlueProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const ButtonBlue = ({ text, onClick, disabled }: ButtonBlueProps) => (
  <button
    className="btn-blue-glossy uppercase tracking-widest px-8 py-3 cursor-pointer"
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

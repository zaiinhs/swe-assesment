export default function Chip({ children, onClick, active = false }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[9px] sm:text-xs font-medium font-mono
        transition-all duration-300 cursor-pointer min-h-[34px] sm:min-h-[36px]
        ${
          active
            ? "glass border-lampu/30 text-lampu bg-lampu/5"
            : "glass text-kabut hover:text-embun hover:border-white/12 hover:bg-white/5"
        }
        active:scale-95
      `}
    >
      {children}
    </button>
  );
}

export default function Button({ children, onClick, variant = "primary", className = "", disabled = false, icon }) {
  const base = "group relative px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 sm:gap-2.5 justify-center cursor-pointer transition-all duration-300 min-h-[40px] sm:min-h-[46px]";
  const variants = {
    primary: `
      bg-gradient-to-r from-lampu via-lampu-cyan to-lampu
      text-malam font-bold
      hover:shadow-[0_0_24px_-4px_rgba(139,92,246,0.4)]
      hover:scale-[1.01]
      active:scale-[0.98]
      disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none
    `,
    secondary: `glass text-embun hover:bg-white/[0.06] hover:border-white/12 active:scale-[0.98]`,
    ghost: `bg-transparent text-kabut hover:text-embun hover:bg-white/[0.03] active:scale-[0.98]`,
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {icon && (
        <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:scale-110 shrink-0">
          {icon}
        </span>
      )}
    </button>
  );
}

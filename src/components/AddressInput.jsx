import { ScanLine } from "lucide-react";
import { isValidEthAddress } from "../lib/validation";

export default function AddressInput({ value, onChange, onSubmit }) {
  const isValid = isValidEthAddress(value);
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (isValid) onSubmit(value); }} className="relative group w-full">
      <div className={`absolute -inset-0.5 rounded-lg sm:rounded-xl blur-lg transition-all duration-500 ${isValid ? "bg-gradient-to-r from-lampu/12 via-lampu-cyan/12 to-lampu-pink/12 opacity-100" : "opacity-0"}`} />
      <div className="relative flex items-center gap-2 sm:gap-2.5 rounded-lg sm:rounded-xl px-3 sm:px-3.5 glass-strong">
        <ScanLine size={13} className="sm:size-[14] text-lampu/60 shrink-0" />
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="0x..."
          className="flex-1 min-w-0 bg-transparent outline-none py-3 sm:py-3.5 text-xs sm:text-sm text-embun font-mono placeholder:text-kabut/40"
        />
        {value && <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0 ${isValid ? "bg-aman animate-pulse" : "bg-bahaya"}`} />}
      </div>
    </form>
  );
}

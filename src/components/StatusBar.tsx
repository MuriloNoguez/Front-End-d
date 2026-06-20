export function StatusBar() {
  return (
    <div className="h-[50px] flex items-end justify-between px-7 pb-1.5 shrink-0">
      <span className="text-[15px] font-bold text-[#10212E]">9:41</span>
      <div className="flex gap-1.5 items-center">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="#10212E">
          <rect x="0" y="7" width="3" height="5" rx="1" />
          <rect x="5" y="4" width="3" height="8" rx="1" />
          <rect x="10" y="1" width="3" height="11" rx="1" />
        </svg>
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
          <rect x="1" y="1" width="21" height="11" rx="3" stroke="#10212E" strokeWidth="1.4" />
          <rect x="3" y="3" width="15" height="7" rx="1.5" fill="#52B788" />
          <rect x="23" y="4.5" width="2" height="4" rx="1" fill="#10212E" />
        </svg>
      </div>
    </div>
  );
}

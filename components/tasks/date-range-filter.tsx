"use client";

import { useRouter } from "next/navigation";

export default function DateRangeFilter() {

  const router = useRouter();

  // set param `date_range` in URL on change
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const url = new URL(window.location.href);
    url.searchParams.set(name, value);
    router.push(`/tasks?${url.searchParams.toString()}`);
  };

  return (
    <div className="flex rounded-lg shadow-lg items-center">
      <div className="flex flex-col justify-between gap-2 bg-white p-6">
        {/* Date Range Filter UI can be implemented here */}
        <input 
          type="date" 
          className="border rounded p-2 text-slate-600" 
          onChange={handleDateChange}
          name="start_date"
        />
        <input
          type="date" 
          className="border rounded p-2 text-slate-600" 
          onChange={handleDateChange}
          name="end_date"
        />
      </div>
    </div>
  );
}
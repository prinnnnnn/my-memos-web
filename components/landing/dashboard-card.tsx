type Props = {
  title: string
  icon: React.ReactNode
  count: number
  description: string
}

const DashboardCard = ({ title, icon, count, description }: Props) => {
  return (
    <div className="min-h-52 flex flex-col justify-between bg-linear-to-b from-[#000814] to-[#212529] p-6 rounded-lg border border-black shadow-lg">
      <div className="flex flex-col gap-0.5">
        <div className="flex flex-row items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-[#ced4da]">{title}</h2>
          {icon}
        </div>
        <p className="text-3xl font-bold text-white">{count}</p>
      </div>
      <div className='flex flex-col gap-1.5'>
        <p className="text-sm text-[#e9ecef] mt-2">{description}</p>
      </div>
    </div>
  );
}

export default DashboardCard;

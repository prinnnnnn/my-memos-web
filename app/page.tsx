import DashboardCard from '@/components/landing/dashboard-card';
import { gradientsStyles } from '@/lib/theme';
import { FiCheckSquare, FiFileText } from 'react-icons/fi';
import { IoBookSharp } from "react-icons/io5";
import { SiBookstack } from "react-icons/si";

export default function Home() {

  const cardInfo = [
    {
      id: 'total-tasks',
      title: 'Tasks',
      icon: <FiCheckSquare className="w-6 h-6 text-[#f8f9fa]" />,
      count: 125,
      description: 'Active tasks',
    },
    {
      id: 'learning-areas',
      title: 'Learning Areas',
      icon: <SiBookstack className="w-6 h-6 text-[#f8f9fa]" />,
      count: 22,
      description: 'Total learning areas',
    },
    {
      id: 'learning-items',
      title: 'Learning Items',
      icon: <IoBookSharp className="w-6 h-6 text-[#f8f9fa]" />,
      count: 456,
      description: 'Total learning items',
    },
    {
      id: 'total-memos',
      title: 'Memos',
      icon: <FiFileText className="w-6 h-6 text-[#f8f9fa]" />,
      count: 1500,
      description: 'Total memos',
    },
  ]

  return (
    <div className="w-full mx-auto px-4 py-8 bg-white">
      <div>
        <h1 className={`text-4xl font-bold mb-8 w-min ${gradientsStyles.text}`}>Dashboard</h1>
      </div>
      
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cardInfo.map((card) => (
          <DashboardCard
            key={card.id}
            title={card.title}
            icon={card.icon}
            count={card.count}
            description={card.description}
          />
        ))}
      </div>

      <div className="mt-8 bg-[#e9ecef] border border-[#adb5bd] rounded-lg p-6">
        <h3 className="text-lg font-semibold text-[#000814] mb-2">Welcome to Your Productivity System</h3>
        <p className="text-[#000814]">
          Navigate using the menu above to manage your tasks, track learning progress, or write memos.
        </p>
      </div>
    </div>
  );
}

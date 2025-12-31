import {
  FiSettings,
} from 'react-icons/fi';
import { IoHomeOutline } from "react-icons/io5";
import { MdChecklist } from "react-icons/md";
import { TbBooks } from "react-icons/tb";
import { CgNotes } from "react-icons/cg";
import Link from 'next/link';
import { gradientsStyles } from '@/lib/theme';

export default function Sidebar() {

  const menuItems = [
    { id: 'home', icon: IoHomeOutline, label: 'Home', path: '/' },
    { id: 'tasks', icon: MdChecklist, label: 'Tasks', path: '/tasks' },
    { id: 'learnings', icon: TbBooks, label: 'Learnings', path: '/learnings' },
    { id: 'memos', icon: CgNotes, label: 'Memos', path: '/memos' },
    { id: 'settings', icon: FiSettings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="flex h-screen sticky top-0">
      <div
        className="bg-slate-100 text-black transition-all duration-300 ease-in-out w-64 p-2"
      >
        <div className="flex flex-col h-full bg-white rounded-lg">
          <div className="flex items-center justify-between p-4">
            <h1
              className={`font-bold text-2xl transition-opacity duration-300 ${gradientsStyles.text} inline-block opacity-100`}
            >
              My Memos
            </h1>
          </div>

          <nav className="flex-1 py-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  className={`w-full flex rounded-lg text-black hover:text-white items-center gap-4 px-4 py-3 transition-colors ${gradientsStyles.hovered}`}
                >
                  <Icon size={24} className="shrink-0" />
                  <span
                    className="transition-all duration-300 whitespace-nowrap opacity-100"
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
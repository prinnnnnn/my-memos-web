import { gradientsStyles } from '@/lib/theme';
import { FiCheckSquare, FiBook, FiFileText } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="w-full mx-auto px-4 py-8 bg-white">
      <div>
        <h1 className={`text-4xl font-bold mb-8 w-min ${gradientsStyles.text}`}>Dashboard</h1>
      </div>
      
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Tasks</h2>
            <FiCheckSquare className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">0</p>
          <p className="text-sm text-gray-600 mt-2">Active tasks</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Learning</h2>
            <FiBook className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">0</p>
          <p className="text-sm text-gray-600 mt-2">In progress</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Memos</h2>
            <FiFileText className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">0</p>
          <p className="text-sm text-gray-600 mt-2">Total memos</p>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Welcome to Your Productivity System</h3>
        <p className="text-blue-800">
          Navigate using the menu above to manage your tasks, track learning progress, or write memos.
        </p>
      </div>
    </div>
  );
}

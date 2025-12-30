import { gradientsStyles } from '@/lib/theme';
import { FiHome } from 'react-icons/fi';

export default function NotFound() {

  return (
    <div className="w-full min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className={`text-9xl font-bold mb-4 ${gradientsStyles.text}`}>404</h1>
          <div className="w-24 h-1 bg-[#9d4edd] mx-auto mb-8"></div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          
          <a
            href="/"
            className={`flex items-center justify-center gap-2 px-6 py-3 ${gradientsStyles.main} ${gradientsStyles.hovered} text-white rounded-lg shadow-md hover:shadow-lg transition-all`}
          >
            <FiHome size={20} />
            Home Page
          </a>
        </div>
        
        <div className="mt-12 text-sm text-gray-500">
          Error Code: 404
        </div>
      </div>
    </div>
  );
}
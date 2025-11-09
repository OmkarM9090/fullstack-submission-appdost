import React from 'react';
import ProfileCard from '../user/ProfileCard';

const Sidebar = () => {
  return (
    <aside className="md:col-span-1 space-y-6">
      {/* Only the top ProfileCard is sticky */}
      <div className="sticky top-8 z-20">
        <ProfileCard />
      </div>
      {/* News box is NOT sticky */}
      <div>
        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md p-4 rounded-2xl shadow-lg shadow-gray-300/50 dark:shadow-blue-900/30">
          <h3 className="font-bold text-lg tracking-tight text-linkedin-blue">AppDost News</h3>
          <ul className="mt-4 space-y-4">
            <li className="text-sm font-medium hover:text-linkedin-blue transition-colors duration-200">Recruiters are watching</li>
            <li className="text-sm text-gray-600 dark:text-gray-400">Top news · 8,997 readers</li>
          </ul>
          <ul className="mt-4 space-y-4">
            <li className="text-sm font-medium hover:text-linkedin-blue transition-colors duration-200">AI in the workplace</li>
            <li className="text-sm text-gray-600 dark:text-gray-400">Trending · 5,123 readers</li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

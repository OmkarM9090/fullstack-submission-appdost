import React from 'react';
import ProfileCard from '../user/ProfileCard';

const Sidebar = () => {
  return (
    <aside className="md:col-span-1 space-y-6">
      <ProfileCard />
      {/* You can add more sidebar widgets here */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg sticky top-64">
        <h3 className="font-semibold text-lg">LinkedIn News</h3>
        <ul className="mt-4 space-y-2">
          <li className="text-sm font-medium">Recruiters are watching</li>
          <li className="text-sm text-gray-600 dark:text-gray-400">Top news · 8,997 readers</li>
        </ul>
        <ul className="mt-4 space-y-2">
          <li className="text-sm font-medium">AI in the workplace</li>
          <li className="text-sm text-gray-600 dark:text-gray-400">Trending · 5,123 readers</li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
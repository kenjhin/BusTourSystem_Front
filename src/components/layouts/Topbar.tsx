"use client";

import Link from "next/link";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Topbar() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center flex-1">
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full py-2 pl-10 pr-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="검색..."
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none">
            <BellIcon className="w-6 h-6" />
          </button>

          <div className="relative">
            <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-medium">A</span>
              </div>
              <span className="text-sm font-medium">관리자</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

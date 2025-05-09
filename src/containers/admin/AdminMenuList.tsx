"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardDocumentListIcon,
  UserGroupIcon,
  BriefcaseIcon,
  Cog6ToothIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

const AdminMenuList = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "チェックイン管理",
      href: "/admin/checkin",
      icon: ClipboardDocumentListIcon,
      description: "チェックイン状況の確認と管理",
    },
    {
      name: "ドライバー管理",
      href: "/admin/driver",
      icon: TruckIcon,
      description: "ドライバー情報の管理",
    },
    {
      name: "パッケージ管理",
      href: "/admin/packages",
      icon: BriefcaseIcon,
      description: "ツアーパッケージの管理",
    },
    {
      name: "スタッフ管理",
      href: "/admin/staff",
      icon: UserGroupIcon,
      description: "スタッフ情報の管理",
    },
    {
      name: "システム設定",
      href: "/admin/system",
      icon: Cog6ToothIcon,
      description: "システム設定の管理",
    },
  ];

  return (
    <>
      {menuItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`block p-6 bg-white rounded-lg border transition-all duration-200 ${
              isActive
                ? "border-blue-500 shadow-lg"
                : "border-gray-200 hover:border-blue-300 hover:shadow-md"
            }`}
          >
            <div className="flex items-start space-x-4">
              <div
                className={`p-3 rounded-lg ${
                  isActive ? "bg-blue-50" : "bg-gray-50"
                }`}
              >
                <item.icon
                  className={`w-6 h-6 ${
                    isActive ? "text-blue-600" : "text-gray-600"
                  }`}
                />
              </div>
              <div>
                <h3
                  className={`text-lg font-medium ${
                    isActive ? "text-blue-600" : "text-gray-900"
                  }`}
                >
                  {item.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default AdminMenuList;

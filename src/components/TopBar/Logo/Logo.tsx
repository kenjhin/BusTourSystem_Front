"use client";

//Icon
import { IconType } from "react-icons";
import { useEffect, useState } from "react";
// import { useUser } from "@/context/UserContext";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface LogoProps {
  title: string;
  icon: IconType;
}

const Logo: React.FC<LogoProps> = ({ title, icon: Icon }) => {
  // const { user, loading } = useUser();
  const { user, loading } = useSelector((state: RootState) => state.user);

  return (
    <div className="flex items-center text-2xl font-bold">
      <Icon className="mr-6" />
      {title}
      {/* Login情報 */}
      {loading ? (
        <p className="ml-6 text-gray-500">Loading...</p>
      ) : user ? (
        <div className="flex items-center text-blue-600 font-semibold ml-6">
          
          
          <p>{user.email}</p>
          <p>{user.role}</p>


          <p className="ml-2">様</p>
        </div>
      ) : (
        <p className="text-red-500 ml-6">ログインしていません。</p>
      )}
    </div>
  );
};

export default Logo;

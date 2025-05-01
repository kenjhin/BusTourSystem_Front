"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setCredentials } from "@/store/slices/authSlice";
import { fetchUser } from "@/store/slices/userSlice";
import AccountForm from "./sub/AccountForm";
import AccountsTable from "./sub/AccountsTable";
import UserListDialog from "./sub/UserListDialog";

type User = {
  id: number;
  email: string;
  role: string;
};

export default function AccountContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const currentUserEmail = useSelector(
    (state: RootState) => state.user.user?.email
  );

  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");
  const [open, setOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("유저 불러오기 실패:", err));
  }, []);

  const handleSubmit = () => {
    fetch("http://localhost:8080/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);

        if (email === currentUserEmail && data.token) {
          dispatch(setCredentials({ token: data.token }));
          dispatch(fetchUser());
        }
      })
      .catch((err) => {
        console.error(err);
        alert("에러 발생");
      });
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="flex-1 p-10">
      <h1 className="text-2xl font-bold mb-6">管理者マスタ</h1>

      {/* FORM 영역 */}
      {/* <div className="bg-white rounded-x1 shadow p-6 max-w-md mb-8">
        <AccountForm
          email={email}
          role={role}
          onEmailChange={setEmail}
          onRoleChange={setRole}
          onSubmit={handleSubmit}
        />
        <button
          onClick={() => setOpen(true)}
          className="mb-4 px-4 py-2 border rounded mt-4"
        >
          ユーザーを選択
        </button>
      </div> */}

      {/* TABLE 영역 */}
      <div className="bg-white rounded-xl shadow p-6">
        <AccountsTable users={currentUsers} />
        <div className="flex gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-gray-300" : ""
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* DIALOG 영역
      <UserListDialog
        open={open}
        users={users}
        onClose={() => setOpen(false)}
        onSelect={(user: User) => {
          setEmail(user.email);
          setRole(user.role);
          setOpen(false);
        }}
      /> */}
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";

interface NotificationModalProps {
  open: boolean;
  onClose: () => void;
}

const mockNotifications = [
  { id: 1, message: "新しい予約ができました。", date: "2024-06-10 10:30" },
  { id: 2, message: "決済の確認が必要です。", date: "2024-06-10 09:15" },
  {
    id: 3,
    message: "システムメンテナンスのお知らせ",
    date: "2024-06-09 18:00",
  },
];

const NotificationModal: React.FC<NotificationModalProps> = ({
  open,
  onClose,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [readIds, setReadIds] = useState<number[]>([]);

  // 바깥 클릭 시 닫힘
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open, onClose]);

  const handleRead = (id: number) => {
    if (!readIds.includes(id)) {
      setReadIds((prev) => [...prev, id]);
    }
  };

  if (!open) return null;
  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg p-4 z-50 border border-gray-200"
      style={{ minWidth: 260 }}
    >
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        onClick={onClose}
        tabIndex={-1}
      >
        ×
      </button>
      <div className="mb-2 text-lg font-bold text-gray-800">通知</div>
      <ul className="divide-y divide-gray-200">
        {mockNotifications.map((n) => (
          <li
            key={n.id}
            className={`py-2 px-1 cursor-pointer ${
              readIds.includes(n.id) ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
            onClick={() => handleRead(n.id)}
          >
            <div
              className={`text-sm ${
                readIds.includes(n.id) ? "text-gray-400" : "text-gray-700"
              }`}
            >
              {n.message}
            </div>
            <div className="text-xs text-gray-400 mt-1">{n.date}</div>
          </li>
        ))}
      </ul>
      {mockNotifications.length === 0 && (
        <div className="text-gray-400 text-center py-6">通知がありません。</div>
      )}
    </div>
  );
};

export default NotificationModal;

"use client";
import React, { useState } from "react";
import { MdEventSeat } from "react-icons/md";

// 49인승 버스 좌석 배열 (예시: 11행 5열, 일부는 통로)
const ROWS = 11;
const COLS = 5;
const TOTAL_SEATS = 49;

// 좌석 번호 생성 (1~49)
const seatNumbers = Array.from({ length: TOTAL_SEATS }, (_, i) => i + 1);

// 테스트용 유저 정보
const testUser = { name: "홍길동", email: "hong@example.com" };

const BusSeatReservationContainer: React.FC = () => {
  // 예약된 좌석: { [seatNumber]: user }
  // const [reserved, setReserved] = useState<{ [key: number]: typeof testUser }>({});
  const [selected, setSelected] = useState<number | null>(null);

  // 좌석 클릭 핸들러 (선택만, 콘솔 로그 추가)
  const handleSeatClick = (seat: number) => {
    console.log("좌석 클릭:", seat);
    setSelected(seat);
  };

  // 좌석 UI 렌더링
  const renderSeats = () => {
    let seatIdx = 0;
    const rows = [];
    for (let r = 0; r < ROWS; r++) {
      const cols = [];
      for (let c = 0; c < COLS; c++) {
        // 예시: 2-통로-2 구조 (COLS=5, c==2는 통로)
        if (c === 2) {
          cols.push(<div key={`aisle-${r}`} className="w-6 h-6 mx-1" />);
          continue;
        }
        if (seatIdx >= seatNumbers.length) break;
        const seatNumber = seatNumbers[seatIdx++];
        // const isReserved = !!reserved[seatNumber];
        const isSelected = selected === seatNumber;
        cols.push(
          <button
            key={seatNumber}
            className={`w-12 h-12 m-1 rounded-full border flex flex-col items-center justify-center text-xs font-bold transition
              ${
                isSelected
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800 hover:bg-blue-100"
              }
              shadow-md
            `}
            onClick={() => handleSeatClick(seatNumber)}
            // disabled={isReserved}
            title={`좌석 ${seatNumber}`}
          >
            <MdEventSeat size={22} className="mb-0.5" />
            <span>{seatNumber}</span>
          </button>
        );
      }
      rows.push(
        <div key={r} className="flex justify-center mb-1">
          {cols}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="flex flex-col items-center py-10">
      <h2 className="text-2xl font-bold mb-6">49인승 버스 좌석 예약</h2>
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        {renderSeats()}
      </div>
      <div className="mt-6">
        <div className="flex items-center space-x-4">
          <div className="w-6 h-6 rounded-full bg-blue-500 inline-block mr-1" />{" "}
          <span>선택한 좌석</span>
          <div className="w-6 h-6 rounded-full bg-white border inline-block mx-1" />{" "}
          <span>예약 가능</span>
        </div>
      </div>
    </div>
  );
};

export default BusSeatReservationContainer;

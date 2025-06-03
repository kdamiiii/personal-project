"use client";

import { useState } from "react";
import { Button } from "./buttons";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const weekdayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Calendar: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(0);
  const today = new Date();
  const { dates, month } = generateCalendarDates(selectedMonth);

  const handleMonthChange = (change: number) => {
    setSelectedMonth((prev) => prev + change);
  };

  return (
    <div className="grid grid-cols-7 border-t-1 border-r-1 bg-white w-[60%]">
      <div className="flex justify-between items-center border-l-1 col-span-7 text-center p-2 font-bold">
        <Button handleOnClickAction={() => handleMonthChange(-1)}>
          <FaArrowLeft />
        </Button>
        {month} {today.getFullYear()}
        <Button handleOnClickAction={() => handleMonthChange(1)}>
          <FaArrowRight />
        </Button>
      </div>
      {weekdayNames.map((weekday) => (
        <CalendarDay
          className="bg-blue-950 text-white border-black"
          key={weekday}
          isSquare={false}
        >
          {weekday}
        </CalendarDay>
      ))}
      {dates.map((m, ind) => {
        return (
          <CalendarDay
            key={ind}
            isGray={!m}
            isToday={
              !!m
                ? m && m.day === today.getDate() && m.month === today.getMonth()
                : false
            }
          >
            {!!m ? m.day : ""}
          </CalendarDay>
        );
      })}
    </div>
  );
};

const CalendarDay: React.FC<{
  children: React.ReactNode;
  isGray?: boolean;
  isSquare?: boolean;
  isToday?: boolean;
  className?: string;
}> = ({
  children,
  isGray = false,
  isSquare = true,
  isToday = false,
  className = "",
}) => {
  return (
    <div
      className={`flex justify-center items-start p-2 border-l-1 border-b-1 ${
        isSquare && "aspect-square"
      } ${isGray ? "bg-gray-300" : ""} ${className}`}
    >
      <div
        className={`flex justify-center items-center p-3 font-bold text-lg rounded-2xl w-5 h-5 ${
          isToday && "bg-amber-400"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

const generateCalendarDates = (change: number) => {
  const today = new Date();
  const nextMonth = new Date(today);

  // Add 1 month to the current date
  nextMonth.setMonth(today.getMonth() + change);

  const now = nextMonth;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get current year and month
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed: 0 = January, 4 = May, etc.

  // Get number of days in the current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Array of weekday names

  const mm = [];

  // Loop through all days in the current month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const weekday = weekdayNames[date.getDay()];
    mm.push({ day, month, weekday });
  }

  const dates = [
    ...Array.from({ length: weekdayNames.indexOf(mm[0].weekday) }, () => null),
    ...mm,
    ...Array.from(
      { length: 35 - daysInMonth - weekdayNames.indexOf(mm[0].weekday) },
      () => null
    ),
  ];

  if (dates.length > 35) {
    return {
      dates: [
        ...dates,
        ...Array.from({ length: 42 - dates.length }, () => null),
      ],
      month: monthNames[month],
    };
  }

  return {
    dates,
    month: monthNames[month],
  };
};

export default Calendar;

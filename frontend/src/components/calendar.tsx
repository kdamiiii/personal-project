"use client";

import { useEffect, useState } from "react";
import { Button } from "./buttons";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useFetchCalendarEvents } from "@/utils/fetchCalendarData";
import { TestForm } from "./forms";
import { useForm } from "@tanstack/react-form";
import { apiHostname, RequestError } from "@/constants/generalTypes";
import { Spinner } from "./spinner";
import { formatDate } from "@/utils/dateUtils";

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

  const { data, isLoading } = useFetchCalendarEvents(
    today.getMonth() + selectedMonth,
    today.getFullYear()
  );

  useEffect(() => {}, [data]);

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
      {!isLoading && !!data ? (
        dates.map((m, ind) => {
          return (
            <CalendarDay
              key={ind}
              isGray={!m}
              isToday={
                !!m
                  ? m &&
                    m.day === today.getDate() &&
                    m.month === today.getMonth()
                  : false
              }
            >
              {!!m ? m.day : ""}
              <CalendarEvents>
                {!!m &&
                  data
                    .filter(
                      (d) =>
                        d.date ===
                        formatDate(
                          `${today.getFullYear()}-${
                            m?.month ? m.month + 1 : ""
                          }-${m?.day ? m.day : ""}`
                        )
                    )
                    .map((calendarEvent) => {
                      return (
                        <div
                          key={calendarEvent.title}
                          className="text-xs text-gray-700 mt-1"
                        >
                          {calendarEvent.title}
                        </div>
                      );
                    })}
              </CalendarEvents>
            </CalendarDay>
          );
        })
      ) : (
        <div className="col-span-7 flex justify-center items-center h-full">
          <Spinner />
        </div>
      )}
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
      className={`flex flex-col items-center justify-start p-2 border-l-1 border-b-1 ${
        isSquare && "aspect-square"
      } ${isGray ? "bg-gray-300" : ""} ${className}`}
    >
      <div
        className={`flex flex-col justify-center items-center p-3 font-bold text-lg rounded-2xl ${
          isToday && "bg-amber-400"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export const EventCreationForm: React.FC = () => {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      date: "",
      for_role: "47822522-3bdb-4a9f-8c59-92f6496b5839",
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await fetch(`${apiHostname}/calendar_events`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title: value.title,
            description: value.description,
            date: value.date,
            for_role: value.for_role,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new RequestError(
            errorData.status,
            errorData.message || "Something went wrong"
          );
        }
      } catch (e) {
        console.log(e);
      }
    },
  });
  return (
    <div className="w-2xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex flex-col gap-5 w-[30%]"
      >
        <TestForm
          form={form}
          row
          name="title"
          label="Event Title"
          placeHolder="Enter Event Title"
          validators={{
            onChange: ({ value }) => {
              return !value ? "Event title is required" : undefined;
            },
          }}
        />

        <TestForm
          form={form}
          row
          name="description"
          label="Event Description"
          placeHolder="Enter Event Description"
          validators={{
            onChange: ({ value }) => {
              return !value ? "Event Description is required" : undefined;
            },
          }}
        />

        <TestForm
          form={form}
          type="date"
          row
          name="date"
          label="Event Date"
          placeHolder="Enter Event Date"
          validators={{
            onChange: ({ value }) => {
              return !value ? "Event Date is required" : undefined;
            },
          }}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          // eslint-disable-next-line react/no-children-prop
          children={([canSubmit, isSubmitting]) => (
            <Button
              disabled={!canSubmit || isSubmitting}
              type="submit"
              className="w-full"
            >
              {isSubmitting ? <Spinner /> : "Create New Course"}
            </Button>
          )}
        />
      </form>
    </div>
  );
};

const CalendarEvents: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <div className="flex flex-col gap-2">{children}</div>;
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

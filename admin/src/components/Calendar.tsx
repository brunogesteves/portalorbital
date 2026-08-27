"use client";

import { useState, useRef, useEffect } from "react";
import { FiCalendar, FiClock, FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface CalendarProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

const MONTHS_PT = [
  "Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const DAYS_PT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function Calendar({ value, onChange, error }: CalendarProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [viewDate, setViewDate] = useState(() => {
    if (value) {
      const [datePart] = value.split("T");
      const [y, m, d] = datePart.split("-").map(Number);
      return new Date(y, m - 1, d);
    }
    return new Date();
  });
  const [selectedTime, setSelectedTime] = useState(() => {
    if (value && value.includes("T")) {
      return value.split("T")[1];
    }
    return "12:00";
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const formattedDate = value
    ? (() => {
        const [datePart, timePart] = value.split("T");
        const [y, m, d] = datePart.split("-");
        return `${d}/${m}/${y} ${timePart || ""}`;
      })()
    : "";

  function selectDay(day: number) {
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    const dateStr = `${year}-${m}-${d}`;
    onChange(`${dateStr}T${selectedTime}`);
    setShowPicker(false);
  }

  function handleTimeChange(newTime: string) {
    setSelectedTime(newTime);
    if (value) {
      const [datePart] = value.split("T");
      onChange(`${datePart}T${newTime}`);
    }
  }

  function prevMonth() {
    setViewDate(new Date(year, month - 1, 1));
  }

  function nextMonth() {
    setViewDate(new Date(year, month + 1, 1));
  }

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} />);
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let d = 1; d <= daysInMonth; d++) {
    const dayDate = new Date(year, month, d);
    dayDate.setHours(0, 0, 0, 0);
    const isPast = dayDate < today;
    const isSelected = value && value.startsWith(`${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`);
    days.push(
      <button
        key={d}
        type="button"
        onClick={() => !isPast && selectDay(d)}
        disabled={isPast}
        className={`w-7 h-7 rounded-full text-xs font-semibold transition-all ${
          isSelected
            ? "bg-red-600 text-white"
            : isPast
              ? "text-gray-300 cursor-not-allowed"
              : "hover:bg-red-100 text-gray-700"
        }`}
      >
        {d}
      </button>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <div
        onClick={() => setShowPicker(!showPicker)}
        className={`w-full border-2 rounded-2xl px-4 py-3 outline-none transition-all font-semibold cursor-pointer flex items-center justify-between text-sm ${
          error
            ? "border-red-200 focus:border-red-500 bg-red-50/30"
            : "border-gray-100 focus:border-red-600 focus:bg-white bg-gray-50/50"
        }`}
      >
        <span className={formattedDate ? "text-gray-900" : "text-gray-400"}>
          {formattedDate || "Selecione a data e hora"}
        </span>
        <FiCalendar size={16} className="text-gray-400" />
      </div>

      {showPicker && (
        <div className="absolute z-50 mt-1 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 w-64">
          <div className="flex items-center justify-between mb-2">
            <button type="button" onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded">
              <FiChevronLeft size={14} />
            </button>
            <span className="font-bold text-gray-900 text-xs">
              {MONTHS_PT[month]} {year}
            </span>
            <button type="button" onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded">
              <FiChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-0.5 mb-1">
            {DAYS_PT.map((day) => (
              <div key={day} className="text-center text-[10px] font-bold text-gray-400 py-0.5">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0.5 mb-3">
            {days}
          </div>

          <div className="border-t border-gray-100 pt-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5">
              <FiClock size={12} />
              <span className="font-semibold">Horario</span>
            </div>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => handleTimeChange(e.target.value)}
              className="w-full border-2 border-gray-100 rounded-lg px-2 py-1.5 text-xs font-semibold outline-none focus:border-red-600"
            />
          </div>
        </div>
      )}
    </div>
  );
}

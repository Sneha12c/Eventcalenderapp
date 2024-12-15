import React from 'react';

function Calendercomponent({ currentMonth, onDateClick, className = ''  , moveevents}) {
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayIndex = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const today = new Date();
  const isToday = (day) => {
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };
  
  const handledragstart = (e , date)=>{
    e.dataTransfer.setData("text/plain" , date);
  }
  
  const handleDrop = (e , date)=>{
    const sourcedate = e.dataTransfer.getData("text/plain"); 
    e.preventDefault();
    if(sourcedate && sourcedate !== date){
     moveevents(sourcedate , date);
    }
  }

  const handledragover = (e)=>{
    e.preventDefault();
  }

  return (
    <div className={`grid grid-cols-7 gap-2 ${className}`}>
      {/* Weekday Headers */}
      {[ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' , 'Sun'].map((day) => (
        <div key={day} className="font-bold text-center">
          {day}
        </div>
      ))}

      {/* Empty spaces for days before the first day of the month */}
      {Array.from({ length: firstDayIndex }).map((_, i) => (
        <div key={i}></div>
      ))}

      {/* Render days */}
      {days.map((day) => {
        const date = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isWeekend = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).getDay() === 5 || new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).getDay() === 6;
        return (
          <div
            key={day}
            draggable
            onDragStart={(e)=>handledragstart(e , date)}
            onDrop={(e)=>handleDrop(e , date)}
            onDragOver={handledragover}
            onClick={() => onDateClick(date)}
            className= {` text-center cursor-pointer p-4 rounded hover:bg-blue-200 ${
              isWeekend ? 'bg-red-100' : ''
            } ${isToday(day) ? 'bg-red-300 text-white' : ''} `}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
}

export default Calendercomponent;

import React from 'react';

const EventList = ({ events, removeEvent, updateEvent }) => {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'work':
        return 'bg-blue-500'; // Blue for work events
      case 'personal':
        return 'bg-green-500'; // Green for personal events
      case 'others':
        return 'bg-yellow-500'; // Yellow for others
      default:
        return 'bg-blue-500'; // Default gray color
    }
  };

  return (
    <div className="mt-4 w-full ">
    {Array.isArray(events) && events.length > 0 ? (
      events.map((event, index) => (
        <div
          key={index}
          className={`p-4 shadow-md rounded-lg ${getCategoryColor(event.category)} w-full `}
        >
          <h3 className="font-semibold text-white">{event.name}</h3>
          <p className="text-white">{event.startTime} - {event.endTime}</p>
          {event.description && (
            <p className="text-white truncate">{event.description}</p>
          )}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-2 space-x-4">
            <button
              className="text-blue-900 bg-blue-200 hover:bg-blue-300 px-4 py-2 rounded-md transition-all duration-200 ease-in-out shadow-md"
              onClick={() => updateEvent(event.date, index, event)}
            >
              Edit
            </button>
            <button
              className="text-red-500 bg-red-200 hover:bg-red-300 px-4 py-2 rounded-md transition-all duration-200 ease-in-out shadow-md mt-2 sm:mt-0"
              onClick={() => removeEvent(event.date, index)}
            >
              Delete
            </button>
          </div>
        </div>
      ))
    ) : (
      <p>No events for this day</p>
    )}
   </div>  
  );
};

export default EventList;

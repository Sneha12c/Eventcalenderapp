import React, { useEffect, useState } from 'react';
import { Calendercomponent, Eventmodal, EventList } from '../Components/index';
import { useEvent } from '../Hooks/useEvent';

function HomeEventPage() {
  const { events, addEvent, removeEvent, updateEvent , moveevents } = useEvent();
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [eventDetails, setEventDetails] = useState([]);
  const [keyword, setKeyword] = useState('');

  // State for EventDetails
  const [filterDate, setFilterDate] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(events);

  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowEventModal(true);
  };

  const handleEventSubmit = (event) => {
    if (!selectedDate) {
      alert('Please select a date first!');
      return;
    }
    if (!event.name || !event.startTime || !event.endTime) {
      alert('Event name and timings are required!');
      return;
    }
    
    if (eventDetails.index !== undefined) {
    // Update existing event
    updateEvent(selectedDate, eventDetails.index, event);
    } else {
    // Add new event
    addEvent(event);
    }
    setShowEventModal(false);
    setEventDetails({});
  };

  const handleEditEvent = (date, index, event) => {
    setSelectedDate(date);
    setEventDetails({ ...event, index }); 
    setShowEventModal(true);
  };
  
  useEffect(()=>{
    let filtered = [];

    // Filter by selected date
    if (filterDate && events[filterDate]) {
      filtered = events[filterDate];
    }

    // Filter by keyword in the event title or description
    if (filterDate && keyword && events[filterDate]) {
      filtered = events[filterDate].filter(event => 
        event.name.toLowerCase().includes(keyword.toLowerCase()) ||
        event.description.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  },[keyword , filterDate , events])

  // EventDetails Handlers
  const handleFilterDateChange = (e) => {
    const date = e.target.value;
    setFilterDate(date);
  };

  const handleKeywordChange = (e)=>{
     setKeyword(e.target.value);
  }

  const exporttoJSON = ()=>{
    const blob = new Blob([JSON.stringify(filteredEvents , null , 2)] , {type: 'application/json'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'events.json';
    link.click();
  }

  const exporttoCSV = ()=>{
    const headers =  ['name', 'startTime','endTime', 'Description'];
    const row = filteredEvents.map((event)=>([
        event.name,
        event.startTime,
        event.endTime,
        event.description,
    ]))
    const csvcontent = [headers , ...row];
    const blob = new Blob([csvcontent] , {type: 'text/csv'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'events.csv';
    link.click();
  }

  return (
    <div className="h-full min-h-screen w-full bg-blue-900">
  <h1 className="text-3xl font-bold text-white text-center p-2 mb-6">
    Welcome to Event Calendar
  </h1>
  <div className="flex flex-col md:flex-row h-full w-full p-2 bg-blue-900">
    {/* Calendar Section */}
    <div className="w-full md:w-1/2 bg-white rounded-lg p-6 m-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePreviousMonth}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Previous
        </button>
        <h2 className="text-xl font-bold">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button
          onClick={handleNextMonth}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>

      <Calendercomponent currentMonth={currentMonth} onDateClick={handleDateClick} moveevents={moveevents} />

      {showEventModal && (
        <Eventmodal
          date={selectedDate}
          event={eventDetails}
          onClose={() => setShowEventModal(false)}
          onSubmit={handleEventSubmit}
        />
      )}
    </div>

    {/* EventDetails Section */}
    <div className="w-full md:w-1/2 bg-blue-100 rounded-lg p-4 m-6 shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Event Details</h1>

      {/* Input for date selection */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row sm:space-x-4 w-full sm:w-auto">
          <label htmlFor="filterDate" className="block text-lg text-blue-600 mb-2">
            Select Date:
          </label>
          <input
            id="filterDate"
            type="date"
            value={filterDate}
            onChange={handleFilterDateChange}
            className="px-4 py-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-48"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-4 w-full sm:w-auto">
          <label htmlFor="filterKeyword" className="block text-lg text-blue-600 mb-2">
            Filter by Keyword:
          </label>
          <input
            id="filterKeyword"
            type="text"
            value={keyword}
            onChange={handleKeywordChange}
            placeholder="Search by title or description"
            className="px-4 py-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-48"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
        <button
          onClick={exporttoJSON}
          className="bg-green-500 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Export as JSON
        </button>
        <button
          onClick={exporttoCSV}
          className="bg-yellow-500 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Export as CSV
        </button>
      </div>

      {/* Display events using EventList component */}
      <EventList events={filteredEvents} removeEvent={removeEvent} updateEvent={handleEditEvent} />
    </div>
  </div>
  </div>

  );
}

export default HomeEventPage;

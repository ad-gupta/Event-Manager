import React, { useState, useEffect } from "react";
import EventList from "./components/EventList";
import EventForm from "./components/EventForm";
import axiosInstance from "./axiosInstance.js";
import { MdOutlineCreateNewFolder } from "react-icons/md";

function App() {
  const [events, setEvents] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchEvents = async () => {
    try {
      const queryParams = [];
      if (searchName) queryParams.push(`name=${searchName}`);
      if (searchDate) queryParams.push(`date=${searchDate}`);

      const queryString =
        queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
      const { data } = await axiosInstance.get(
        `/events${queryString}`
      );
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSearch = () => {
    fetchEvents();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axiosInstance.delete(`/events/${id}`);
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setIsFormOpen(true); // Open the form when editing
  };

  const handleRSVP = async (id) => {
    try {
      await axiosInstance.post(`/events/${id}/rsvp`);
      fetchEvents();
    } catch (error) {
      console.error("Error toggling RSVP:", error);
    }
  };

  const handleFormSubmit = async (formData) => {
    if (editingEvent) {
      // update
      try {
        await axiosInstance.put(
          `/events/${editingEvent.id}`,
          formData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setEditingEvent(null);
        fetchEvents();
      } catch (error) {
        console.error("Error updating event:", error);
      }
    } else {
      // create
      try {
        await axiosInstance.post("/events", formData, {
          headers: { "Content-Type": "application/json" },
        });
        fetchEvents();
      } catch (error) {
        console.error("Error creating event:", error);
      }
    }
    setIsFormOpen(false);
  };

  const handleAddEventClick = () => {
    setEditingEvent(null);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-4xl mx-auto lg:w-[50%] m-auto bg-white min-h-[95vh] rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Event Manager
        </h1>

        <div className="mb-6 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="px-4 py-2 w-full sm:w-[60%] border border-black rounded-md"
          />
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="px-4 py-2 w-full sm:w-[20%] border border-black rounded-md"
          />
          <button
            onClick={handleSearch}
            className="bg-gradient-to-l from-slate-950 to-slate-500 text-white px-4 py-2 w-full sm:w-[20%] rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={handleAddEventClick}
            className="bg-gradient-to-l from-slate-950 to-slate-500 text-white rounded-sm p-1 px-5"
          >
            <MdOutlineCreateNewFolder size={24} />
          </button>
        </div>

        <EventList
          events={events}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onRSVP={handleRSVP}
        />

        {isFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <EventForm
                onSubmit={handleFormSubmit}
                editingEvent={editingEvent}
                onCancel={handleFormClose}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

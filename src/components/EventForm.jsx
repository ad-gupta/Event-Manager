import React, { useState, useEffect } from "react";

const EventForm = ({ onSubmit, editingEvent, onCancel }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (editingEvent) {
      setName(editingEvent.name || "");
      setDescription(editingEvent.description || "");
      setDate(editingEvent.date || "");
      setLocation(editingEvent.location || "");
    } else {
      resetForm();
    }
  }, [editingEvent]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setDate("");
    setLocation("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !date) {
      alert("Name and date are required!");
      return;
    }
    onSubmit({ name, description, date, location });
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 mt-4">
      <h2 className="text-xl font-bold mb-2">
        {editingEvent ? "Edit Event" : "Add New Event"}
      </h2>
      <div className="mb-2">
        <label className="block font-semibold">Name:</label>
        <input
          type="text"
          className="border rounded w-full px-2 py-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <label className="block font-semibold">Description:</label>
        <textarea
          className="border rounded w-full px-2 py-1"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="block font-semibold">Date:</label>
        <input
          type="date"
          className="border rounded w-full px-2 py-1"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <label className="block font-semibold">Location:</label>
        <input
          type="text"
          className="border rounded w-full px-2 py-1"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2 mt-4">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-1 rounded"
        >
          {editingEvent ? "Update" : "Add"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 px-4 py-1 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EventForm;

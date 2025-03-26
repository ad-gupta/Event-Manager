import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { BsToggle2Off } from "react-icons/bs";
import { BsToggle2On } from "react-icons/bs";

const EventList = ({ events, onDelete, onEdit, onRSVP }) => {
  return (
    <div className="">
      <table className="w-full text-left border border-black">
        <thead className="bg-gradient-to-r from-slate-950 to-slate-500 text-slate-100">
          <tr>
            <th className="border-b p-2">Name</th>
            <th className="border-b p-2">Date</th>
            <th className="border-b p-2">Location</th>
            <th className="border-b p-2">RSVP</th>
            <th className="border-b p-2">Actions</th>
          </tr>
        </thead>
        <tbody className="">
          {events && events.length > 0 ? (
            events.map((event, ind) => (
              <tr key={event.id} className={`${ind%2 ? 'bg-gradient-to-r from-slate-950 to-slate-500 text-slate-200': 'bg-neutral-100 text-slate-950'}`}>
                <td className="border-b p-2">{event.name}</td>
                <td className="border-b p-2">{event.date}</td>
                <td className="border-b p-2">{event.location}</td>
                <td className="border-b p-2">
                  <button
                    onClick={() => onRSVP(event.id)}
                    className={`${event.rsvp ? `text-green-600` : `text-red-600`} text-2xl px-2 py-1 rounded`}
                  >
                    {event.rsvp ? <BsToggle2On />: <BsToggle2Off />}
                  </button>
                </td>
                <td className="border-b p-2 space-x-2">
                  <button
                    onClick={() => onEdit(event)}
                    className="text-xl text"
                  >
                    <CiEdit />
                  </button>
                  <button
                    onClick={() => onDelete(event.id)}
                    className="text-xl text-red-700"
                  >
                    <MdOutlineDelete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No events found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EventList;

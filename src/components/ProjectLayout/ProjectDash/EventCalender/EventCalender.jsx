import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './EventCalender.css'
import ECEvents from "../ECEvents";

const EventCalender = () => {
    const [value, onChange] = useState(new Date());
    return (
        <div className="border border-gray-300 rounded-xl">
          <Calendar onChange={onChange} value={value} />
          <ECEvents />
        </div>
    );
};

export default EventCalender;
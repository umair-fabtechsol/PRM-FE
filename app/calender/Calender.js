"use client";
import React from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

const Calender = ({ calendarRef }) => {


  return (
    <>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin]}
        // headerToolbar={{
        //   right: 'dayGridMonth,timeGridWeek,timeGridDay',
        // }}
        editable={true}
        selectable={true}
      />
    </>
  )
}

export default Calender;

import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { db } from '../firebase';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';

moment.locale('es');
const localizer = momentLocalizer(moment);

const CrossfitCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const workoutsQuery = query(collection(db, "workouts"), orderBy("date"));
      const querySnapshot = await getDocs(workoutsQuery);
      const fetchedEvents = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          start: new Date(data.date),
          end: new Date(data.date),
          desc: data.description
        };
      });
      setEvents(fetchedEvents);
    };

    fetchWorkouts();
  }, []);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  // Función para convertir <br> en saltos de línea reales
  const formatDescription = (description) => {
    return description.split('<br>').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < description.split('<br>').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="h-screen flex flex-col relative">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 20px)' }}
        onSelectEvent={handleSelectEvent}
        views={['month', 'week', 'day']}
        messages={{
          next: "Siguiente",
          previous: "Anterior",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día"
        }}
      />
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{selectedEvent.title}</h3>
            <p className="text-gray-600 mb-6">{formatDescription(selectedEvent.desc)}</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={() => setSelectedEvent(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrossfitCalendar;
import {useState , useEffect} from "react";

const useEvent= ()=>{
    const [events , setEvents] = useState({});
    
    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('events')) || {};
        setEvents(storedEvents);
    }, []);

    useEffect(() => {
        if (Object.keys(events).length > 0) {
          localStorage.setItem('events', JSON.stringify(events));
        }
    }, [events]); 

    const addEvent = (event)=>{
    
    const overlapping = events[event.date]=== undefined ? false : events[event.date].some((et)=>{
        return(
        (event.startTime >= et.startTime && event.startTime < et.endTime) ||
        (event.endTime > et.startTime && event.endTime <= et.endTime)
        );
    })
    
    if (overlapping) {
        alert('Event overlaps with another event!');
        return;
    }

    const newevents = {...events };
    const eventdate = event.date;
    if(!newevents[eventdate]){
     newevents[eventdate] = [];
    }
    newevents[eventdate].push(event);
    setEvents(newevents);
    localStorage.setItem("events" , JSON.stringify(newevents));
    }
    
    const removeEvent = (date , eventindex)=>{
    const newevents = {...events};
    newevents[date].splice(eventindex , 1);
    if(newevents[date].length === 0)
    delete newevents[date];
    setEvents(newevents);
    localStorage.setItem("events" , JSON.stringify(newevents)); 
    }

    const updateEvent =  (date , index , updatedevent)=>{
        let overlapping = false
        if(events[date] !== undefined){
            for (let i = 0; i < events[date].length; i++) {
               let et = events[date][i];
               if(i!==index){
                 if((updatedevent.startTime >= et.startTime && updatedevent.startTime < et.endTime) ||
                    (updatedevent.endTime > et.startTime && updatedevent.endTime <= et.endTime)){
                     overlapping = true;
                     break;
                    }
               }
            }
        }  
        
        if (overlapping) {
            alert('Event overlaps with another event!');
            return;
        }
    const newevents = {...events};
    newevents[date][index] = updatedevent; 
    setEvents(newevents);
    localStorage.setItem("events" , JSON.stringify(newevents));
    }

    const moveevents = (sourcedate , targetdate)=>{
     const newevents = {...events};
     if(newevents[sourcedate]){
     if(!newevents[targetdate]){
       newevents[targetdate] = []
     }
     newevents[targetdate] = [...newevents[sourcedate] , ...newevents[targetdate]];
     delete newevents[sourcedate];
     setEvents(newevents);
     localStorage.setItem("events" , JSON.stringify(newevents));
    }
    }

    return { events , addEvent , updateEvent , removeEvent , moveevents};

}

export {useEvent};

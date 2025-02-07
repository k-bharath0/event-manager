import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Header from './Header';
import EventDetails from '../Dashboard/Event/EventDetails';
import ViewEventModal from '../Dashboard/Event/ViewEventModal';
import Search from '../Dashboard/Event/Search';
import { Container } from 'react-bootstrap';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Guest() {
    const [show2, setShow2] = useState(false);
    const [events, setEvents] = useState([]);
    const [events2, setEvents2] = useState([]);
    const [vevent,setVevent] = useState([]);
    const [search,setSearch] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = () => {
        axios.get(`${API_BASE_URL}/events`)
            .then((res) => {
                const SortOrder = res.data.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);
                setEvents(SortOrder);
                setEvents2(SortOrder);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const EventSearch = ({category,date}) => {
        setSearch(true);
        console.log(category)
        let searchData = events.filter((e) => e.category === category);
        if(date==="asc"){
            searchData=searchData.sort((a,b)=> a.date > b.date ? 1: -1)
        }
        if(date==="desc"){
            searchData=searchData.sort((a,b)=> a.date > b.date ? -1: 1)
        }
        setEvents2(searchData);
      };

      const fetchAllEvents = () => {
        setSearch(false);
        setEvents2(events);
      };

    return (
        <div>
            <Header/>
            <Search EventSearch={EventSearch}/>
            
            
            <Container>
            {search &&
            <Button onClick={fetchAllEvents} style={{marginLeft:"100%"}} className="btn-close" aria-label="Close"></Button>}
            <h2>All Events</h2>
          {events2.map((event) => (
                <EventDetails d={false} d2={true} key={event.name} event={event} openModal={()=>{setVevent(event);setShow2(true)}}/>
            ))}   
            </Container>
            <ViewEventModal int="interestedEvents"  fetch={fetchEvents} closeModal={() => setShow2(false)} show={show2} event={vevent}/>
        </div>
    );
}

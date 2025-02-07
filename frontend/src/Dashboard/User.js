import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Header from '../pages/Header';
import EventDetails from './Event/EventDetails';
import NewEventModal from './Event/NewEventModal';
import ViewEventModal from './Event/ViewEventModal';
import Search from './Event/Search';
import { Container,Tabs,Tab } from 'react-bootstrap';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function User() {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [events, setEvents] = useState([]);
    const [events2, setEvents2] = useState([]);
    const [fevents, setFevents] = useState([]);
    const [ievents, setIevents] = useState([]);
    const [vevent,setVevent] = useState([]);
    const [search,setSearch] = useState(false);
    const [key, setKey] = useState('myEvents'); 

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = () => {
        axios.get(`${API_BASE_URL}/events`)
            .then((res) => {
                const SortOrder = res.data.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);
                const filteredData = SortOrder.filter(events => events.userId === localStorage.getItem('user'));
                const Interested = SortOrder.filter(events => events.interestedUsers.includes(localStorage.getItem('user')));
                setEvents(SortOrder);
                setEvents2(SortOrder);
                setFevents(filteredData);
                setIevents(Interested);
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
            <Header openEventModal={() => setShow(true)} />
            <Search EventSearch={EventSearch}/>
            <Container>
            {search &&
            <Button onClick={fetchAllEvents} style={{marginLeft:"100%"}} className="btn-close" aria-label="Close"></Button>}
        <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="pt-5">
          <Tab eventKey="myEvents" title="My Events">
          {fevents.map((event) => (
                <EventDetails d={true} d2={false} key={event.name} event={event} openModal={()=>{setVevent(event);setShow2(true)}} />
            ))}
          </Tab>
          <Tab eventKey="interestedEvents" title="Interested Events">
          {ievents.map((event) => (
                <EventDetails d={false} d2={true}  key={event.name} event={event} openModal={()=>{setVevent(event);setShow2(true)}}/>
            ))}
          </Tab>
          <Tab eventKey="allEvents" title="All Events">
          {events2.map((event) => (
                <EventDetails d={false} d2={true} key={event.name} event={event} openModal={()=>{setVevent(event);setShow2(true)}}/>
            ))}
          </Tab>
        </Tabs>
      </Container>
            <NewEventModal fetch={fetchEvents} closeEventModal={() => setShow(false)} show={show} />
            <ViewEventModal int={key} fetch={fetchEvents} closeModal={() => setShow2(false)} show={show2} event={vevent}/>
        </div>
    );
}

import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Search = ({ EventSearch }) => {
  const [category, setCategory] = useState('Social Events');
  const [date, setDate] = useState('asc');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
        setCategory(value);
    } else if (name === 'date') {
        setDate(value);
    }
  };

  const searchBar = {
    backgroundColor: '#fff',
    boxShadow: '0px 1px 5px rgba(0,0,0,0.4)',
    borderRadius: '5px',
    marginTop: '-35px',
  };

  return (
    <div>
      <Container style={searchBar} className="p-4 mb-3">
        <Row>
          <Col className="p-2">
            <select
              name="category"
              value={category}
              className="w-100 h-100 p-2"
              onChange={handleChange}
            >
                                        <option value="Social Events">Social Events</option>
                                        <option value="Corporate Events">Corporate Events</option>
                                        <option value="Cultural & Traditional Events">Cultural & Traditional Events</option>
                                        <option value="Educational Events">Educational Events</option>
                                        <option value="Entertainment & Media Events">Entertainment & Media Events</option> 
            </select>
          </Col>
          <Col className="p-2">
            <select
              name="date"
              value={date}
              className="w-100 h-100 p-2"
              onChange={handleChange}
            >
              <option value="asc">Event Date Ascending</option>
              <option value="desc">Event Date Descending</option>
            </select>
          </Col>
          <Col className="p-2">
            <Button
              onClick={() => EventSearch({ category, date })}
              className="w-100"
              variant="info"
            >
              Search
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Search;

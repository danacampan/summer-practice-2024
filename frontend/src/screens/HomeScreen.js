import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
//import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Recommendation from '../components/Recommendation';
import { Helmet } from 'react-helmet-async';
import MessageBox from '../components/MessageBox';
import data from '../data';
import { Link } from 'react-router-dom';

function HomeScreen() {
  /* useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/recommendations ');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []); */

  return (
    <div>
      <Helmet>
        <title>Filmster</title>
      </Helmet>
      <h1>Home</h1>
      <Row>
        {data.recommendations.map((recommendation, index) => (
          <Col
            key={index}
            sm={6}
            md={4}
            lg={4}
            className="recommendations mb-4"
          >
            <Card className="recommendations">
              <Card.Img
                variant="top"
                src={recommendation.image}
                alt={recommendation.name}
              />
              <Card.Body>
                <Card.Title>{recommendation.name}</Card.Title>

                <div className="d-flex flex-row px-2">
                  <p
                    style={{ color: '#919090', marginTop: '11px' }}
                    className="be-vietnam-pro-semibold"
                  >
                    {recommendation.place}
                  </p>
                </div>

                <Card.Text>{recommendation.message}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
export default HomeScreen;

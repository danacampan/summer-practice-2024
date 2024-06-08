import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Store } from '../store';

function Recommendation(props) {
  const { recommendation } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);

  return (
    <Card className="recommendation-card">
      <Link to={`/recommendation/${recommendation.name}`}>
        <img
          src={recommendation.image}
          className="card-img-top"
          alt={recommendation.name}
        />
      </Link>
      <div className="recommendation-info">
        <Row>
          <Col>
            <Link
              className="be-vietnam-pro-semibold name-link"
              to={`/pet/${recommendation.name}`}
            >
              <p>{recommendation.name}</p>
            </Link>
            <Link
              className="be-vietnam-pro-semibold name-link"
              to={`${recommendation.link}`}
            >
              <p>{recommendation.link}</p>
            </Link>
            <div>
              <p>{recommendation.message}</p>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
}
export default Recommendation;

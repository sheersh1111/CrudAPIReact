import { Card, Col, Row } from "react-bootstrap";
import Styles from './styles.module.css'
import { useNavigate } from "react-router-dom";
export function StoryCard({ title, dek, image , index }) {
  const navigate =useNavigate();
  return (
    <div className="m-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <Card style={{ width: '80vw', left: '10vw', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Card.Header style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)',cursor:'pointer' }} onClick={()=>{navigate(`/post/${index}`)}}>
          <b style={{ color: '#333' }}>{title}</b>
        </Card.Header>
        <Card.Body>
          <Row className="d-flex justify-content-between" style={{ textAlign: 'left' }}>
            <Col md={2}>
              <img
                src={image}
                alt={''}
                width={'200px'}
                style={{ marginLeft: '10px', borderRadius: '10px' }}
                className={Styles.image}
              />
            </Col>
            <Col md={7} className="mx-4" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
              <span>{dek}</span>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

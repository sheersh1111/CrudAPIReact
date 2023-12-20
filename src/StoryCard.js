import { Card, Col, Row } from "react-bootstrap";

export function StoryCard({title,dek,image}){
    return(
        <div className="m-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
            <Card>
                <Card.Header>
                    <b>{title}</b>
                </Card.Header>
                <Card.Body>
                    <Row className="d-flex justify-content-between" style={{textAlign:'right'}}>
                        <Col md={2}>
                        <img src={image?.url} alt={image?.alt} width={'200px'} style={{marginLeft:'10px',borderRadius:'10px'}}/>
                        </Col>
                        <Col md={7} className="mx-4" style={{color: 'rgba(0,0,0,0.6)'}}>
                        <span dangerouslySetInnerHTML={{ __html: dek }} />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}
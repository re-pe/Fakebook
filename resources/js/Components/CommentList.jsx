import React from 'react';
import { Accordion, Button, Card, Col, Row } from 'react-bootstrap';
import {
    faAngleDown, faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CommentList({ commentsCount }) {
    return (
        <Accordion>
            <Card>
                <Card.Header>
                    <Row>
                        <Col className="text-start">
                            <Button variant="outline-primary">
                                <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
                                {' Likes: '}
                            </Button>
                        </Col>
                        <Col className="text-end">
                            <Accordion.Toggle
                                as={Button}
                                variant={`${commentsCount > 0 ? '' : 'outline-'}primary`}
                                eventKey="0"
                            >
                                {`Comments: ${commentsCount} `}
                                <FontAwesomeIcon icon={faAngleDown} className="mr-1" />
                            </Accordion.Toggle>
                        </Col>
                    </Row>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>CommentList</Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

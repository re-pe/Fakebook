import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const { _ } = window;

export default function Comment({ comment, children }) {
    if (_.isEmpty(comment)) {
        return (<></>);
    }
    const { id, title, content, user } = comment;
    const { username, avatar } = user;
    const createdAt = comment.created_at;

    return (
        <Card className="mt-4">
            <Card.Header className="bg-success text-white">
                <Row className="mx-5">
                    <Col className="text-start"><Card.Text>{createdAt}</Card.Text></Col>
                    <Col className="text-center">
                        <Card.Text>
                            Comment #
                            {id}
                        </Card.Text>
                    </Col>
                    <Col className="text-end">
                        {children}
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Row className="mx-5">
                    <Col md="3">
                        <Card.Img variant="top" src={avatar} className="rounded" style={{ width: 96 }} />
                        <Card.Text as="p" className="mt-3">{username}</Card.Text>
                    </Col>
                    <Col md="9" className="text-end">
                        <Card.Title as="h5" className="mt-3">{title}</Card.Title>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Body>
                <Row className="mx-5">
                    <Card.Text className="text-justify text-break">{content}</Card.Text>
                </Row>
            </Card.Body>
        </Card>
    );
}

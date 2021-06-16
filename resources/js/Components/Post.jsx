import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import CommentCard from './CommentCard';
import Editor from './Editor';

export default function Post({ post }) {
    const { id, title, content } = post;
    const { username, avatar } = post.user;
    const createdAt = post.created_at;

    return (
        <>
            <Card className="mt-4">
                <Card.Header className="bg-primary text-white">
                    <Row className="mx-5">
                        <Col className="text-start"><Card.Text>{createdAt}</Card.Text></Col>
                        <Col className="text-center">
                            <Card.Text>
                                Post #
                                {id}
                            </Card.Text>
                        </Col>
                        <Col className="text-end">
                            <Editor buttonIndex={[1, 2]} />
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Row className="mx-5">
                        <Col md="3">
                            <Card.Img variant="top" src={avatar} className="rounded" style={{ width: 180 }} />
                            <Card.Text as="h5" className="mt-3">{username}</Card.Text>
                        </Col>
                        <Col md="9" className="text-end">
                            <Card.Title as="h2" className="mt-5">{title}</Card.Title>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Body>
                    <Row className="mx-5">
                        <Card.Text className="text-justify text-break">{content}</Card.Text>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <Row className="mx-4">
                        <CommentCard {...{ post }} />
                    </Row>
                </Card.Footer>
            </Card>
        </>
    );
}

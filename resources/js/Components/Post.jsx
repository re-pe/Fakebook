import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import CommentList from './CommentList';

export default function Post({ post }) {
    const { id, username, avatar, title, content } = post;
    const createdAt = post.created_at;
    const commentsCount = post.comments_count;
    return (
        <Card className="m-5">
            <Card.Header>
                <Row className="mx-5">
                    <Col className="text-start">
                        <Card.Text>
                            Post #
                            {id}
                        </Card.Text>
                    </Col>
                    <Col className="text-end"><Card.Text>{createdAt}</Card.Text></Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Row className="mx-5">
                    <Col md="3">
                        <Card.Img variant="top" src={avatar} className="rounded" style={{ width: 180 }} />
                        <Card.Text as="h5" className="mt-3">{username}</Card.Text>
                    </Col>
                    <Col md="9" className="text-center">
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
                    <CommentList commentsCount={commentsCount} />
                </Row>
            </Card.Footer>
        </Card>
    );
}

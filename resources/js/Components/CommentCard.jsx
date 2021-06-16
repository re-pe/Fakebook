import React, { useState } from 'react';
import { Accordion, Button, Card, Col, Row, useAccordionToggle } from 'react-bootstrap';
import {
    faAngleDown, faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUserContext } from '../Contexts/UserContext';
import CommentList from './CommentList';

export default function CommentCard({ post }) {
    const postId = post.id;
    const commentsCount = post.comments_count;
    const { userContext } = useUserContext({});
    const { user } = userContext;
    const [like, setLike] = useState(
        user
            ? (post.likes.filter((item) => item.user_id === user.id)[0] || {})
            : {},
    );
    const [likesCount, setLikesCount] = useState(post.likes.length);

    const [expanded, setExpanded] = useState(false);

    function ToggleButton({ children, eventKey, variant }) {
        const handleClick = useAccordionToggle(eventKey, () => {
            setExpanded(!expanded);
        });

        return (
            <Accordion.Toggle
                as={Button}
                variant={variant}
                eventKey={eventKey}
                onClick={handleClick}
            >
                {children}
            </Accordion.Toggle>
        );
    }

    // const [showComments, setShowComments] = useState(false);
    // const [commentsData, setCommentsData] = useState([]);

    // const { axios } = window;
    const { _, axios } = window;

    const changeLikes = (newLikesCount) => {
        if (newLikesCount === likesCount) {
            return;
        }

        let config = { };

        if (newLikesCount > likesCount) {
            config = {
                method: 'POST',
                url: '/api/likes',
                headers: {
                    Accept: 'application/json',
                },
                data: { post_id: postId, user_id: user.id },
            };
            // setLike({ id: 1, post_id: postId, user_id: user.Id });
        } else {
            config = {
                method: 'DELETE',
                url: `/api/likes/${like.id}`,
                headers: {
                    Accept: 'application/json',
                },
                data: like,
            };
            // setLike({});
        }
        axios(config)
            .then((response) => {
                // eslint-disable-next-line no-console
                // console.log(response.data);
                setLike(response.data.like);
                setLikesCount(response.data.likes.length);
                // setLastPage(response.data.last_page);
                // setLoading(false);
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error);
            });
        // setLikesCount(newLikesCount);
    };

    const handleClick = () => {
        const newLikesCount = _.isEmpty(like) ? (likesCount + 1) : (likesCount - 1);
        changeLikes(newLikesCount);
    };

    return (
        <Accordion>
            <Card>
                <Card.Header>
                    <Row>
                        <Col className="text-start">
                            <Button
                                variant={_.isEmpty(like) ? 'outline-primary' : 'success'}
                                onClick={handleClick}
                                disabled={!user}
                            >
                                <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
                                {' Likes: '}
                                {likesCount}
                            </Button>
                        </Col>
                        <Col className="text-end">
                            <ToggleButton
                                as={Button}
                                variant={commentsCount > 0 ? 'success' : 'outline-primary'}
                                eventKey="0"
                            >
                                {`Comments: ${commentsCount} `}
                                <FontAwesomeIcon icon={faAngleDown} className="mr-1" />
                            </ToggleButton>
                        </Col>
                    </Row>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body><CommentList {...{ postId }} /></Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

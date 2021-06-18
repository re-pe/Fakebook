import React, { useState } from 'react';
import { Accordion, Button, Card, Col, Row, useAccordionToggle } from 'react-bootstrap';
import {
    faAngleDown, faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUserContext } from '../Contexts/UserContext';
import CommentList from './CommentList';

const { _, axios } = window;

export default function CommentCard({ post }) {
    const { id } = post;
    const [commentCount, setCommentCount] = useState(post.comments_count);
    const [userCommentsCount, setUserCommentsCount] = useState(0);

    const [likesCount, setLikesCount] = useState(post.likes.length);
    const { userContext } = useUserContext({});
    const { user } = userContext;
    const [like, setLike] = useState(
        user
            ? (post.likes.filter((item) => item.user_id === user.id)[0] || {})
            : {},
    );

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
                data: { post_id: id, user_id: user.id },
            };
            // setLike({ id: 1, post_id: id, user_id: user.Id });
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

    const toggleLike = () => {
        const newLikesCount = _.isEmpty(like) ? (likesCount + 1) : (likesCount - 1);
        changeLikes(newLikesCount);
    };

    const getLikeVariant = () => {
        if (!_.isEmpty(like)) {
            return 'success';
        }
        if (likesCount > 0) {
            return 'primary';
        }
        return 'outline-primary';
    };

    const getCommentVariant = () => {
        if (userCommentsCount > 0) {
            return 'success';
        }
        if (commentCount > 0) {
            return 'primary';
        }
        return 'outline-primary';
    };

    return (
        <Accordion>
            <Card>
                <Card.Header>
                    <Row>
                        <Col className="text-start">
                            <Button
                                variant={getLikeVariant()}
                                onClick={toggleLike}
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
                                variant={getCommentVariant()}
                                eventKey="0"
                            >
                                {`Comments: ${commentCount} `}
                                <FontAwesomeIcon icon={faAngleDown} className="mr-1" />
                            </ToggleButton>
                        </Col>
                    </Row>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <CommentList
                            postId={id}
                            setCommentCount={setCommentCount}
                            setUserCommentsCount={setUserCommentsCount}
                        />
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Comment from './Comment';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import { useUserContext } from '../Contexts/UserContext';

const { _, axios } = window;

export default function CommentList({ postId, setCommentCount, setUserCommentsCount }) {
    const { userContext } = useUserContext({});
    const { user } = userContext;
    const [commentList, setCommentListValue] = useState([]);

    const setCommentList = (value) => {
        setCommentListValue(value);
        setCommentCount(value.length);
        setUserCommentsCount(value.reduce((acc, val) => (acc + (val.user.id === user.id ? 1 : 0)), 0));
    };

    const [itemToUpdate, setItemToUpdate] = useState({});
    const [itemToDelete, setItemToDelete] = useState({});

    useEffect(() => {
        if (_.isEmpty(itemToUpdate)) {
            return;
        }

        const config = {
            headers: {
                Accept: 'application/json',
            },
            data: itemToUpdate,
        };

        if (itemToUpdate.id) {
            config.method = 'PUT';
            config.url = `/api/comments/${itemToUpdate.id}`;
        } else {
            config.method = 'POST';
            config.url = '/api/comments';
        }

        axios(config)
            .then((response) => {
                // eslint-disable-next-line no-console
                // console.log(response.data);
                setCommentList(response.data);
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error);
            });

        setItemToUpdate({});
    }, [itemToUpdate]);

    useEffect(() => {
        const config = {
            method: 'GET',
            url: `/api/posts/${postId}/comments`,
            headers: {
                Accept: 'application/json',
            },
        };
        axios(config)
            .then((response) => {
                // eslint-disable-next-line no-console
                // console.log(response.data);
                setCommentList(response.data);
                // setLastPage(response.data.last_page);
                // setLoading(false);
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error);
            });
    }, []);

    useEffect(
        () => {
            if (_.isEmpty(itemToDelete)) {
                return;
            }

            /*
            const urls = {
                post: `/api/posts/${item.id}`,
                comment: `/api/comments/${item.id}`,
            };
            */

            const url = `/api/comments/${itemToDelete.id}`;

            const config = {
                method: 'DELETE',
                url,
                headers: {
                    Accept: 'application/json',
                },
                data: itemToDelete,
            };

            axios(config)
                .then((response) => {
                // eslint-disable-next-line no-console
                    console.log(response.data);
                    setCommentList(response.data);
                })
                .catch((error) => {
                // eslint-disable-next-line no-console
                    console.log(error);
                });
            setItemToDelete({});
        },
        [itemToDelete],
    );

    return (
        <>
            <Row className="mt-4">
                <Col className="text-center">
                    <EditModal
                        item={{ post_id: postId, user_id: user.id }}
                        variant="success"
                        objectType="comment"
                        buttonIndex={[0]}
                        setItemToUpdate={setItemToUpdate}
                    />
                </Col>
            </Row>
            {commentList
                ? commentList.map(
                    (comment) => (
                        comment
                            ? (
                                <Comment key={comment.id} comment={comment}>
                                    <EditModal
                                        item={comment}
                                        variant="success"
                                        objectType="comment"
                                        buttonIndex={[1]}
                                        setItemToUpdate={setItemToUpdate}
                                    />
                                    <DeleteModal
                                        item={comment}
                                        variant="success"
                                        objectType="comment"
                                        setItemToDelete={setItemToDelete}
                                    />
                                </Comment>
                            ) : ''
                    ),
                ) : ''}
        </>
    );
}

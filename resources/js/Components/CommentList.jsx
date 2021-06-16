import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Comment from './Comment';
import Editor from './Editor';

const { axios } = window;

export default function CommentList({ postId }) {
    const [commentsData, setCommentsData] = useState([]);

    // const goBack = (event) => {
    //     event.preventDefault();
    //     window.history.back();
    // };

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
                setCommentsData(response.data);
                // setLastPage(response.data.last_page);
                // setLoading(false);
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error);
            });
    }, []);

    return (
        <>
            <Row className="mt-4">
                <Col className="text-center"><Editor variant="success" buttonIndex={[0]} title="Comment Editor" /></Col>
            </Row>
            {commentsData.map(
                (comment) => <Comment key={comment.id} comment={comment} />, // <Comment key={comment.id} comment={comment} />,
            )}
        </>
    );
}

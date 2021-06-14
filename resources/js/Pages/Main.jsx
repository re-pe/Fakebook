import React from 'react';
import { Container } from 'react-bootstrap';
import PostList from '../Components/PostList';

export default function Apie() {
    // const goBack = (event) => {
    //     event.preventDefault();
    //     window.history.back();
    // };

    return (
        <Container>
            <PostList />
        </Container>
    );
}

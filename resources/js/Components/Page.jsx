import React from 'react';
import classNames from 'classnames';
import { Container } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';

export default function Page({ content, title }) {
    return (
        <Container
            fluid
            className={classNames('content', 'd-flex', 'flex-column', 'min-vh-100', 'pt-0')}
        >
            <Header title={title} />
            {content()}
            <Footer />
        </Container>
    );
}

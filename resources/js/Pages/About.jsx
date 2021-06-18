import React from 'react';
import { Container, Nav } from 'react-bootstrap';

export default function Apie() {
    const goBack = (event) => {
        event.preventDefault();
        window.history.back();
    };

    return (
        <Container>
            <h3>Apie</h3>
            <Nav className="mr-auto">
                <Nav.Item>
                    {/* eslint-disable-next-line no-script-url */}
                    <Nav.Link href="#" onClick={goBack}>Go back</Nav.Link>
                </Nav.Item>
            </Nav>
        </Container>
    );
}

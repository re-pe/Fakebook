import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

export default function Footer() {
    return (
        <Container
            fluid
            id="footer"
            className="px-0 mt-auto"
        >
            <Navbar
                id="navbar"
                bg="primary"
                variant="dark"
                sticky="bottom"
                className="navbar text-light shadow-sm p-3 m-0 mt-5"
                expand
            >
                <Nav className="text-center mx-auto" navbar>
                    <span>
                        &copy; 2021 Rėdas Peškaitis
                    </span>
                </Nav>
            </Navbar>
        </Container>
    );
}

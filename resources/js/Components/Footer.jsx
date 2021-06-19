import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import '../../css/Footer.css';

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
                // eslint-disable-next-line no-alert
                onSelect={() => alert('redas(dot)peskaitis(at)gmail(dot).lt')}
                expand
            >
                <Nav className="text-center mx-auto" navbar>
                    <Nav.Item>
                        <Nav.Link className="text-white" eventKey="x">&copy; 2021 Rėdas Peškaitis</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
        </Container>
    );
}

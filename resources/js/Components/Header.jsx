import {
    faSignInAlt, faSignOutAlt, faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useUserContext } from '../Contexts/UserContext';

export default function Header(props) {
    const { title } = props;
    const { userContext } = useUserContext({});
    const { APP_NAME } = process.env;

    return (
        <Container
            className="sticky-top px-0"
            fluid
        >
            <Navbar
                bg="light"
                variant="light"
                className="navbar p-3 shadow-sm"
                expand
            >
                <Nav className={classNames('col-2')} navbar><h1>{APP_NAME}</h1></Nav>
                <Nav className="text-center mx-auto" navbar><h3>{title}</h3></Nav>
                {userContext.user
                    ? (
                        <Nav className="col-2 justify-content-end" navbar>
                            <LinkContainer to="">
                                <Nav.Link>{userContext.user.username}</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/logout">
                                <Nav.Link>
                                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    )
                    : (
                        <Nav className="col-2 justify-content-end" navbar>
                            <LinkContainer to="/login">
                                <Nav.Link>
                                    <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/register">
                                <Nav.Link>
                                    <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    )}
            </Navbar>
        </Container>
    );
}

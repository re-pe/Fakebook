import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import {
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useUserContext } from '../Contexts/UserContext';

export default function Editor({ variant = 'primary', title = 'Post' } = {}) {
    const { userContext } = useUserContext({});
    const { user } = userContext;

    const [toDelete, setToDelete] = useState(false);
    const cancelToDelete = () => setToDelete(false);
    const startToDelete = () => setToDelete(true);

    return (
        <>
            <Button
                variant={variant || 'primary'}
                className={classNames('p-0', 'text-danger')}
                onClick={startToDelete}
                disabled={!user}
            >
                <FontAwesomeIcon icon={faTimes} className="mx-1" style={{ width: '1rem' }} />
            </Button>

            <Modal
                show={toDelete}
                onHide={cancelToDelete}
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {title}
                        { ' Delete' }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you realy want to delete this post?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelToDelete}>
                        Cancel
                    </Button>
                    <Button variant="primary">Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

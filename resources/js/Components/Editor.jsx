import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import {
    faPenNib, faPlus, faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useUserContext } from '../Contexts/UserContext';

export default function Editor({ variant = 'primary', buttonIndex = [0, 1, 2], title = 'Post Editor' } = {}) {
    const { userContext } = useUserContext({});
    const { user } = userContext;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const buttonData = [
        { key: 'new', icon: faPlus, onClick: handleShow, text: 'text-white' },
        { key: 'edit', icon: faPenNib, onClick: handleShow, text: 'text-warning' },
        { key: 'delete', icon: faTimes, onClick: handleShow, text: 'text-danger' },
    ];

    return (
        <>
            {buttonIndex.map((index) => (
                <Button
                    key={buttonData[index].key}
                    variant={variant || 'primary'}
                    className={classNames('p-0', buttonData[index].text)}
                    onClick={buttonData[index].onClick}
                    disabled={!user}
                >
                    <FontAwesomeIcon icon={buttonData[index].icon} className="mx-1" style={{ width: '1rem' }} />
                </Button>
            ))}

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    I will not close if you click outside me. Don&apos;t even try to press
                    escape key.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

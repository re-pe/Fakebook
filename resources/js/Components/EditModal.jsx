import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import {
    faPenNib, faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useUserContext } from '../Contexts/UserContext';

export default function Editor({ variant = 'primary', title = 'Post', buttonIndex = [0, 1] } = {}) {
    const { userContext } = useUserContext({});
    const { user } = userContext;

    const [toEdit, setToEdit] = useState(false);
    const cancelToEdit = () => setToEdit(false);
    const startToEdit = () => setToEdit(true);

    const buttonData = [
        { key: 'new', icon: faPlus, onClick: startToEdit, text: 'text-white' },
        { key: 'edit', icon: faPenNib, onClick: startToEdit, text: 'text-warning' },
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
                show={toEdit}
                onHide={cancelToEdit}
                backdrop="static"
                keyboard={false}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {title}
                        { ' Editor' }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelToEdit}>
                        Cancel
                    </Button>
                    <Button variant="primary">Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import {
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useUserContext } from '../Contexts/UserContext';

const { _ } = window;

export default function DeleteModal({ item = {}, variant = 'primary', objectType = 'post', setItemToDelete } = {}) {
    const { userContext } = useUserContext({});
    const { user } = userContext;

    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);
    const openModal = () => setShowModal(true);
    const deleteItem = () => {
        closeModal();
        setItemToDelete(item);
    };

    return (
        <>
            <Button
                variant={variant || 'primary'}
                className={classNames('p-0', 'text-danger')}
                onClick={openModal}
                disabled={!user || user.id !== item.user_id}
            >
                <FontAwesomeIcon icon={faTimes} className="mx-1" style={{ width: '1rem' }} />
            </Button>

            <Modal
                show={showModal}
                onHide={closeModal}
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {'Delete '}
                        {_.upperFirst(objectType)}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you realy want to delete the
                    {' '}
                    {objectType}
                    {_.isEmpty(item) ? '' : ` #${item.id}`}
                    ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={deleteItem}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

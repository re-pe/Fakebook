import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import {
    faPenNib, faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useUserContext } from '../Contexts/UserContext';

const { _ } = window;
const minTextLength = 1;
const maxTitleLength = 100;

export default function EditModal(
    { item = {}, variant = 'primary', objectType = 'post', buttonIndex = [0, 1], setItemToUpdate } = {},
) {
    const { userContext } = useUserContext({});
    const { user } = userContext;

    const [itemData, setItemData] = useState({});

    const [validated, setValidated] = useState(false);
    const [errorData] = useState({});
    // const [errorData, setErrorData] = useState({});

    const [modalTitle, setTitle] = useState('');
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        setItemData({});
        setShowModal(false);
    };
    const openModal = (event) => {
        const attrTitle = event.currentTarget.getAttribute('modaltitle');
        setTitle(attrTitle);
        setItemData(item.id ? item : { ...item, title: '', content: '' });
        setShowModal(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }
        setItemToUpdate(itemData);
        closeModal();
    };

    const handleChange = (event) => {
        setItemData({
            ...itemData,
            [event.target.name]: event.target.value,
        });
        // console.log ('itemData', itemData);
    };

    const buttonData = [
        { key: 'new', icon: faPlus, modalTitle: 'Create', textClass: 'text-white', checkOwner: false },
        { key: 'edit', icon: faPenNib, modalTitle: 'Edit', textClass: 'text-warning', checkOwner: true },
    ];

    return (
        <>
            {buttonIndex.map((index) => (
                <Button
                    key={buttonData[index].key}
                    modaltitle={buttonData[index].modalTitle}
                    variant={variant || 'primary'}
                    className={classNames('p-0', buttonData[index].textClass)}
                    onClick={openModal}
                    disabled={!user || (user.id !== item.user_id && buttonData[index].checkOwner)}
                >
                    <FontAwesomeIcon icon={buttonData[index].icon} className="mx-1" style={{ width: '1rem' }} />
                </Button>
            ))}

            <Modal
                show={showModal}
                onHide={closeModal}
                backdrop="static"
                keyboard={false}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalTitle}
                        {' '}
                        {_.upperFirst(objectType)}
                    </Modal.Title>
                </Modal.Header>
                <Form
                    noValidate
                    validated={validated}
                    className="mx-5 mt-5"
                    onSubmit={handleSubmit}
                >
                    <Modal.Body>
                        <Form.Text type="invalid" className="text-danger">{errorData.message}</Form.Text>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                name="title"
                                type="text"
                                value={itemData.title}
                                minLength={minTextLength}
                                maxLength={100}
                                placeholder="Here will be a title"
                                onChange={handleChange}
                                required
                            />
                            <Form.Control.Feedback
                                type="invalid"
                            >
                                Title must be at least
                                {' '}
                                {minTextLength}
                                {' '}
                                character long but no longer than
                                {' '}
                                {maxTitleLength}
                                !
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="content">
                            <Form.Label className="mt-3">Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="content"
                                minLength={minTextLength}
                                value={itemData.content}
                                placeholder="Type your content here"
                                onChange={handleChange}
                                style={{ height: '300px' }}
                                required
                            />
                            <Form.Control.Feedback
                                type="invalid"
                            >
                                Content must be at least
                                {' '}
                                {minTextLength}
                                {' '}
                                character long!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useUserContext } from '../Contexts/UserContext';

const { axios } = window;

const Logout = () => {
    const { setUserContext } = useUserContext({});
    const history = useHistory();

    const clearData = async () => {
        const config = {
            method: 'post',
            url: '/logout',
            headers: {
                Accept: 'application/json',
            },
        };

        await axios(config)
            .then((response) => {
                setUserContext({});
                // eslint-disable-next-line no-console
                console.log(response.data);
            })
            .catch((error) => {
                setUserContext({});
                // eslint-disable-next-line no-console
                console.log(error);
            });
    };

    const handleClick = async (event) => {
        event.preventDefault();
        try {
            await clearData();
            history.push('/');
        } catch (e) {
            // eslint-disable-next-line no-alert
            alert(e.message);
        }
    };

    return (
        <Form
            style={{ width: '370px' }}
            className="mx-auto mt-5"
        >
            <Form.Group id="xx" className="text-center">
                <Button
                    onClick={() => history.goBack()}
                    className="m-1"
                    variant="warning"
                    // type="button"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleClick}
                    className="m-1"
                    variant="success"
                    // type="button"
                >
                    OK
                </Button>
            </Form.Group>
        </Form>
    );
};

export default Logout;

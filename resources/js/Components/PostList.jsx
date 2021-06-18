import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Post from './Post';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import { useUserContext } from '../Contexts/UserContext';

const { _, axios } = window;

export default function PostList() {
    const { userContext } = useUserContext({});
    const { user } = userContext;

    const [postList, setPostList] = useState([]);

    const [itemToUpdate, setItemToUpdate] = useState({});
    const [itemToDelete, setItemToDelete] = useState({});

    const [searchString, setSearchString] = useState('');
    const [searchContent, setSearchContent] = useState(false);
    const [regexp, setRegexp] = useState(null);

    useEffect(() => {
        if (_.isEmpty(itemToUpdate)) {
            return;
        }

        const config = {
            headers: {
                Accept: 'application/json',
            },
            data: itemToUpdate,
        };

        if (itemToUpdate.id) {
            config.method = 'PUT';
            config.url = `/api/posts/${itemToUpdate.id}`;
        } else {
            config.method = 'POST';
            config.url = '/api/posts';
        }

        axios(config)
            .then((response) => {
                // eslint-disable-next-line no-console
                // console.log(response.data);
                setPostList(response.data);
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error);
            });

        setItemToUpdate({});
    }, [itemToUpdate]);

    useEffect(() => {
        const config = {
            method: 'GET',
            url: '/api/posts',
            headers: {
                Accept: 'application/json',
            },
        };
        axios(config)
            .then((response) => {
                // eslint-disable-next-line no-console
                console.log(response.data);
                setPostList(response.data);
                // setLastPage(response.data.last_page);
                // setLoading(false);
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error);
            });
    }, []);

    useEffect(
        () => {
            if (_.isEmpty(itemToDelete)) {
                return;
            }

            const url = `/api/posts/${itemToDelete.id}`;

            const config = {
                method: 'DELETE',
                url,
                headers: {
                    Accept: 'application/json',
                },
                data: itemToDelete,
            };

            axios(config)
                .then((response) => {
                // eslint-disable-next-line no-console
                    console.log(response.data);
                    setPostList(response.data);
                })
                .catch((error) => {
                // eslint-disable-next-line no-console
                    console.log(error);
                });
            setItemToDelete({});
        },
        [itemToDelete],
    );

    const changeRegex = () => {
        if (searchString.length < 1) {
            setRegexp(null);
            return;
        }
        if (searchContent) {
            setRegexp(new RegExp(searchString));
            return;
        }
        setRegexp(new RegExp(`^${searchString}`));
    };

    const changeSearchString = (event) => {
        setSearchString(event.target.value);
        changeRegex();
    };

    const changeSearchContent = (event) => {
        setSearchContent(event.target.checked);
        changeRegex();
    };

    return (
        <>
            <Row className="mt-4">
                <Form inline onSubmit={(event) => event.preventDefault()}>
                    <Form.Row className="d-flex">
                        <Col className="col-2 px-4">
                            <Form.Check
                                name="contentFragment"
                                type="checkbox"
                                label="Content fragment"
                                checked={searchContent}
                                onChange={changeSearchContent}
                            />
                        </Col>
                        <Col className="col">
                            <Form.Control
                                name="searchText"
                                type="text"
                                value={searchString}
                                placeholder="Here will be a search string"
                                onClick={changeSearchString}
                            />
                        </Col>
                    </Form.Row>
                </Form>
            </Row>
            <Row className="mt-4">
                <Col className="text-center">
                    <EditModal
                        item={{ user_id: user.id }}
                        buttonIndex={[0]}
                        setItemToUpdate={setItemToUpdate}
                    />
                </Col>
            </Row>
            {postList.filter(
                (post) => {
                    if (searchString.length < 3) {
                        return true;
                    }
                    if (searchContent) {
                        return post.content.match(regexp);
                    }
                    return post.user.username.match(regexp);
                },
            ).map(
                (post) => (
                    <Post key={post.id} post={post}>
                        <EditModal
                            item={post}
                            buttonIndex={[1]}
                            setItemToUpdate={setItemToUpdate}
                        />
                        <DeleteModal
                            item={post}
                            setItemToDelete={setItemToDelete}
                        />
                    </Post>
                ),
            )}
        </>
    );
}

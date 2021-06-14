import React, { useEffect, useState } from 'react';
import Post from './Post';

const { axios } = window;

export default function PostList() {
    const [postsData, setPostsData] = useState([]);

    // const goBack = (event) => {
    //     event.preventDefault();
    //     window.history.back();
    // };

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
                setPostsData(response.data);
                // setLastPage(response.data.last_page);
                // setLoading(false);
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error);
            });
    }, []);

    return (
        <>
            {postsData.map(
                (post) => <Post key={post.id} post={post} />,
            )}
        </>
    );
}

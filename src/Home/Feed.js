import React, { useState, useRef, useContext, useEffect } from 'react';
import './Feed.css';
import '../Profile/UserProfile.css';
import { useNavigate } from 'react-router-dom';
import { useImage } from '../Hooks/useImage';
import useFetch from '../Hooks/useFetch';
import { AuthContext } from '../models/AuthContext';

const Feed = () => {
    const [image, setImage] = useState('');
    const [text, setText] = useState('');
    const fileInputRef = useRef(null);
    const [file, setFile] = useState();
    const { sendRequest, isLoading, error, onCloseError } = useFetch();
    const auth = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const { uploadImage } = useImage();
    const navigate = useNavigate();
    const [page, setPage] = useState(1); // Current page of posts
    const [hasMorePosts, setHasMorePosts] = useState(true); // Flag indicating if there are more posts to fetch

    const fetchPostsFromAPI = async (page) => {
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL+`/posts/suggestedpost?page=${page}`,
                'GET',
                null,
                {
                    Authorization: 'Bearer ' + auth.token,
                }
            );
            console.log(responseData);
            if (responseData.length === 0) {
                setHasMorePosts(false); // No more posts to fetch
            } else {
                setPosts((prevPosts) => [...prevPosts, ...responseData]); // Append the fetched posts to the existing posts
            }
        } catch (error) {
            console.error(error); // Handle any error that occurred during the API call
        }
    };

    useEffect(() => {
        fetchPostsFromAPI(page); // Fetch initial set of posts
    }, [page]);

    const handleImageUpload = (event) => {
        if (event.target.files) {
            const file = event.target.files[0];
            const reader = new FileReader();
            setFile(file);
            reader.onload = (e) => {
                setImage(e.target.result);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleTextChange = (event) => {
        setText(event.target.value || '');
    };

    const handleLikePost = async (post) => {
        try {
            // Update the like counter and toggle the user's like
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL+'/posts/updatePostLike',
                'PATCH',
                JSON.stringify({
                    id: post._id,
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                }
            );
            const updatedPost = responseData; // Assuming the API returns the updated post object
            // Update the posts array with the modified post
            setPosts((prevPosts) =>
                prevPosts.map((prevPost) =>
                    prevPost._id === updatedPost._id ? updatedPost : prevPost
                )
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    const handlePost = async () => {
        try {
            // Handle the post functionality here
            const img = await uploadImage(file);
            console.log('inside');
            const newText = text || '';
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL+'/posts/createPost',
                'POST',
                JSON.stringify({
                    title: newText,
                    image: img.img,
                    imageID: img.id,
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                }
            );
            // Reset the form
            setImage('');
            setText('');
            navigate('/profile/' + auth.userID);
        } catch (error) {
            console.error(error);
        }
    };

    const handleImageChange = () => {
        // Trigger the hidden file input element
        fileInputRef.current.click();
    };

    const handleScroll = () => {
        console.log(124);
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 50 && hasMorePosts) {
            // User has scrolled to the bottom with a small buffer and there are more posts to fetch
            setPage((prevPage) => prevPage + 1); // Increment the page number to fetch the next set of posts
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1); // Increment the page number to fetch the next set of posts
    };

    return (
        <div className="post-card-custom">
            <div className="post-content-custom">
                <div className="post-image-custom">
                    {image && <img src={image} alt="Post" />}
                    <div className="upload-label-custom" onClick={handleImageChange}>
                        Change Image
                    </div>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                    />
                </div>
                <div className="bottom-post">
                    <textarea
                        className="post-text-custom"
                        placeholder="Write something..."
                        value={text}
                        onChange={handleTextChange}
                    />
                    <button className="post-button-custom" onClick={handlePost}>
                        Post
                    </button>
                </div>
            </div>

            <div className="posts-wrapper">
                <div className="posts-container">
                    {posts.map((post) => (
                        <div className={`post-card ${post.image ? '' : 'no-image'}`} key={post._id}>
                            {post.image && <img className="post-image" src={post.image} alt="Post" />}
                            <div className="post-details">
                                <h3>{post.title}</h3>
                                <button className="profile-clicker">
                                    <span
                                        onClick={() => {
                                            navigate('/profile/' + post.creator._id);
                                        }}
                                        className="post-creator"
                                    >
                                        {post.name}
                                    </span>
                                </button>
                            </div>
                            <button
                                className={`like-button ${post.likes.includes(auth.userID) ? 'liked' : ''}`}
                                onClick={() => handleLikePost(post)}
                            >
                                <i className="fas fa-heart"></i> {post.likes.length}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {hasMorePosts && (
                <button className="next-button" onClick={handleNextPage}>
                    Next
                </button>
            )}
        </div>
    );
};

export default Feed;

import React, { useState, useRef, useEffect, useContext } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './UserProfile.css';
import { useParams } from 'react-router-dom';
import useFetch from '../Hooks/useFetch';
import { AuthContext } from '../models/AuthContext';
import LoadingSpinner from '../models/LoadingSpinner';
import { useImage } from '../Hooks/useImage';

const UserProfile = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1510987836583-e3fb9586c7b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80');
    const [profileImage, setProfileImage] = useState('/path/to/default/profileImage.jpg');
    const [user, setUser] = useState(null);
    const [originalUser, setOriginalUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [editedPost, setEditedPost] = useState(null);
    const [editedPostIndex, setEditedPostIndex] = useState(-1);
    const [editedPostTitle, setEditedPostTitle] = useState('');
    const fileInputRef = useRef(null);
    const { sendRequest, isLoading, error, onCloseError } = useFetch();
    const auth = useContext(AuthContext);
    const { uID } = useParams() || {};
    const { uploadImage } = useImage();
    const [file, setFile] = useState('');

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchPost = async () => {
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL + `/posts/getPost/${uID}`,
                'GET',
                null,
                {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`
                }
            );
            setPosts(responseData);
        } catch (error) {
            console.log(error.message);
        }
    };

    const fetchUser = async () => {
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL+`/users/getProfile/${uID}`,
                'GET',
                null,
                {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`
                }
            );
            setUser(responseData);
            setOriginalUser(responseData);
            fetchPost();
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleCoverImageClick = () => {
        if (isEditMode) {
            // Logic to change the cover image
            // Example: Open a file picker and update the state with the selected image
        }
    };

    const handleProfileImageClick = () => {
        if (isEditMode) {
            fileInputRef.current.click(); // Trigger the hidden file input element
        }
    };

    const handleProfileImageChange = (event) => {
        const imageFile = event.target.files[0];
        const imageURL = URL.createObjectURL(imageFile);
        setUser(prevUser => ({ ...prevUser, profilePic: imageURL }));
        setProfileImage(imageURL);
        setFile(imageFile);
    };

    const handleEditSave = async () => {
        if (isEditMode) {
            const image = await uploadImage(file);
            if (!image) {
                console.log(5);
            }
            const newImage = image || profileImage;
            if (hasChanges()) {
                const updatedUser = {
                    ...user,
                    name: user.name,
                    profilePic: image.img || user.profilePic,
                    bio: user.bio,
                    facebook: user.facebook,
                    instagram: user.instagram,
                    linkedin: user.linkedin,
                    discord: user.discord,
                    picID: image.id,
                };
                setUser(updatedUser);
                await updateUser(updatedUser);
            }
        }
        setIsEditMode(prevEditMode => !prevEditMode);
    };

    const handleCancelEdit = () => {
        setUser(originalUser);
        setIsEditMode(false);
    };

    const handleLikePost = async (post) => {
        try {
            // Update the like counter and toggle the user's like
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL+'/posts/updatePostLike',
                'PATCH',
                JSON.stringify({
                    id: post._id
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
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

    const handleEditPost = (post, index) => {
        setEditedPost(post);
        setEditedPostIndex(index);
        setEditedPostTitle(post.title);
    };
    const handleDeletePost = async (post) => {
        try {
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL+`/posts/deletePost`,
                'DELETE',
                JSON.stringify({
                    id: post._id
                }),
                {
                    'Content-Type': 'application/json',

                    Authorization: `Bearer ${auth.token}`,
                }
            );
            setPosts((prevPosts) => prevPosts.filter((prevPost) => prevPost._id !== post._id));
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleEditedPostTitleChange = (event) => {
        setEditedPostTitle(event.target.value);
    };

    const hasChanges = () => {
        return (
            user?.name !== originalUser?.name ||
            user?.profilePic !== originalUser?.profilePic ||
            user?.bio !== originalUser?.bio ||
            user?.facebook !== originalUser?.facebook ||
            user?.instagram !== originalUser?.instagram ||
            user?.linkedin !== originalUser?.linkedin ||
            user?.discord !== originalUser?.discord
        );
    };

    const updateUser = async (updatedUser) => {
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL+'/users/update',
                'PATCH',
                JSON.stringify(updatedUser),
                {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`
                }
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    const saveEditedPost = async (post) => {
        try {
            const updatedPost = { ...editedPost, title: editedPostTitle };
            // Call the API to update the post with the new title
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL+`/posts/update`,
                'PATCH',
                JSON.stringify({
                    id: post._id,
                    title: editedPostTitle
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`
                }
            );
            setPosts((prevPosts) =>
                prevPosts.map((prevPost) =>
                    prevPost._id === responseData._id ? responseData : prevPost
                )
            );
            setEditedPost(null);
            setEditedPostIndex(-1);
            setEditedPostTitle('');
        } catch (error) {
            console.log(error.message);
        }
    };

    const cancelEditedPost = () => {
        setEditedPost(null);
        setEditedPostIndex(-1);
        setEditedPostTitle('');
    };
    const handleCopyID = () => {
        if (user?._id) {
            navigator.clipboard.writeText("@" + user._id)
                .then(() => {
                    console.log("ID copied to clipboard");
                })
                .catch((error) => {
                    console.log("Failed to copy ID to clipboard:", error);
                });
        }
    };

    return (
        <div className="user-profile">
            <div className="card">
                <div className="card-header">
                    <div className="cover-image img-fluid" onClick={handleCoverImageClick}>
                        <a href="https://www.linkedin.com/in/sahil-karn-382793269/" target="_blank">
                            <img src={coverImage} alt="Cover" />
                        </a>
                        {isEditMode && (
                            <div className="edit-cover">
                                <i className="fas fa-edit"></i>
                            </div>
                        )}
                        <div className="profile-image-wrapper" onClick={handleProfileImageClick}>
                            <img className="profile-image" src={user?.profilePic || profileImage} alt="Profile" />
                            {isEditMode && (
                                <div className="edit-profile">
                                    <i className="fas fa-camera"></i>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="info">
                        <div className="info-holder">
                            {isEditMode ? (
                                <input
                                    type="text"
                                    value={user?.name}
                                    onChange={(e) => setUser(prevUser => ({ ...prevUser, name: e.target.value }))}
                                    className="edit-input"
                                />
                            ) : (
                                <h3>{user?.name}</h3>
                            )}
                            <h4>Date of Birth: {user?.DOB}</h4>
                            <button className="copy-id-button" onClick={handleCopyID}>
                                Copy ID
                            </button>
                        </div>
                        {isEditMode ? (
                            <textarea
                                value={user?.bio}
                                onChange={(e) => setUser(prevUser => ({ ...prevUser, bio: e.target.value }))}
                                className="edit-textarea"
                            />
                        ) : (
                            <p>{user?.bio}</p>
                        )}
                    </div>
                    <div className="social-section">
                        <h5>Connect with Me:</h5>
                        {isEditMode ? (
                            <ul className="social-links">
                                <li>
                                    <input
                                        type="text"
                                        value={user?.facebook}
                                        onChange={(e) => setUser(prevUser => ({ ...prevUser, facebook: e.target.value }))}
                                        className="edit-input"
                                        placeholder="Facebook"
                                    />
                                </li>
                                <li>
                                    <input
                                        type="text"
                                        value={user?.instagram}
                                        onChange={(e) => setUser(prevUser => ({ ...prevUser, instagram: e.target.value }))}
                                        className="edit-input"
                                        placeholder="Instagram"
                                    />
                                </li>
                                <li>
                                    <input
                                        type="text"
                                        value={user?.linkedin}
                                        onChange={(e) => setUser(prevUser => ({ ...prevUser, linkedin: e.target.value }))}
                                        className="edit-input"
                                        placeholder="LinkedIn"
                                    />
                                </li>
                                <li>
                                    <input
                                        type="text"
                                        value={user?.discord}
                                        onChange={(e) => setUser(prevUser => ({ ...prevUser, discord: e.target.value }))}
                                        className="edit-input"
                                        placeholder="Discord"
                                    />
                                </li>
                            </ul>
                        ) : (
                            <ul className="social-links">
                                <li>
                                    <a href={user?.facebook} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href={user?.instagram} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href={user?.linkedin} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-linkedin"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href={user?.discord} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-discord"></i>
                                    </a>
                                </li>
                            </ul>
                        )}
                    </div>
                    {auth.userID === uID && (
                        <div className="edit-button">
                            <button onClick={handleEditSave} className="btn btn-primary">
                                {isEditMode ? 'Save' : 'Edit'}
                            </button>
                            {isEditMode && (
                                <button onClick={handleCancelEdit} className="btn btn-secondary">
                                    Cancel
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="user-posts">
                {user && posts && (
                    <div className="posts-container">
                        {[...posts].reverse().map((post, index) => (
                            <div className={`post-card ${post.image ? '' : 'no-image'}`} key={post.id}>
                                {post.image && <img className="post-image" src={post.image} alt="Post" />}
                                <div className="post-details">
                                    {editedPost !== null && editedPostIndex === index ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={editedPostTitle}
                                                onChange={handleEditedPostTitleChange}
                                            />
                                            <button className='changer' onClick={() => { saveEditedPost(post) }}>Save</button>
                                            <button className='changer' onClick={cancelEditedPost}>Cancel</button>
                                        </div>
                                    ) : (
                                        <div>
                                            <h3>{post.title}</h3>
                                            {post.creator == auth.userID ?
                                                <button className='changer' onClick={() => handleEditPost(post, index)}>Edit</button>
                                                : null}
                                        </div>
                                    )}
                                    <div className="post-footer">
                                        <button
                                            className={`like-button ${post.likes.includes(auth.userID) ? 'liked' : ''}`}
                                            onClick={() => handleLikePost(post)}
                                        >
                                            <i className="fas fa-heart"></i> {post.likes.length}
                                        </button>
                                        <span className="post-creator">{post.name}</span>
                                        {post.creator === auth.userID && (
                                            <div className="post-options">
                                                <button
                                                    className="delete-post"
                                                    onClick={() => handleDeletePost(post)}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <input type="file" accept="image/*" onChange={handleProfileImageChange} ref={fileInputRef} style={{ display: 'none' }} />
        </div>
    );
};

export default UserProfile;

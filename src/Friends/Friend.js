import React, { useContext, useEffect, useState } from 'react';
import useFetch from '../Hooks/useFetch';
import { AuthContext } from '../models/AuthContext';
import {useNavigate } from 'react-router-dom';
import './Friend.css';
import MiniNavBar from './MiniNavBar';

const Friend = () => {
    const auth = useContext(AuthContext);
    const [friends, setFriends] = useState([]);
    const { sendRequest, isLoading, error, onCloseError } = useFetch();
    const [activeOption, setActiveOption] = useState('Friends');
    const navigate = useNavigate();
    const fetchFriends = async () => {
        let lookingFor;
        if (activeOption === 'Friends') {
            lookingFor = 'friends';
        } else {
            lookingFor = 'pendingRequests';
        }

        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL+'/users/setuser',
                'POST',
                JSON.stringify({
                    userID: auth.userID,
                    looking: lookingFor
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            setFriends(responseData);
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(() => {


        fetchFriends();
    }, [activeOption]);

    const handleSelectOption = (option) => {
        setActiveOption(option);
        // Perform other actions based on the selected option
    };
    const goProfile =(friend)=>{
        navigate('/profile/'+friend._id);
    }
    const acceptFriend = async (user) => {
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL+'/users/acceptFriendRequest',
                'PATCH',
                JSON.stringify({
                    id: user.id || user._id
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            const updatedFriends = friends.filter(friend => friend._id != user._id);
            setFriends(updatedFriends);
        } catch (error) {
        }
    }
    const unfriend = async (user) => {
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL+'/users/unfriend',
                'PATCH',
                JSON.stringify({
                    id: user.id || user._id
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            const updatedFriends = friends.filter(friend => friend._id != user._id);
            setFriends(updatedFriends);
        } catch (error) {
        }
    };
    return (
        <div className='whole-container' >
            <div className='mini-container'>
                <MiniNavBar activeOption={activeOption} onSelectOption={handleSelectOption} />
            </div>
            <div className="friend-container">
                <div className="friend-list">
                    {friends &&
                        friends.length > 0 &&
                        friends.map((friend) => (
                            <div className="friend-item" key={friend._id}>
                                <img src={friend.profilePic} alt={friend.name} className="friend-avatar" />
                                <div className="friend-details">
                                    <h2 className="friend-name">{friend.name}</h2>
                                    <p className="friend-bio">{friend.bio}</p>
                                </div>
                                <div className="friend-actions">
                                    <button
                                        className={`friend-action-button ${activeOption === 'Friends' ? 'unfriend-button' : 'accept-button'}`}
                                        onClick={() => {
                                            if (activeOption === 'Friends') {
                                                unfriend(friend);
                                            } else {
                                                acceptFriend(friend);
                                            }
                                        }
                                        }
                                    >
                                        {activeOption === 'Friends' ? 'Unfriend' : 'Accept Friend'}
                                    </button>
                                    <button className="view-profile-button" onClick={
                                        ()=>{goProfile(friend)}}>View Profile</button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Friend;

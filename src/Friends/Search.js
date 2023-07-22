import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import useFetch from "../Hooks/useFetch";
import LoadingSpinner from "../models/LoadingSpinner";
import "./Search.css";
import { AuthContext } from '../models/AuthContext';
import { useNavigate } from 'react-router-dom';
const UserCard = () => {
    let { name } = useParams();
    const { sendRequest, isLoading, error, onCloseError } = useFetch();
    const [users, setUsers] = useState([]);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
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
            setUsers(prevUsers => prevUsers.map(prevUser => prevUser._id == user._id ? { ...prevUser, isFriend: true } : prevUser));
        } catch (error) {
            console.log(error.message);
        }
    };
    const sendFriendRequest = async (user) => {
        if (user.isFriend) {
            return;
        }

        if (user.isAdding) {
            acceptFriend(user);
            return;
        }

        console.log("here");
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL+"/users/sendFriendRequest",
                'PATCH',
                JSON.stringify({
                    id: user._id
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            console.log("Friend request sent");
            setUsers(prevUsers =>
                prevUsers.map(prevUser =>
                    prevUser._id === user._id
                        ? { ...prevUser, isPending: !prevUser.isPending } // Toggle the value of isPending
                        : prevUser
                )
            );
        } catch (error) {
            console.log(error.message);
        }
    };


    const fetchUsers = async () => {
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL+"/users/getuser/" + name,
                'GET',
                null,
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            console.log(responseData);
            setUsers(responseData);
        } catch (error) {
            console.log(error.message);
        }
    };
    const viewProfile =(user)=>{
        console.log(user);
        navigate('/profile/'+user._id);
    }
    useEffect(() => {
        fetchUsers();
    }, [name, sendRequest, auth.token]);

    return (
        <div className="user-card-container">
            {users && users.length > 0 && (
                <div className="user-cards">
                    {users.map((user) => (
                        <div className={`user-card ${user.isPending ? 'pending' : ''}`} key={user._id}>
                            <div className="image-container">
                                <img
                                    src={user.profilePic}
                                    alt={user.name}
                                    className="profile-picture"
                                />
                            </div>
                            <h2 className="name">{user.name}</h2>
                            <div className="button-container">
                                <button
                                    className={`add-friend-button ${user.isPending ? 'pending' : ''} ${user.isFriend ? 'friend' : ''}`}
                                    onClick={() => sendFriendRequest(user)}
                                >
                                    {user.isAdding ? 'Accept' : user.isPending ? 'Request Sent' : user.isFriend ? 'Friend' : 'Add Friend'}
                                </button>
                                <button className={`view-profile-button ${user.isPending ? 'pending' : ''} ${user.isFriend ? 'friend' : ''}`} 
                                onClick={()=>{
                                    viewProfile(user);
                                }}
                                >View Profile</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserCard;

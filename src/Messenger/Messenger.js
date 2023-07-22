import React, { useContext, useEffect, useState } from 'react';
import './Messenger.css';
import useFetch from '../Hooks/useFetch';
import { AuthContext } from '../models/AuthContext';
import MiniChatBox from '../Mini-Chat/MiniChatBox';

const Messenger = () => {
    const [friends, setFriends] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { sendRequest } = useFetch();
    const auth = useContext(AuthContext);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL+'/users/friends',
                    'GET',
                    null,
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token,
                    }
                );
                setFriends(responseData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFriends();
    }, [auth.token, sendRequest]);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredFriends = friends.filter((friend) =>
        friend.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const handleCloseMiniChat = () => {
        setSelectedUser(null);
    };

    return (
        <div className="messenger-container">
            <h2 className="messenger-title">Friends</h2>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-input"
                />
            </div>
            <ul className="messenger-friends-list">
                {filteredFriends.map((friend) => (
                    <li
                        key={friend.id}
                        id="lister"
                        className={`messenger-friend-item ${friend.online ? 'messenger-online' : 'messenger-offline'}`}
                        title={friend.online ? 'Online' : 'Offline'}
                        onClick={() => handleUserClick(friend)}
                    >
                        <div className="messenger-friend-avatar">
                            <img src={friend.profilePic} alt={friend.name} />
                        </div>
                        <div className="messenger-friend-info">
                            <div className="messenger-friend-name">{friend.name}</div>
                            <div id="status" className="messenger-friend-status">{friend.online ? 'Online' : 'Offline'}</div>
                        </div>
                    </li>
                ))}
            </ul>
            {selectedUser && (
                <MiniChatBox user={selectedUser} onClose={handleCloseMiniChat} />
            )}
        </div>
    );
};

export default Messenger;

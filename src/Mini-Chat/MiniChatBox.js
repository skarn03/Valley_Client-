import React, { useState, useContext, useEffect, useRef } from 'react';
import './MiniChatBox.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../models/AuthContext';
import useFetch from '../Hooks/useFetch';
import { io } from 'socket.io-client';

const MiniChatBox = ({ user, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const chatContentRef = useRef(null);
    const { sendRequest } = useFetch();
    const [conversation, setConversation] = useState([]);
    const [socket, setSocket] = useState(null);
    const handleInputChange = (event) => {
        setInputMessage(event.target.value);
    };
    useEffect(() => {
        const socket = io(process.env.REACT_APP_BACKEND_SOCKET || "http://localhost:5000");

        // Save the socket instance in state
        setSocket(socket);

        // Event handler for receiving messages
        socket.on('receiveMessage', (message) => {
            // Update the messages state with the received message
            setMessages((prevMessages) => [...prevMessages, message]);
        });
        return () => {
            socket.disconnect();
        };
    }, [])

    useEffect(() => {
        const getConversation = async () => {
            try {
                const response = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + `/conversation/get/${user._id}`,
                    'GET',
                    null,
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token
                    }
                );
                setConversation(response);
                return response._id; // Return the conversation ID
            } catch (error) {
                console.log(error);
                // Handle error (e.g., display an error message)
            }
        };

        const getMessage = async (convoID) => {
            try {
                if (convoID) {
                    const response = await sendRequest(
                        process.env.REACT_APP_BACKEND_URL + `/message/get/${convoID}`,
                        'GET',
                        null,
                        {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + auth.token
                        }
                    );
                    const extractedMessages = response.map((message) => ({
                        key: message._id,
                        sender: message.sender,
                        text: message.text,
                        id: message._id,
                    }));
                    setMessages(extractedMessages);
                }
            } catch (error) {
                console.log(error);
                // Handle error (e.g., display an error message)
            }
        };

        getConversation().then((convoID) => {
            getMessage(convoID);
        });
    }, [user, sendRequest, auth.token]);

    useEffect(() => {
        // Emit the joinRoom event when the socket is defined
        if (socket && conversation._id) {
            socket.emit('joinRoom', conversation._id);
        }

        // Listen for the 'newMessageNotification' event from the server
        if (socket) {
            socket.on('newMessageNotification', () => {
                // Display a toast notification to the user
                console.log("has sent you a new message");
            });
        }
        // Cleanup the socket event listener
        return () => {
            if (socket) {
                socket.off('newMessageNotification');
            }
        };
    }, [socket, conversation]);

    const handleSendMessage = async () => {
        if (inputMessage.trim() !== '') {
            try {
                socket.emit('sendMessage', {
                    roomID: conversation._id,
                    message: {
                        sender: auth.userID,
                        text: inputMessage
                    },
                    recipientID: user._id,
                });
                const response = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + '/message/create',
                    'POST',
                    JSON.stringify({
                        conversationID: conversation._id,
                        sender: auth.userID,
                        text: inputMessage
                    }),
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token
                    }
                );

                // Emit the sendMessage event to the server


                // Clear the input message
                setInputMessage('');
            } catch (error) {
                console.log(error);
                // Handle error (e.g., display an error message)
            }
        }
    };

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            handleSendMessage();
        }
    };

    const handleCloseChat = () => {
        onClose();
    };

    useEffect(() => {
        chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }, [messages]);

    return (
        conversation && (
            <div className="mini-chat-box">
                <div className="mini-chat-header">
                    <img className="mini-chat-avatar" src={user.profilePic} alt={user.name} />
                    <button className="profile-clicker">
                        <span
                            onClick={() => {
                                navigate('/profile/' + user._id);
                            }}
                            className="mini-chat-name"
                        >
                            {user.name}
                        </span>
                    </button>
                    <button className="mini-chat-close" onClick={handleCloseChat}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <hr />
                <div className="headinput">
                    <div className="mini-chat-content" ref={chatContentRef}>
                        {messages.length > 0 &&
                            messages.map((message) => (
                                <div
                                    key={message.id}
                                    id={message.sender == auth.userID ? 'you' : 'other'}
                                    className="mini-chat-message"
                                >
                                    <span>{message.text}</span>
                                </div>
                            ))}
                    </div>
                    <div className="mini-chat-input">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={inputMessage}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <button className="mini-chat-send" onClick={handleSendMessage}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default MiniChatBox;

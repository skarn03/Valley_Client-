import React ,{useContext}from 'react';
import './LeftSidebar.css';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../models/AuthContext';

const LeftSidebar = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const handleProfileClick = () => {
        navigate('/profile/'+auth.userID);

        // Handle profile option click event
    };

    const handleFeedsClick = () => {
        // Handle feeds option click event
        navigate('/');
    };

  
    const handleFriendsClick = () => {
        // Handle friends option click event
        navigate('/friend');
    };


    return (
        <div className="left-sidebar">
            <div className="logo">Logo</div>
            <ul className="sidebar-options">
                <li className="option" onClick={handleFeedsClick}>
                    <i className="fas fa-newspaper"></i>
                    Home
                </li>
                <li className="option" onClick={handleProfileClick}>
                    <i className="fas fa-user"></i>
                    Profile
                </li>
              
                <li className="option" onClick={handleFriendsClick}>
                    <i className="fas fa-users"></i>
                    Friends
                </li>

            </ul>
        </div>
    );
};

export default LeftSidebar;

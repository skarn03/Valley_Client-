import React, { useContext, useState } from 'react';
import './Navbar.css'; // Import the CSS file
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AuthContext } from '../../models/AuthContext';
import useFetch from '../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';
const Navbar = (props) => {
    const [inputValue, setInputValue] = useState('');
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
    const [isSearchFocused, setSearchFocused] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null); // Set profile picture to null by default
    const auth = useContext(AuthContext);
    const { sendRequest, isLoading, error, onCloseError } = useFetch();
    const navigate = useNavigate();
    const handleHomeClick = () => {
        navigate('/');
    };

    const handleProfileClick = () => {
        setProfileMenuOpen(!isProfileMenuOpen);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleMessageClick = () => {
        console.log("here");
    }
    const handleSearchSubmit = async (e) => {
        e.preventDefault();

        // Perform search or trigger the required action with the searchQuery
        navigate('/Search/' + inputValue);
    };

    const handleSearchFocus = () => {
        setSearchFocused(true);
    };

    const handleSearchBlur = () => {
        setSearchFocused(false);
    };

    const handleProfileOptionClick = () => {
        navigate('/profile/' + auth.userID);
        // Handle profile option click event
    };

    const handleSettingsOptionClick = () => {
        navigate('/settings');

        // Handle settings option click event
    };

    const handleLogoutOptionClick = () => {
        auth.logout();
    };

    const handleProfilePictureError = () => {
        // Handle error when profile picture fails to load
        setProfilePicture(null);
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <i className="fas fa-tree"></i> {/* Font Awesome icon for "Valley" */}
                Valley
            </div>
            <form
                className={`search-bar ${isSearchFocused ? 'focused' : ''}`}
                onSubmit={handleSearchSubmit}
            >
                <input
                    type="text"
                    placeholder="Search..."
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                />
                <button type="submit">
                    <i className="fas fa-search"></i>
                </button>
            </form>
            <ul className="nav-links">
                <li className="nav-item" onClick={handleHomeClick}>
                    <i className="fas fa-home"></i>
                    Home
                </li>

                <li
                    className={`nav-item profile ${isProfileMenuOpen ? 'open' : ''}`}
                    onClick={handleProfileClick}
                >
                    {profilePicture ? (
                        <img
                            src={profilePicture}
                            alt="Profile"
                            className="profile-image"
                            onError={handleProfilePictureError}
                        />
                    ) : (
                        <i className="fas fa-user-circle"></i>
                    )}
                    <div className="nav-item-profile">
                        Users
                        {isProfileMenuOpen && (
                            <ul className="profile-menu">
                                <li onClick={handleProfileOptionClick}>
                                    <i className="fas fa-user"></i>
                                    Profile
                                </li>
                                <li onClick={handleSettingsOptionClick}>
                                    <i className="fas fa-cog"></i>
                                    Settings
                                </li>
                                <li onClick={handleLogoutOptionClick}>
                                    <i className="fas fa-sign-out-alt"></i>
                                    Logout
                                </li>
                            </ul>
                        )}
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;

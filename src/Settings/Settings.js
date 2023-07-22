import React, { useState, useEffect, useContext } from 'react';
import useFetch from '../Hooks/useFetch';
import { AuthContext } from '../models/AuthContext';
import './Settings.css';

const Settings = () => {
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('***********');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isEditing, setIsEditing] = useState({
        name: false,
        dob: false,
        email: false,
        password: false,
    });
    const { sendRequest, isLoading, error, onCloseError } = useFetch();
    const auth = useContext(AuthContext);

    useEffect(() => {
        fetchUserSettings();
    }, []);

    const fetchUserSettings = async () => {
        try {
            const data = await sendRequest(
                process.env.REACT_APP_BACKEND_URL+'/users/getUserSetting',
                'GET',
                null,
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                }
            );
            console.log(data);
            setName(data.name);
            setDob(data.DOB);
            setEmail(data.email);
        } catch (error) {
            console.error(error);
        }
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDobChange = (event) => {
        setDob(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleEdit = (field) => {
        setIsEditing({
            name: field === 'name',
            dob: field === 'dob',
            email: field === 'email',
            password: field === 'password',
        });
    };

    const handleSubmit = async () => {
        try {
            const settingsData = {
                name: isEditing.name ? name : undefined,
                dob: isEditing.dob ? dob : undefined,
                email: isEditing.email ? email : undefined,
                password: isEditing.password
                    ? { oldPassword, newPassword }
                    : undefined,
            };

            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL+'/users/updateUserSettings',
                'PATCH',
                JSON.stringify(settingsData),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                }
            );

            console.log(responseData);

            // Reset the form
            setOldPassword('');
            setNewPassword('');
            setIsEditing({
                name: false,
                dob: false,
                email: false,
                password: false,
            });
            auth.logout();
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        // Reset the form without making any changes
        setOldPassword('');
        setNewPassword('');
        setIsEditing({
            name: false,
            dob: false,
            email: false,
            password: false,
        });
    };

    return (
        <div className="settings-container">
            <h2 className="settings-title">Settings</h2>
            <div className="settings-item">
                <label className="settings-label">
                    Name:
                    {isEditing.name ? (
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            className="settings-input"
                        />
                    ) : (
                        <span className="settings-value">{name}</span>
                    )}
                    {!isEditing.name && (
                        <button className="settings-button" onClick={() => handleEdit('name')}>
                            Edit
                        </button>
                    )}
                </label>
            </div>
            <div className="settings-item">
                <label className="settings-label">
                    Date of Birth:
                    {isEditing.dob ? (
                        <input
                            type="text"
                            value={dob}
                            onChange={handleDobChange}
                            className="settings-input"
                        />
                    ) : (
                        <span className="settings-value">{dob}</span>
                    )}
                    {!isEditing.dob && (
                        <button className="settings-button" onClick={() => handleEdit('dob')}>
                            Edit
                        </button>
                    )}
                </label>
            </div>
            <div className="settings-item">
                <label className="settings-label">
                    Email:
                    {isEditing.email ? (
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="settings-input"
                        />
                    ) : (
                        <span className="settings-value">{email}</span>
                    )}
                    {!isEditing.email && (
                        <button className="settings-button" onClick={() => handleEdit('email')}>
                            Edit
                        </button>
                    )}
                </label>
            </div>
            <div className="settings-item">
                <label className="settings-label">
                    Password:
                    {isEditing.password ? (
                        <>
                            <input
                                type="password"
                                value={oldPassword}
                                onChange={handleOldPasswordChange}
                                className="settings-input"
                                placeholder="Enter old password"
                            />
                            <input
                                type="password"
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                                className="settings-input"
                                placeholder="Enter new password"
                            />
                        </>
                    ) : (
                        <span className="settings-value">{password}</span>
                    )}
                    {!isEditing.password && (
                        <button className="settings-button" onClick={() => handleEdit('password')}>
                            Edit
                        </button>
                    )}
                </label>
            </div>
            <div className="settings-actions">
                {isEditing.name || isEditing.dob || isEditing.email || isEditing.password ? (
                    <>
                        <button className="settings-submit" onClick={handleSubmit}>
                            Submit
                        </button>
                        <button className="settings-cancel" onClick={handleCancel}>
                            Cancel
                        </button>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default Settings;

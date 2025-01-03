import React, { useState, useEffect } from 'react'
import styles from './Setting.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Setting = () => {
    const navigate = useNavigate();
    const [showEmail, setShowEmail] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const [settingData, setSettingData] = useState({
        username: "",
        email: "",
        oldPassword: "",
        newPassword: "",
    })

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get(
                "http://localhost:4000/api/user/getUser",
                {
                    headers: {
                        Authorization: ` Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            const user = response.data.user;
            setSettingData({
                username: user.username,
                email: user.email,
                oldPassword: "",
                newPassword: "",
            });
        } catch (error) {
            console.error("Failed to fetch user data", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettingData({ ...settingData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedFields = {};
        if (settingData.userName) updatedFields.userName = settingData.userName;
        if (settingData.email) updatedFields.email = settingData.email;
        if (settingData.oldPassword && settingData.newPassword) {
            if (settingData.oldPassword === settingData.newPassword) {
                toast.error("New password cannot be the same as the old password", {
                    position: "top-right",
                });
                return;
            }
            updatedFields.oldPassword = settingData.oldPassword;
            updatedFields.newPassword = settingData.newPassword;
        }

        try {
            const response = await axios.put(
                "http://localhost:4000/api/user/updateUser",
                updatedFields,
                {
                    headers: {
                        Authorization: ` Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            toast.success("Profile updated successfully!", {
                position: "top-right",
            });

            // If email is updated, logout user
            if (updatedFields.email) {
                logout();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile", {
                position: "top-right",
            });
        }
    };


    const logout = () => {
        // Clear user-related data (e.g., token, userId) from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("formId");
        localStorage.removeItem("folderId");

        // Optionally clear any other application state here if needed
        toast.success("Logged out successfully!");

        // Navigate to the login page
        navigate('/login') // Replace "/login" with the actual path to your login page
    };

    return (
        <div className={styles.settingsContainer}>
            <div className={styles.settings}>
                <h1 className={styles.title}>Settings</h1>
                <form className={styles.settingsForm} onSubmit={handleSubmit}>
                    <div className={styles.inputWrapper}>
                        <i className={`fas fa-user ${styles.icon}`}></i>
                        <input className={styles.input} type="text"
                            name='username'
                            value={settingData.username}
                            onChange={handleChange}
                            placeholder="Name" />
                    </div>

                    <div className={styles.inputWrapper}>
                        <i className={`fas fa-lock ${styles.icon}`}></i>
                        <input
                            className={styles.input}
                            type={showEmail ? "text" : "password"}
                            name="email"
                            value={settingData.email}
                            onChange={handleChange}
                            placeholder="Update Email"
                        />
                        <i
                            className={`fas fa-eye ${styles.toggleIcon}`}
                            onClick={() => setShowEmail(!showEmail)}
                        ></i>
                    </div>

                    <div className={styles.inputWrapper}>
                        <i className={`fas fa-lock ${styles.icon}`}></i>
                        <input
                            className={styles.input}
                            type={showOldPassword ? "text" : "password"}
                            name="oldPassword"
                            value={settingData.oldPassword}
                            onChange={handleChange}
                            placeholder="Old Password"
                        />
                        <i
                            className={`fas fa-eye ${styles.toggleIcon}`}
                            onClick={() => setShowOldPassword(!showOldPassword)}
                        ></i>
                    </div>

                    <div className={styles.inputWrapper}>
                        <i className={`fas fa-lock ${styles.icon}`}></i>
                        <input
                            className={styles.input}
                            type={showNewPassword ? "text" : "password"}
                            name="newPassword"
                            value={settingData.newPassword}
                            onChange={handleChange}
                            placeholder="New Password"
                        />
                        <i
                            className={`fas fa-eye ${styles.toggleIcon}`}
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        ></i>
                    </div>

                    <button className={styles.updateButton} type='submit'>Update</button>
                </form>
            </div>
            <div className={styles.logout}>
                <button className={styles.logoutBtn} onClick={logout}><i className="fa-solid fa-arrow-right-from-bracket"></i>Log out</button>
            </div>
        </div>
    );
}

export default Setting;

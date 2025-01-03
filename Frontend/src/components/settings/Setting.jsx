import React, { useState } from 'react'
import styles from './Setting.module.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Setting = () => {
    const navigate = useNavigate();
    const [showEmail, setShowEmail] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const [settingData, setSettingData] = useState({
        userName:"",
        email:"",
        oldPassword:"",
        newPassword:"",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettingData({...settingData, [name]: value});
    }

    const handleSubmit = (e) => {
        e.prevetDefault();

    }


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
                        name='userName'
                        value={settingData.userName}
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

import React, { useState } from 'react';
import style from './FormDashboard.module.css'

const FormDashboard = () => {

    const [boolean, setBoolean] = useState(false)
    return (
        <>
            <div className={style.Main_Container}>
                {/* navbar */}
                <div className={style.workspace_Navbar}>
                    <div className={style.navbar}>
                        <select name="dropdown" id="dropdown">
                            <option value="name">Kumar workspace</option>
                            <option value="setting" className={style.setting}>Settings</option>
                            <option value="logout" className={style.logout}>Log Out</option>
                        </select>
                    </div>
                    <div className={style.NavShare}>
                        <div className={style.dark}>
                            <p>Light</p>
                            <label className={style.switch}>
                                <input type="checkbox" />
                                <span className={`${style.slider} ${style.round}`}></span>
                            </label>
                            <p>Dark</p>
                        </div>
                        <div className={style.share}>
                            <button onClick={()=> setBoolean(true)}>Share</button>
                        </div>
                    </div>
                </div>
                {/* <hr /> */}

                {/* create folder */}
                <div className={style.Main_Createrfolder}>
                    <div className={style.Ineercreate_folder}>
                        <div className={style.Create_Folder}>
                            <div className={style.Folder}>
                                <span><i className="fa-solid fa-folder-plus"></i>Create a folder</span>
                            </div>
                            <div className={style.Folder_File}>
                                <span>+</span>
                                <p>Create a typebot</p>
                            </div>
                        </div>
                    </div>

                    {/* share with email model */}
                    {boolean && (
                        <div className={style.Share_Model} onClick={()=>setBoolean(false)}>
                            <div className={style.inner_shareModel}>
                                <form  onClick={(e)=>e.stopPropagation()}>
                                    <div className={style.Sharemodel_Cross}>
                                    <span onClick={()=>setBoolean(false)}>x</span></div>
                                    <div className={style.shareModel_mail}>
                                        <label htmlFor="email">Invite by Email
                                            <select name="edit" id="edit">
                                                <option value="edit">Edit</option>
                                                <option value="view">View</option>
                                            </select>
                                        </label>
                                        <input type="email" name='email' placeholder="Enter email id" />
                                    </div>
                                    <button>Send Invite</button>
                                    <p>Invite by link</p>
                                    <button>Copy link</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default FormDashboard;

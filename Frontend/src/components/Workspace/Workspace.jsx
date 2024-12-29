import React from 'react';
import style from './Workspace.module.css'

const Workspace = () => {
    return (
        <>
            <div className={style.Workspace_Main_Container}>
                <div className={style.Workspace_Navbar}>
                    <div className={style.Workspace_input}>
                        <input type="text" name='name' placeholder='Enter Form Name' />
                    </div>

                    <div className={style.Workspace_Theme}>
                        <button className={style.Workspace_flowbtn}>Flow</button>
                        <button className={style.Workspace_Responsebtn}>Response</button>
                    </div>
                    <div className={style.Workspace_NavbarBtns}>
                        <div className={style.dark}>
                            <p>Light</p>
                            <label className={style.switch}>
                                <input type="checkbox" />
                                <span className={`${style.slider} ${style.round}`}></span>
                            </label>
                            <p>Dark</p>
                        </div>
                        <div className={style.Workspace_NavbarButton}>
                            <button className={style.Workspace_shareBtn}>Share</button>
                            <button className={style.Workspace_saveBtn}>Save</button>
                            <button className={style.Workspace_XBtn}>x</button>
                        </div>
                    </div>
                </div>

                <div className={style.Workspace_content}>
                    <div className={style.Workspace_Leftpanel}></div>
                    <div className={style.Workspace_Rightpanel}></div>
                </div>
            </div>
        </>
    )
}

export default Workspace

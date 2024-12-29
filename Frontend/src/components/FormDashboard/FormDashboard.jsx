import React, { useState } from 'react';
import style from './FormDashboard.module.css'
import { useNavigate } from 'react-router-dom';

const FormDashboard = () => {
    const navigate = useNavigate();
    const [boolean, setBoolean] = useState(false);
    const [createShowModal, setCreateShowModal] = useState(false);
    const [confirmDeleteModel, setConfirmDeleteModel] = useState(false)
    const [folderToDelete, setFolderToDelete] = useState(null);

    const [createInput, setCreateInput] = useState('')
    const [createFolders, setCreateFolders] = useState([]);

    // targeting the input
    const handleInputChange = (e) => {
        setCreateInput(e.target.value);
    };

    const handleAddFolder = () => {
        setCreateShowModal(true);
    };

    // deleting the folder
    const handleFolderClick = (index) => {
        setFolderToDelete(index);
        setConfirmDeleteModel(true);
    };

    const handleConfirmDelete = () => {
        if (folderToDelete !== null) {
              // Create a new array excluding the folder at the specified index
            const updatedFolders = createFolders.filter((_, i) => i !== folderToDelete);
            setCreateFolders(updatedFolders);// Update the state
            setFolderToDelete(null); // update again to null
        }
        setConfirmDeleteModel(false);
    };
// cancling the confirm modal funciton
    const handleCancelDelete = () => {
        setFolderToDelete(null);
        setConfirmDeleteModel(false);
      };

    // const handleDelete = (index) => {
    //     const updatedFolders = createFolders.filter((_, i) => i !== index);
    //     setCreateFolders(updatedFolders); 
    // };

    //   handling the data
    const handleCreateFolderDone = (e) => {
        e.preventDefault();
        if (createInput.trim() !== '') {
            setCreateFolders([...createFolders, createInput]);
            setCreateInput('');
        }
        setCreateShowModal(false);
    }


    return (
        <>
            <div className={style.Main_Container}>
                {/* navbar */}
                <div className={style.workspace_Navbar}>
                    <div className={style.navbar}>
                        <select name="dropdown" id="dropdown">
                            <option value="name">Kumar workspace</option>
                            <option value="setting" className={style.setting} onClick={()=>navigate('/setting')}>Settings</option>
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
                            <button onClick={() => setBoolean(true)}>Share</button>
                        </div>
                    </div>
                </div>

                {/* create folder */}
                <div className={style.Main_Createrfolder}>
                    <div className={style.Ineercreate_folder}>
                        <div className={style.Create_Folder}>
                            <div className={style.Folder}>
                                <span onClick={handleAddFolder}><i className="fa-solid fa-folder-plus"></i>Create a folder</span>
                                {createFolders.map((folder, index) => (
                                    <div key={index} className={style.New_folder} >
                                        {folder}<i className="fa-solid fa-trash-can" onClick={() => handleFolderClick(index)}></i>
                                    </div>
                                ))}
                            </div>

                            <div className={style.Folder_File} onClick={()=> navigate('/workspace')}>
                                <span>+</span>
                                <p>Create a typebot</p>
                            </div>
                        </div>
                    </div>

                    {/* share with email modal */}
                    {boolean && (
                        <div className={style.Share_Model} onClick={() => setBoolean(false)}>
                            <div className={style.inner_shareModel}>
                                <form onClick={(e) => e.stopPropagation()}>
                                    <div className={style.Sharemodel_Cross}>
                                        <span onClick={() => setBoolean(false)}>x</span></div>
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

                    {/* create folder modal */}
                    {createShowModal && (
                        <div className={style.Create_folder_modal}>
                            <div className={style.Create_folder_modalContent}>
                                <form onSubmit={handleCreateFolderDone}>
                                    <h3>Create New Folder</h3>
                                    <input
                                        type="text"
                                        placeholder="Enter folder name"
                                        value={createInput}
                                        onChange={handleInputChange}
                                        className={style.Create_folder_modalInput}
                                        required
                                    />
                                    <div className={style.Create_folder_modalActions}>
                                        <button className={style.doneButton} type='submit'>Done</button>
                                        <span className={style.line}>|</span>
                                        <button className={style.cancelButton} onClick={() => setCreateShowModal(false)}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Confirm Delete Modal */}
                    {confirmDeleteModel && (
                        <div className={style.Create_delete_modal}>
                            <div className={style.Create_folder_modalContent}>
                                <h3>Are you sure you want to
                                    delete this folder ?</h3>

                                <div className={style.Create_folder_modalActions}>
                                    <button className={style.doneButton} onClick={handleConfirmDelete} >Confirm</button>
                                    <span className={style.line}>|</span>
                                    <button className={style.cancelButton} onClick={handleCancelDelete} >Cancel</button>
                                </div>

                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}

export default FormDashboard;

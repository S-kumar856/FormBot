import React, { useState, useEffect } from 'react';
import style from './FormDashboard.module.css'
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../theme-context';

import axios from 'axios';

const FormDashboard = () => {
    const navigate = useNavigate();
    const [boolean, setBoolean] = useState(false);
    const [createShowModal, setCreateShowModal] = useState(false);
    const [folderToDelete, setFolderToDelete] = useState(null);
    const [confirmDeleteModel, setConfirmDeleteModel] = useState(false);
    const [confirmDeleteFormModel, setConfirmDeleteFormModel] = useState(false);
    const [NewFormToDelete, setNewFormToDelete] = useState(null);
    const [createInput, setCreateInput] = useState('')
    const [createFolders, setCreateFolders] = useState([]);

    const [newForm, setNewForm] = useState([]);


    // dark and light mode
    const { theme, toggleTheme } = useTheme();

    // getting folderid from the local storage
    const folderId = localStorage.getItem('folderId')
    console.log("folderid", folderId)

    // targeting the input
    const handleInputChange = (e) => {
        setCreateInput(e.target.value);
    };

    const handleAddFolder = () => {
        setCreateShowModal(true);
    };

    // fetching folders from backend
    const fetchFolders = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://localhost:4000/api/folders/folders/:id",
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
            setCreateFolders(response.data.output);

        } catch (error) {
            console.error("Error fetching folders:", error);
        }
    };

    useEffect(() => {
        fetchFolders();
    }, [])


    // const handleLogout = () => {
    //     localStorage.removeItem('token');
    //     navigate('/login');
    // };

    // creating the folder
    const handleCreateFolder = async (e) => {
        e.preventDefault();
        if (!createInput) return;

        try {
            const response = await axios.post(
                "http://localhost:4000/api/folders/create-folder",
                { name: createInput },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
            console.log(response.data.folder);
            // const res = await createFolder(createInput);
            setCreateFolders([...createFolders, response.data.folder]);
            setCreateInput("");
            setCreateShowModal(false);
        } catch (error) {
            console.error("Error creating folder:", error);
        }
    };

    // accessign the folder folder id using the function
    const handleFolderClick = (index) => {
        localStorage.setItem("folderId", index)
        setFolderToDelete(index);
        setConfirmDeleteModel(true);
        
    };

    // function to delete folder
    const handleDeleteFolder = async () => {
        try {
            await axios.delete(
                `http://localhost:4000/api/folders/folder/${folderId}`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
            // Remove deleted folder from the list
            const updatedFolder = createFolders.filter((folder) => folder._id !== folderId)
            setCreateFolders(updatedFolder);// Update the state
            setConfirmDeleteModel(false);
        } catch (error) {
            console.error("Error deleting folder:", error);
        }
    };


    // function for cancling the confirm modal funciton
    const handleCancelDelete = () => {
        setFolderToDelete(null);
        setConfirmDeleteModel(false);
        setNewFormToDelete(null);
        setConfirmDeleteFormModel(false);
    };

    // ---------------------------------------------------------------------------------------

    // handling forms

    const handleFormId = (id) => {
        localStorage.setItem("formId", id);
        setNewFormToDelete(id);
        setConfirmDeleteFormModel(true)
    };

// form id 
    const formId = localStorage.getItem('formId')
    

    // Create Form in a specific folder and navigate to form creation
    const handleCreateForm = () => {
        localStorage.setItem("folderId", folderId); // Save folder ID for form creation
        
        navigate("/workspace"); // Navigate to the form creation page
    };

// get forms
    const handlegetForms = async (item) => {
        localStorage.setItem("folderId", item._id);

        try {
          const response = await axios.get(
            `http://localhost:4000/api/folders/folders/${item._id}/forms`,
            {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            }
          );
          console.log(response.data)
          setNewForm(Array.isArray(response.data.forms) ? response.data.forms : []);
          if (response.data.forms.length > 0) {
            localStorage.setItem("formId", response.data.forms[0]._id);
          }
        } catch (error) {
          console.error("Error fetching forms:", error);
        }
      };

    // Delete Form Functionality (fixed to pass form ID)
    const handleDeleteForm = async () => {
        try {
            await axios.delete(
                `http://localhost:4000/api/folders/form/${formId}`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
            // Remove deleted form from the list
            setNewForm(newForm.filter((form) => form._id !== formId));
            setConfirmDeleteFormModel(false)
        } catch (error) {
            console.error("Error deleting form:", error);
        }
    };


    return (
        <>
            <div className={style.Main_Container}>
                {/* navbar */}
                <div className={style.workspace_Navbar}>
                    <div className={style.navbar}>
                        <select name="dropdown" id="dropdown">
                            <option value="name">Kumar workspace</option>
                            <option value="setting" className={style.setting} onClick={() => navigate('/setting')}>Settings</option>
                            <option value="logout" className={style.logout}>Log Out</option>
                        </select>
                    </div>
                    <div className={style.NavShare}>
                        <div className={style.dark}>
                            <p>Light</p>
                            <label className={style.switch}>
                                <input type="checkbox"
                                    onChange={toggleTheme}
                                    checked={theme == 'dark'}
                                />
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
                                    <div key={index} className={style.New_folder} onClick={()=> {handlegetForms(folder)}}>
                                        {folder.name}
                                        <i className="fa-solid fa-trash-can" onClick={()=>  handleFolderClick(folder._id)}></i>
                                    </div>
                                ))}
                            </div>
                            <div className={style.Folder_Form}>
                                <div className={style.Folder_File} onClick={handleCreateForm}> {/*  */}
                                    <span>+</span>
                                    <p>Create a typebot</p>
                                </div>

                                    
                                {newForm.map((form, index) => (
                                    <div key={index} className={style.New_folderForm} onClick={()=> navigate('/workspace')}> 
                                        <i className="fa-solid fa-trash-can" onClick={() => handleFormId(form._id)} ></i> 
                                        <h3>{form.name || "Unnamed Form"}</h3>
                                    </div>
                                ))}
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
                                <form onSubmit={handleCreateFolder}>
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
                                    <button className={style.doneButton} onClick={handleDeleteFolder} >Confirm</button>
                                    <span className={style.line}>|</span>
                                    <button className={style.cancelButton} onClick={handleCancelDelete} >Cancel</button>
                                </div>

                            </div>
                        </div>
                    )}


                    {/* confirm Delete newform model */}
                    {confirmDeleteFormModel && (
                        <div className={style.Create_delete_modal}>
                            <div className={style.Create_folder_modalContent}>
                                <h3>Are you sure you want to
                                    delete this Form ?</h3>

                                <div className={style.Create_folder_modalActions}>
                                    <button className={style.doneButton} onClick={handleDeleteForm} >Confirm</button>
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

import React from 'react';
import { useState, useEffect } from 'react';
import style from './Workspace.module.css';
import axios from 'axios';
import { useTheme } from '../theme-context';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import T from '../../assets/T.png';
// import gif from '../../assets/gif.png';
import Response from '../ResponsePage/Response';

const Workspace = () => {
    const navigate = useNavigate()
    const { theme, toggleTheme } = useTheme();
    const [fields, setFields] = useState([]);
    const [formResponse, setFormResponse] = useState([]);
    const [formName, setFormName] = useState("");
    const [fId, setformId] = useState(null);
    const [showResponse, setShowResponse] = useState(true);
    const [isFormSaved, setIsFormSaved] = useState(false);

    const { folderId, formId } = useParams();

    const apiUrl = import.meta.env.VITE_API_URI;
    const frontendUrl = import.meta.env.VITE_FRONTEND_URI;

    console.log(frontendUrl)
    // Fetch form data when the component mounts
    useEffect(() => {
        const fetchFormData = async () => {
            try {
                if (formId) {
                    const response = await axios.get(
                        `${apiUrl}/api/forms/form/${formId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                        }
                    );
                    if (response.data.success) {
                        const form = response.data.form;

                        setFormName(form.name); // Set form name
                        setFields(form.fields); // Set the form fields (bubbles and inputs)
                        setFormResponse([response.data.form]); // Set the form response data
                    }
                    else {
                        // Reset state if no formId exists
                        setFormName("");
                        setFields([]);
                    }
                }
            } catch (error) {
                console.error("Error fetching form data:", error);

            }
        };

        fetchFormData();
    }, [formId]); // Only fetch data once when formId changes or component mounts

    // Handle adding a bubble
    const addBubble = (type) => {
        const newField = {
            label: `${type}`,
            type: "bubble",
            sequence: fields.length + 1,
            prefilled: true, // Bubble will have prefilled data
            value: "", // Editable for the form creator
        };
        setFields([...fields, newField]);
    };

    // Handle adding an input field
    const addInput = (inputType) => {
        const newField = {
            label: `${inputType.charAt(0).toUpperCase() + inputType.slice(1)}`,
            type: "input",
            inputType: inputType,
            sequence: fields.length + 1,
            value: "", // Editable input field for user
        };
        setFields([...fields, newField]);
    };

    // Handle updating field value for both bubble and input fields
    const handleFieldChange = (index, newValue) => {
        const updatedFields = [...fields];
        updatedFields[index].value = newValue; // Update the value in state
        setFields(updatedFields);
    };

    // Handle saving the form data
    const saveForm = async () => {
        console.log(fields.length);
        if (formId) {  
            console.log("save");

            try {
            
                if (!folderId) {
                    alert("Please select a folder to save the form bot.");
                    return;
                }

                const response = await axios.post(
                    `${apiUrl}/api/folders/create-form-bot`, // POST request to save  the form 
                    {
                        folderId: folderId, // folder where formbot should be save
                        formBotName: formName, // Form name
                        fields: fields, // Updated fields (contains both bubbles and inputs)
                    },
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                    }
                );

                console.log(response.data.formBot.name);

                if (response.data.success) {

                    setformId(response.data.formBot._id);
                    toast.success("Form Saved successfully!");
                    setIsFormSaved(!isFormSaved);

                }
            } catch (error) {
                console.error("Error Saving form:", error);
                toast.error("Error Saving form");
            }
        } else {
            updateForm();
            console.log("update");

        }
    };

    // Handle saving the updated form data
    const updateForm = async () => {
        try {
            const response = await axios.put(
                `${apiUrl}/api/forms/form/${formId}`, // PUT request to update the form by formId
                {
                    folderId: folderId, // folder where formbot should be update
                    formBotName: formName, // Form name
                    fields: fields, // Updated fields (contains both bubbles and inputs)
                },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );

            if (response.data.success) {
                toast.success("Form updated successfully!");
            }
        } catch (error) {
            console.error("Error updating form:", error);
            toast.error("Error updating form");
        }
    };


    // Handle generating a shareable link
    const shareForm = async () => {
        console.log(fId);
        try {
            const response = await axios.post(
                `${apiUrl}/api/forms/share/${fId}`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
            console.log("Form link:", response.data.linkId);
            localStorage.setItem("linkId", response.data.linkId);
            const link = `${frontendUrl}/chatbot/${response.data.linkId}`;
            navigator.clipboard.writeText(link);
            toast.success('Link copied to clipboard:' + link);
            
        } catch (error) {
            console.error("Error sharing form:", error);
            toast.error("Error sharing form");
        }
    };

    // clearing formfield and navigate to formdashboard
    const handleCross = () => {
        localStorage.removeItem("formId")
        navigate("/formdashboard"); 
        // Navigate to FormDashboard

    }
    const deleteField = (index) => {
        const updatedFields = fields.filter((_, fieldIndex) => fieldIndex !== index);
        setFields(updatedFields);
    };

    return (
        <>
            <div className={style.Workspace_Main_Container}>
                <div className={style.Workspace_Navbar}>
                    <div className={style.Workspace_input}>
                        <input type="text" name='name' placeholder='Enter Form Name'
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                        />
                    </div>

                    <div className={style.Workspace_Theme}>
                        <button className={style.Workspace_flowbtn} onClick={()=>setShowResponse(true)}>Flow</button>
                        <button className={style.Workspace_Responsebtn} onClick={()=>setShowResponse(false)}>Response</button>
                    </div>
                    <div className={style.Workspace_NavbarBtns}>
                        <div className={style.dark}>
                            <p>Light</p>
                            <label className={style.switch}>
                                <input type="checkbox"
                                    onChange={toggleTheme}
                                    checked={theme === 'dark'}
                                />
                                <span className={`${style.slider} ${style.round}`}></span>
                            </label>
                            <p>Dark</p>
                        </div>
                        <div className={style.Workspace_NavbarButton}>
                       
                            <button className={ isFormSaved?style.Workspace_shareBtn:style.Workspace_enableBtn} disabled={!isFormSaved} onClick={shareForm}>Share</button>

                            <button className={style.Workspace_saveBtn} onClick={saveForm}>Save</button>
                            <button className={style.Workspace_XBtn} onClick={handleCross}>x</button>
                        </div>
                    </div>
                </div>

                {showResponse ? (<div className={style.Workspace_content}>
                    <div className={style.Workspace_Leftpanel}>
                        <div className={style.sidebar}>
                            <div className={style.bubble}>
                                <h3>Bubbles</h3>
                                <button onClick={() => addBubble("Text")}><i className="fa-regular fa-message"></i>Text</button>
                                <button onClick={() => addBubble("Image")}><i className="fa-regular fa-image"></i>Image</button>
                                <button onClick={() => addBubble("Video")}><i className="fa-solid fa-film"></i>Video</button>
                                <button onClick={() => addBubble("GIF")}>GIF</button>
                            </div>
                            <div className={style.inputes}>
                                <h3>Input Fields</h3>
                                <button onClick={() => addInput("text")}><img src={T} alt="Textimg"/> Text</button>
                                <button onClick={() => addInput("number")}><i className="fa-regular fa-hashtag"></i>Number</button>
                                <button onClick={() => addInput("email")}><i className="fa-regular fa-at"></i>Email</button>
                                <button onClick={() => addInput("number")}><i className="fa-solid fa-phone"></i>Phone</button>
                                <button onClick={() => addInput("date")}><i className="fa-regular fa-calendar"></i>Date</button>
                                <button onClick={() => addInput("number")}><i className="fa-regular fa-star"></i>Rating</button>
                                <button onClick={() => addInput("number")}><i className="fa-regular fa-square-check"></i>Buttons</button>
                            </div>
                        </div>
                    </div>
                    <div className={style.Workspace_Rightpanel}>
                        <div className={style.Workspace_Rightpanel_Container}>
                            <div className={style.startFlag}>
                                <h4><i className="fa-regular fa-flag"></i>Start</h4>
                            </div>
                            {fields.map((field, index) => (
                                <div key={index} className={style.Workspace_FormField}>
                                    <label>{field.label}</label>
                                    {field.type === 'input' ? (
                                        <input
                                            type={field.inputType}
                                            placeholder={`Enter ${field.inputType}`}
                                            value={field.value}
                                            onChange={(e) => handleFieldChange(index, e.target.value)}
                                        />
                                    ) : (
                                        <div>
                                            {/* <i className="fa-regular fa-message"></i> */}
                                            <input
                                                type="text"
                                                placeholder="Enter bubble data"
                                                value={field.value}
                                                onChange={(e) => handleFieldChange(index, e.target.value)}
                                            />
                                        </div>
                                    )}
                                    {/* Add Delete Button */}
                                    <div className={style.deleteBtn}>

                                        <button onClick={() => deleteField(index)}> <i className="fa-solid fa-trash-can"></i></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>) : (
                    <Response forms={formResponse} />
                )}

                
            </div>
        </>
    )
}

export default Workspace;

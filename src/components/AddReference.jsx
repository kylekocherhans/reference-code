import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/authContext";

const AddReference = () => {
    const { token, userId } = useContext(AuthContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [snippet, setSnippet] = useState("");
    const [notes, setNotes] = useState("");

    const saveHandler = (e) => {
        e.preventDefault();

        const body = {
            title,
            description,
            snippet,
            notes,
            userId
        };

        axios.post("/api/references", body, {
            headers: {
                authorization: token
            }
        })
        .then(() => {
            navigate('/home');
        })
        .catch(err => console.log(err));
    };

    const cancelHandler = () => {
        navigate('/home');
    };

    const snippetOnChangeHandler = (e) => {
        adjustTextareaHeight(e);
        setSnippet(e.target.value);
    };
    
    const notesOnChangeHandler = (e) => {
        adjustTextareaHeight(e);
        
        setNotes(e.target.value);
    };

    const adjustTextareaHeight = (e) => {
        e.target.style.height = '200px';
        if (e.target.scrollHeight > e.target.clientHeight) {
            e.target.style.height = e.target.scrollHeight + 'px';
        }
    };

    return (
        <main>
            <div id="add-container">
                <div id="add-content">
                    <form id="add-form">
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label htmlFor="description">Description</label>
                        <input
                            id="description"
                            type="text"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <label htmlFor="snippet">Code Snippet</label>
                        <textarea
                            id="snippet"
                            name="snippet"
                            cols="30"
                            rows="10"
                            onChange={(e) => snippetOnChangeHandler(e)}
                        ></textarea>
                        <label htmlFor="notes">Notes</label>
                        <textarea
                            id="notes"
                            name="notes"
                            cols="30"
                            rows="10"
                            onChange={(e) => notesOnChangeHandler(e)}
                        ></textarea>
                    </form>
                    <div className="form-btns">
                        <button className="gray-btn" onClick={cancelHandler}>Cancel</button>
                        <button className="green-btn" onClick={(e) => saveHandler(e)}>Save</button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AddReference;

import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../store/authContext";
import { CopyBlock, dracula } from "react-code-blocks";
import CardMenu from './CardMenu';

const ViewReference = () => {
    const { id, edit } = useParams();
    const { token, userId } = useContext(AuthContext);
    const [reference, setReference] = useState({});
    const [editing, setEditing] = useState(edit === "true" ? true : false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [snippet, setSnippet] = useState('');
    const [notes, setNotes] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/references/${id}`, {
            headers: {
                authorization: token
            },
        })
        .then((res) => {
            console.log(res.data);
            setReference(res.data);
            setTitle(res.data.title);
            setDescription(res.data.description);
            setSnippet(res.data.snippet);
            setNotes(res.data.notes);
        })
        .catch((err) => console.log(err));
    }, []);
    
    const saveHandler = () => {
        const body = {
            id,
            title,
            description,
            snippet,
            notes,
            userId
        };

        axios.put(`/api/references`, body, {
            headers: {
                authorization: token
            }
        })
        .then((res) => {
            setEditing(false);
            setReference(res.data);
        })
        .catch((err) => console.log(err));
    };

    const editHandler = () => {
        setEditing(!editing)
    };

    const deleteHandler = () => {
        axios.delete(`/api/references/${id}`, {
            headers: {
                authorization: token
            }
        })
        .then((res) => {
            navigate(`/`);
        })
        .catch((err) => console.log(err));
    };

    return (
        <main>
            {editing ? (
                <div id="add-container">
                    <div id="add-content">
                        <form id="add-form">
                            <label htmlFor="title">Title</label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <label htmlFor="description">Description</label>
                            <input
                                id="description"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <label htmlFor="snippet">Code Snippet</label>
                            <textarea
                                id="snippet"
                                name="snippet"
                                cols="30"
                                rows="10"
                                value={snippet}
                                onChange={(e) => setSnippet(e.target.value)}
                            ></textarea>
                            <label htmlFor="notes">Notes</label>
                            <textarea
                                id="notes"
                                name="notes"
                                cols="30"
                                rows="10"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            ></textarea>
                        </form>
                        <div className="form-btns">
                            <button className="gray-btn" onClick={e => setEditing(!editing)}>Cancel</button>
                            <button className="blue-btn" onClick={saveHandler}>Save</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div id="view-container">
                    <div id="view-content">
                        <div id="view-title">
                            <h2>{reference.title}</h2>
                            <CardMenu editHandler={editHandler} deleteHandler={deleteHandler}/>
                        </div>
                        <h3 id="view-description">{reference.description}</h3>
                        <div id="code-container">
                        {reference.snippet ? (
                            <CopyBlock
                                text={reference?.snippet}
                                language="javascript"
                                theme={dracula}
                                showLineNumbers={true}
                                codeblock
                            />
                        ) : (
                            null
                        )}
                        </div>
                        <div>Notes</div>
                        <pre id="view-notes">{reference.notes}</pre>
                    </div>
                </div>
            )}
        </main>
    );
};

export default ViewReference;

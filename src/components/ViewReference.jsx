import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../store/authContext";
import { CopyBlock, dracula } from "react-code-blocks";

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
        <>
            {editing ? (
                <div>
                    <button onClick={e => setEditing(!editing)}>Cancel</button>
                    <button onClick={saveHandler}>Save</button>
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
                </div>
            ) : (
                <div>
                    <button onClick={() => setEditing(!editing)}>Edit</button>
                    <button onClick={() => deleteHandler()}>Delete</button>
                    <h2>{reference.title}</h2>
                    <h3>{reference.description}</h3>
                    <div className="code-container">
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
                    <pre>{reference.notes}</pre>
                </div>
            )}
        </>
    );
};

export default ViewReference;

import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import AuthContext from '../store/authContext';
import axios from 'axios';

const ReferenceCard = ({ reference, getReferences }) => {
    const navigate = useNavigate();
    const {token} = useContext(AuthContext);

    const viewHandler = () => {
        navigate(`/view/${reference.id}/false`);
    };

    const editHandler = () => {
        navigate(`/view/${reference.id}/true`);
    };

    const deleteHandler = () => {
        axios.delete(`/api/references/${reference.id}`, {
            headers: {
                authorization: token
            }
        })
        .then((res) => {
            getReferences();
        })
        .catch((err) => console.log(err));
    };

    return (
        <div className="reference-card">
            <h2>{reference.title}</h2>
            <h3>{reference.description}</h3>
            <button onClick={viewHandler}>View</button>
            <button onClick={editHandler}>Edit</button>
            <button onClick={deleteHandler}>Delete</button>
        </div>
    );
};

export default ReferenceCard;

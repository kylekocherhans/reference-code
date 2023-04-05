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

    const editHandler = (e) => {
        e.stopPropagation();
        navigate(`/view/${reference.id}/true`);
    };

    const deleteHandler = (e) => {
        e.stopPropagation();
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
        <div className="reference-card" onClick={viewHandler}>
            <div className="card-info">
                <h3 className="card-title">{reference.title}</h3>
                <div>{reference.description}</div>
            </div>
            <div className="card-actions">
                <button className="card-btn gray-outline-btn" onClick={(e) => editHandler(e)}>Edit</button>
                <button className="card-btn red-outline-btn" onClick={(e) => deleteHandler(e)}>Delete</button>
            </div>
        </div>
    );
};

export default ReferenceCard;

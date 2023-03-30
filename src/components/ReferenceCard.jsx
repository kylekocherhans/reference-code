import { useNavigate } from "react-router-dom";

const ReferenceCard = ({ reference }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/view/${reference.id}`);
    };

    return (
        <div className="reference-card">
            <h2>{reference.title}</h2>
            <textarea
                id="snippet"
                name="snippet"
                cols="30"
                rows="10"
                value={reference.snippet}
            ></textarea>
            <button onClick={handleClick}>View</button>
        </div>
    );
};

export default ReferenceCard;

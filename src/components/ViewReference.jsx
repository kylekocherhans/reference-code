import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../store/authContext";
import { CopyBlock, dracula } from "react-code-blocks";

const ViewReference = () => {
    const { id } = useParams();
    const [reference, setReference] = useState({});
    const { token } = useContext(AuthContext);

    useEffect(() => {
        axios
            .get(`/api/references/${id}`, {
                headers: {
                    authorization: token,
                },
            })
            .then((res) => {
                console.log(res.data);
                setReference(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div
            style={{
                fontFamily: "Fira Code",
            }}
        >
            <h2>{reference.title}</h2>
            <h3>{reference.description}</h3>
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
            
            {/* <pre>{reference.snippet}</pre> */}
            <textarea
                name="snippet"
                id="snippet"
                cols="30"
                rows="10"
                value={reference.snippet}
            ></textarea>
            <pre>{reference.notes}</pre>
        </div>
    );
};

export default ViewReference;

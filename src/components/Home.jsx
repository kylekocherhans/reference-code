import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import AuthContext from '../store/authContext';

import ReferenceCard from './ReferenceCard';

const Home = () => {
    const {userId, token} = useContext(AuthContext);

    const [references, setReferences] = useState([]);

    useEffect(() => {
        axios.get(`/api/userReferences/${userId}`, {
            headers: {
                authorization: token
            }
        })
        .then(res => {
            console.log(res.data);
            setReferences(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <div>
            {references.map(reference => {
                return <ReferenceCard reference={reference} key={reference.id}/>
            })}
        </div>
    );
};

export default Home;
import {useState, useEffect, useContext} from 'react';
import axios from 'axios';

import AuthContext from '../store/authContext';

const Home = () => {
    const {userId, token} = useContext(AuthContext);

    const [references, setReferences] = useState([]);

    useEffect(() => {
        axios.get(`/api/references/${userId}`, {
            headers: {
                authorization: token
            }
        })
        .then(res => {
            console.log(res.data);
            // setReferences(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <div>Home</div>
    );
};

export default Home;
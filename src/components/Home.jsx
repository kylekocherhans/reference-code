import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import AuthContext from '../store/authContext';

import ReferenceCard from './ReferenceCard';

const Home = () => {
    const {userId, token} = useContext(AuthContext);

    const [references, setReferences] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const getReferences = () => {
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
    }

    useEffect(() => {
        getReferences();
    }, []);

    return (
        <div>
            <input
                id="search-input"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div>
                {references
                    .filter((reference) => {
                        let title = reference.title.toLowerCase();
                        let description = reference.description.toLowerCase();
                        let searchParams = searchTerm.toLowerCase();
                        return (
                            title.includes(searchParams) ||
                            description.includes(searchParams)
                        );
                    })
                    .map((reference) => {
                        return (
                            <ReferenceCard
                                reference={reference}
                                getReferences={getReferences}
                                key={reference.id}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default Home;
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

import { API_HOST, SESSION_COOKIE } from '../../utils/constants';
import apiCall from "../../utils/apiCall";

// Styles
import styles from "./Landing.module.css";

const allJobs: string[] = ['mafia', 'medico', 'policia', 'pueblo'];

const Landing: React.FC = () => {
    
    const [name, setName] = useState("");
    const [job, setJob] = useState<string | null>("pueblo");
    const [cookies, setCookie] = useCookies([SESSION_COOKIE]);
    const navigate = useNavigate();

    const joinGame = () => {
        apiCall(`${API_HOST}/api/players`, {
            method: "POST",
            body: JSON.stringify({ name: name }),
            })
            .then((player) => {
                setCookie(SESSION_COOKIE, player.id);
                navigate(`/game`)
            })
            .catch((err) => console.log("Error while creating room", err));
    };

    useEffect(() => {
        const int = setInterval(()=> changeJob(), 1500);

        const sessionId = cookies[SESSION_COOKIE];
        console.log(sessionId)
        // if(sessionId) {
        //     navigate('/game');
        // }
        return () => clearInterval(int);
    }, []);

    const changeJob = () => {
        if (allJobs.length === 0) return;
    
        const job = allJobs.shift();
        if (job !== undefined) {
            setJob(job);
            allJobs.push(job);
        }
    }

    return (
        <div className={styles.landing}>
            <h1 className={styles.title}>MAFIA</h1>
            <img src={`roles/${job}.webp`} />
            <input
                type="text"
                value={name}
                placeholder="Tu Nombre"
                className={styles.input}
                onChange={(e) => setName(e.target.value)}
            />
            <button className="coolButton" onClick={joinGame} >
                Unirse al juego
            </button>
            </div>
    )
};

export default Landing;
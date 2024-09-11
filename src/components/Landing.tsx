import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

import { API_HOST, SESSION_COOKIE } from '../utils/constants';
import apiCall from "../utils/apiCall";

// Styles
import styles from "./Landing.module.css";

const allJobs: string[] = ['mafia', 'medico', 'policia', 'pueblo'];

const Landing: React.FC = () => {
    
    const [name, setName] = useState("");
    const [job, setJob] = useState<string | null>(null);
    const [_, setCookie] = useCookies([SESSION_COOKIE]);
    const navigate = useNavigate();

    const joinGame = () => {
        apiCall(`${API_HOST}/api/players`, {
        // apiCall(`http://localhost:4001/api/players`, {
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
        changeJob();
    }, []);

    const changeJob = () => {
        if (allJobs.length === 0) return; // Asegúrate de que haya trabajos en la lista
    
        const job = allJobs.shift(); // Obtén el primer trabajo de la lista
        if (job !== undefined) { // Verifica si el trabajo no es undefined
            setJob(job); // Establece el nuevo trabajo
            allJobs.push(job); // Añade el trabajo al final de la lista
        }
    
        // Repite el ciclo después de 1 segundo
        setTimeout(() => {
            changeJob();
        }, 1000);
    }

    return (
        <div className={styles.landing}>
            <h1 className={styles.title}>MAFIA</h1>
            <img src="mafia.png" alt="roles" style={{ display: job === 'mafia' ? 'block' : 'none' }} />
            <img src="medico.png" alt="roles" style={{ display: job === 'medico' ? 'block' : 'none' }} />
            <img src="policia.png" alt="roles" style={{ display: job === 'policia' ? 'block' : 'none' }} />
            <img src="pueblo.png" alt="roles" style={{ display: job === 'pueblo' ? 'block' : 'none' }} />
            <input
                type="text"
                value={name}
                placeholder="NOMBRE"
                className={styles.input}
                onChange={(e) => setName(e.target.value)}
            />
            <button className={styles.coolButton} onClick={joinGame} >
                Unirse al juego
            </button>
            </div>
    )
};

export default Landing;
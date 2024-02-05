import { useState } from "react"

export default function Player({ initialName, symbol, isActive, onPlayerNameChange }) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    const handleButtonClick = () => {
        //setIsEditing(!isEditing); NEVER do this. 
        //If new state is dependent on old state, always provide callback function and react will ensure to pass current value.
        setIsEditing((editing) => !editing);
        if(isEditing) {
            onPlayerNameChange(symbol, playerName);
        }
    }

    function handleNameChange(event) {
        setPlayerName(event.target.value);
    }

    let playerNameHtml = <span className="player-name">{playerName}</span>;
    if (isEditing) {
        playerNameHtml = <input type="text" value={playerName} required onChange={handleNameChange}></input>
    }


    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player-info">
                {playerNameHtml}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleButtonClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}
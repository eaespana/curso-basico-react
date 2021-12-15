import React from "react";
import {ReactComponent as IconCheck} from './icon-check.svg';
import {ReactComponent as IconCancel} from './icon-cancel.svg';
import './TodoIcon.css';

const iconTypes = {
    "check": color =>  (
        <IconCheck className="Icon-svg Icon-svg--check" 
                    fill={color}/>
    ),
    "delete": color => (
        <IconCancel className="Icon-svg Icon-svg--cancel" 
                    fill={color}/>
    )
}

function TodoIcon({type,color = 'gray',onClick}) {
    return (
        <span
            className={`Icon-container Icon-container--${type}`}
            onClick={onClick}
        >
        {iconTypes[type](color)}
        </span>
    )
}

export { TodoIcon };
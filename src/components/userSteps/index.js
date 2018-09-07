import React  from 'react';
import './style.css';

export default function Steps({num}){
        return (
            <div className="user-steps">
                <div className={"step" + (num === 1 ? ' active': '')}>Шаг 1</div>
                <div className={"step" + (num === 2 ? ' active': '')}>Шаг 2</div>
                <div className={"step" + (num === 3 ? ' active': '')}>Шаг 3</div>
            </div>
        );
}
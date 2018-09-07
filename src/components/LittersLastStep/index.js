import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Steps from '../userSteps';
import './style.css';

function LittersNextStep(props){
    return (
        <div className="next-step">
            <Steps num={3} />
            <div className="step-info">
                    <h1>ПОЗДРАВЛЯЕМ!</h1>
                    <h2>ПОМЕТ УСПЕШНО ДОБАВЛЕН!</h2>
                    <h3>ТЕПЕРЬ ВЫ МОЖЕТЕ РЕДАКТИРОВАТЬ ПОМЕТ И ДОБАВЛЯТЬ ПОМЕТЫ ДРУГИХ ПОРОД.</h3>
            </div>
            <div className="controls">
                <Link to={`/breeds/view=${props.id}`}>Редактировать помет</Link>
                <Link to="/breeds">Перейти к породам</Link>
            </div>
        </div>
    );
}

const mapState = (state, { match }) => {
    const id = Number.parseInt(match.params.id, 10);
    return {
        id:id,
    }
}

export default connect(mapState)(LittersNextStep);

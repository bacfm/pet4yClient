import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsersBroods } from '../../api';
import DeleteBrood from './accept_delete';
import { getBroodView } from '../../api';
import delete_item from './delete_icon.png';
import not_clicked from './not_clicked.png';
import clicked from './clicked.png';

class  LittersList extends Component {
    constructor(props){
        super(props);
        this.state = {
            clickedLit: null,
            deleteBlockView: false
        }
        this.onClick = this.onClick.bind(this);
        this.onDeleteBrood = this.onDeleteBrood.bind(this);
        this.onCancelDel = this.onCancelDel.bind(this);
    }
    onClick(id){
        this.setState({ clickedLit: id })
        this.props.getView(id);
        // window.location.reload();
    }
    onDeleteBrood(id){
        const { getBroods } = this.props;
        const { onCancelDel } = this;
        return fetch(`http://api.pet4u.com.ua/api/v1/brood/view?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': "Token " + window.localStorage.token,
                'Content-type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then(function (res) {
                if(res.status){
                    getBroods();
                    onCancelDel();
                    window.location.pathname = '/breeds';
                }
            })
            .catch(err => console.log(err))
    }
    onCancelDel(){
        this.setState({deleteBlockView: false})
    }
    render(){
        const { show, breeds } = this.props;
        if(show == null || undefined) return (<div></div>)
        if(show === 0 || show > 0 ){
           let clickedBreed = breeds.filter(b => b.id === show)
            if(!clickedBreed[0]) return null;
            if(clickedBreed[0].broods.length === 0) return (<li className="list-itm">Незапланировано пометов</li>);
            const litters = clickedBreed[0].broods.map((lit, idx) => <li key={idx} 
                                                                        className={this.state.clickedLit === lit.id ? "onbreed-click": ""}
                                                                        onClick={(ev) => {this.onClick(lit.id); this.props.onHide(ev)}}>
                                                                        <div style={{background: this.state.clickedLit === lit.id ? '#2e9049' : '#daecda'}}>
                                                                        {this.state.clickedLit === lit.id ? <img src={clicked} alt="img"/> : <img src={not_clicked} alt="img"/>}
                                                                        </div>
                                                                        <Link key={idx} to={`/breeds/view=${lit.id}`}>{lit.birthday}</Link>
                                                                        <img onClick={(ev) => this.setState({deleteBlockView: true})} 
                                                                        src={delete_item} alt="delete"/>
                                                                        </li>);
            return (<div className='litters-list'>{litters}{this.state.deleteBlockView ? <DeleteBrood onDel={this.onDeleteBrood} onCancel={this.onCancelDel} delete_id={this.state.clickedLit}/> : null}</div>)
        }
    }
}

const mapState  = (state) => {
    return {
        breeds: state.userBreeds
    }
}
const mapDispatch = dispatch => {
    return {
        getView: (id) => dispatch(getBroodView(id)),
        getBroods: () => dispatch(getUsersBroods())
    }
}
export default connect(mapState, mapDispatch)(LittersList);
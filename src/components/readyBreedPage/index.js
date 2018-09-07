import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputForPhotos from '../addPhotoItem';
import { getBroodView, changeBroodView } from '../../api';
import AddChild from './addChild';
import DeleIcon from './delete_icon.png';
import './style.css';



class BroodInfoPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            momFeatDefault: '',
            momPedigreeDefault: '',
            dadFeatDefault: '',
            dadPedigreeDefault: '',
            pair_comment: null,
            cost_comment: null,
            notValidLinks: false,
            showAddChild: false,
            showChildDel: null,
            parentShowDel: ''
        }
        this.onAnimalDel = this.onAnimalDel.bind(this);
        this.onBroodViewChange = this.onBroodViewChange.bind(this);
        this.onShowAddChild = this.onShowAddChild.bind(this);
        this.onCostComment = this.onCostComment.bind(this);
        this.onPairComment = this.onPairComment.bind(this);
    }
    componentDidMount(){
        this.setState({breed_id: this.props.id})
        this.props.getView(this.props.id);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.view !== this.props.view){
            if(nextProps.view.parents.mother){
                this.setState({
                    momFeatDefault: nextProps.view.parents.mother.feat,
                    momPedigreeDefault: nextProps.view.parents.mother.pedigree,
                });
            }
            if(nextProps.view.parents.father){
                this.setState({
                    dadFeatDefault: nextProps.view.parents.father.feat,
                    dadPedigreeDefault: nextProps.view.parents.father.pedigree
                });
            }
        }
    }
    onCostComment(ev){
        this.setState({cost_comment: ev.target.value})
    }
    onPairComment(ev){
        this.setState({pair_comment: ev.target.value})
    }
    onShowAddChild(ev){
        ev.preventDefault();
        this.setState({showAddChild: !this.state.showAddChild})
    }
    onAnimalDel(whom, an_id){
        const { id, getView } = this.props;
        const { boys, girls } = this.props.view;
        return fetch(`http://api.pet4u.com.ua/api/v1/brood/kin?id=${an_id}&whom=${whom}`,{
            method: 'DELETE',
            headers: {
                'Authorization': "Token " + window.localStorage.token
            },
            body: JSON.stringify({boys: boys, girls: girls })
        })
            .then((res) => res.json())
            .then(function (res) {
                if(res.status){
                    getView(id);
                }
            })
    }
    onBroodViewChange(ev){
        ev.preventDefault();
        if(this.state.momPedigreeDefault  && this.state.momPedigreeDefault.search( /^(ftp|http|https):\/\/[^ "]+$/g) === -1){
            this.setState({ notValidLinks: true });
            setTimeout(() => this.setState({ notValidLinks: false}), 3000);
        }else if(this.state.dadPedigreeDefault && this.state.dadPedigreeDefault.search( /^(ftp|http|https):\/\/[^ "]+$/g) === -1){
            this.setState({ notValidLinks: true });
            setTimeout(() => this.setState({ notValidLinks: false}), 3000);
        } else {
            let c_comment = this.state.cost_comment || this.props.view.cost_comment;
            let p_comment = this.state.pair_comment || this.props.view.pair_comment;
            this.props.changeView(this.props.id, this.state.momFeatDefault, this.state.momPedigreeDefault, this.state.dadFeatDefault, this.state.dadPedigreeDefault, p_comment, c_comment, this.fci_dad.checked, this.ph_dad.checked, this.fci_mom.checked, this.ph_mom.checked);
        }
    }
    render(){
        if(this.props.view) {
            const {birthday, cost, currency, boys, girls, parents} = this.props.view;
            const male = [];
            const female = [];
            const malePhotos = [];
            const femalePhotos = [];
            let boysId = [];
            let girlsId = [];
            this.props.view.children.forEach(function(e){
                if(e.sex === 'M'){
                    boysId.push(e.id);
                    malePhotos.push(e.photos)
                }else{ 
                    girlsId.push(e.id);
                    femalePhotos.push(e.photos);
                }
            })
            for (let i = 1; i <= this.props.view.boys; i++) {
                male.push(<div className="ph-el" key={i}>
                    <h1>M{i} <img className='delete-icon'  src={DeleIcon} onClick={() => this.setState({showChildDel: boysId[i-1]})} alt='delete'/></h1>
                    <InputForPhotos whom="child" parent_id={boysId[i-1]} get_photos={malePhotos[i-1]}/>
                    {this.state.showChildDel === boysId[i - 1] ?
                        <div className="overlay">
                            <div className='accept-del-acc popup'>
                                <span className="close-popup" onClick={() => this.setState({showChildDel: null})}></span>
                                <h1 style={{textAlign: 'center'}}>ВЫ <b>УВЕРЕНЫ?</b></h1>
                                <div className="del-contrls">
                                    <button onClick={(ev) => this.onAnimalDel('child', boysId[i-1])}>Удалить</button>
                                    <button onClick={() => this.setState({showChildDel: null})}>Отмена</button>
                                </div>
                            </div>
                        </div>
                        :
                        null
                    }
                </div>);
            }
            for (let i = 1; i <= this.props.view.girls; i++) {
                male.push(<div className="ph-el" key={i + Math.random()}>
                    <h1>F{i} <img className='delete-icon'  src={DeleIcon} onClick={() => this.setState({showChildDel: girlsId[i-1]})} alt='delete'/></h1>
                    <InputForPhotos whom="child" parent_id={girlsId[i - 1]} get_photos={femalePhotos[i-1]}/>
                    {this.state.showChildDel === boysId[i - 1] ?
                        <div className="overlay">
                            <div className='accept-del-acc popup'>
                                <span className="close-popup" onClick={() => this.setState({showChildDel: null})}></span>
                                <h1 style={{textAlign: 'center'}}>ВЫ <b>УВЕРЕНЫ?</b></h1>
                                <div className="del-contrls">
                                    <button onClick={(ev) => this.onAnimalDel('child', girlsId[i-1])}>Удалить</button>
                                    <button onClick={() => this.setState({showChildDel: null})}>Отмена</button>
                                </div>
                            </div>
                        </div>
                        :
                        null
                    }
                </div>);
            }
            return (
                <div className="brood-page">
                    <h1>ИНФОРМАЦИЯ <b>О ПОМЕТЕ</b></h1>
                    <div className="brood-inf">
                        <div className="inf-item">
                            <p>Дата рождения:</p>
                            <span>{birthday.replace(/-/g, ".")}</span>
                        </div>
                        <div className="inf-item children">
                            <p>На продажу Male:</p>
                            <span>{boys}</span>
                        </div>
                        <div className="inf-item">
                            <p>Цена:</p>
                            <span>{cost}</span>
                            <span>{currency}</span>
                        </div>
                        <div className="inf-item children">
                            <p>На продажу Female:</p>
                            <span>{girls}</span>
                        </div>
                    </div>
                    <div className="comments">
                        <textarea placeholder="Комментарий к цене" value={this.state.cost_comment ? this.state.cost_comment : this.props.view.cost_comment} onChange={this.onCostComment}></textarea>
                        <textarea placeholder="Комментарий к помету" value={this.state.pair_comment ? this.state.pair_comment : this.props.view.pair_comment} onChange={this.onPairComment}></textarea>
                    </div>
                    <div className="parents">
                        {this.props.view.parents.mother ? (<div className="parent">
                            <h3>Мама ﻿+ Фото Родословной</h3>
                            <div className="parent-info">
                            <textarea placeholder="Титулы, PRA-prcd тест, ED и HD тесты, Рост, Вес" value={this.state.momFeatDefault ? this.state.momFeatDefault : parents.mother.feat} onChange={(ev) => this.setState({momFeatDefault: ev.target.value })}></textarea>
                            <input type="text" placeholder="Ссылка на родословную" className={(this.state.notValidLinks ? 'warning' : '')} value={this.state.momPedigreeDefault ? this.state.momPedigreeDefault : parents.mother.pedigree}  onChange={(ev) => this.setState({momPedigreeDefault: ev.target.value })}/>
                            <div className="parent-check">
                            <div className="parent-check-item">
                                <input style={{width: 'auto'}} defaultChecked={parents.mother.fci_check} ref={input => this.fci_mom = input} type="checkbox"/>
                                <label>Отсутствует родословная FCI</label>
                            </div> 
                            <div className="parent-check-item">
                            <input style={{width: 'auto'}} type="checkbox" defaultChecked={parents.mother.ped_check} ref={input => this.ph_mom = input}/>
                            <label>Родословная на фото</label>
                        </div> 
                        </div>
                            {this.state.notValidLinks ? (<div className="auth-err" style={{textAlign: 'center'}}>Эти поля должны содержать ссылки.</div>) : ''}
                            </div>
                            {/*<p>{parents.mother.feat}</p>*/}
                            {/*<p>{parents.mother.pedigree}</p>*/}
                        </div>) : ''}
                        {this.props.view.parents.father ? (<div className="parent">
                            <h3>Папа ﻿+ Фото Родословной</h3>
                            <div className="parent-info">
                                <textarea placeholder="Титулы, PRA-prcd тест, ED и HD тесты, Рост, Вес" value={this.state.dadFeatDefault ? this.state.dadFeatDefault : parents.father.feat} onChange={(ev) => this.setState({dadFeatDefault: ev.target.value })}></textarea>
                                <input type="text" placeholder="Ссылка на родословную" className={(this.state.notValidLinks ? 'warning' : '')} value={this.state.dadPedigreeDefault ? this.state.dadPedigreeDefault : parents.father.pedigree} onChange={(ev) => this.setState({dadPedigreeDefault: ev.target.value })}/>
                                <div className="parent-check">
                            <div className="parent-check-item">
                                <input style={{width: 'auto'}} type="checkbox" defaultChecked={parents.father.fci_check} ref={input => this.fci_dad = input}/>
                                <label>Отсутствует родословная FCI</label>
                            </div> 
                            <div className="parent-check-item">
                            <input style={{width: 'auto'}} type="checkbox"  defaultChecked={parents.father.ped_check} ref={input => this.ph_dad = input}/>
                            <label>Родословная на фото</label>
                        </div> 
                        </div>
                                {this.state.notValidLinks ? (<div className="auth-err" style={{textAlign: 'center'}}>Эти поля должны содержать ссылки.</div>) : ''}
                            </div>
                            {/*<p>{parents.father.feat}</p>*/}
                            {/*<p>{parents.father.pedigree}</p>*/}
                        </div>) : ''}
                    </div>
                    {male}
                    {female}
                    {parents.mother ? (<div className="ph-el">
                        <h1>Mама <img className='delete-icon'  src={DeleIcon} onClick={() => this.setState({parentShowDel: 'mom'})} alt='delete'/></h1>
                        <InputForPhotos whom="mother" parent_id={this.props.view.parents.mother.id} get_photos={parents.mother.photos}/>
                        {this.state.parentShowDel === 'mom' ?
                            <div className="overlay">
                            <div className='accept-del-acc popup'>
                            <span className="close-popup" onClick={() => this.setState({parentShowDel: ''})}></span>
                            <h1 style={{textAlign: 'center'}}>ВЫ <b>УВЕРЕНЫ?</b></h1>
                            <div className="del-contrls">
                            <button onClick={(ev) => this.onAnimalDel('mother', parents.mother.id)}>Удалить</button>
                            <button onClick={() => this.setState({parentShowDel: ''})}>Отмена</button>
                            </div>
                            </div>
                            </div>
                            :
                            null
                        }
                    </div>) : ''}
                    {parents.father ? (<div className="ph-el">
                        <h1>Папа <img className='delete-icon'  src={DeleIcon} onClick={() => this.setState({parentShowDel: 'dad'})} alt='delete'/></h1>
                        <InputForPhotos whom="father" parent_id={this.props.view.parents.father.id} get_photos={this.props.view.parents.father.photos}/>
                        {this.state.parentShowDel === 'dad' ?
                            <div className="overlay">
                                <div className='accept-del-acc popup'>
                                    <span className="close-popup" onClick={() => this.setState({parentShowDel: ''})}></span>
                                    <h1 style={{textAlign: 'center'}}>ВЫ <b>УВЕРЕНЫ?</b></h1>
                                    <div className="del-contrls">
                                        <button onClick={(ev) => this.onAnimalDel('father', this.props.view.parents.father.id)}>Удалить</button>
                                        <button onClick={() => this.setState({parentShowDel: ''})}>Отмена</button>
                                    </div>
                                </div>
                            </div>
                            :
                            null
                        }
                    </div>) : ''}
                    <div className="brood-controls">
                    <button onClick={this.onBroodViewChange}>Сохранить</button>
                    <button onClick={() => this.setState({showAddChild: !this.state.showAddChild})}>Добавить щенка</button>
                    </div>
                    {
                    this.state.showAddChild ?
                        <AddChild onShowAddChild={this.onShowAddChild} pair_id={this.props.id} />
                        :
                        null
                    }
                </div>
            );
        } else {
            return (<div></div>);
        }
    }
}
const mapState = (state, {match}) => {
    return {
        view: state.broodView,
        id: match.params.id
    }
}
const mapDispatch = dispatch => {
    return {
        getView: (id) => dispatch(getBroodView(id)),
        changeView: (id, momDes, momLink, dadDes, dadLink, pair_comment, cost_comment, fci_dad, ph_dad, fci_mom, ph_mom) => dispatch(changeBroodView(id, momDes, momLink, dadDes, dadLink, pair_comment, cost_comment, fci_dad, ph_dad, fci_mom, ph_mom))
    }
}
export default connect(mapState, mapDispatch)(BroodInfoPage);
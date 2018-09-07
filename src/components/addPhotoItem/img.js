import React, { Component } from 'react';

export default class PreviewImg  extends Component {
    render(){
        return (<div className="prew-img">
            <img src={this.props.src} alt="1"/>
            <span onClick={(ev) => this.props.onClick(this.props.id)}>X</span>
        </div>)
    }
}
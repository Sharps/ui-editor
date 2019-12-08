// Libraries.

import React, { Component } from "react";

// Components. 

// private - expand/collapse 
// public  - onClick - Show list of classes. 
import Tags from "./Tags";

// Styles.

import "./Style.css";

class TagExplorer extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.props);
    }

    render() {

        let nodeTree = this.props.node.result;

        if(nodeTree===undefined || this.props.node.error!==undefined){
            return(
                <div></div>
            )
        }
        
        return (
            <div className="container events-tab">
                <div className="title">TagExplorer</div>
                <ul className="tags">
                    <Tags node={nodeTree}/>
                </ul>
            </div>
        );
    }
}

export default TagExplorer;

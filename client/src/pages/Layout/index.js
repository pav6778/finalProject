import React, { Component } from 'react'
import './style.css'
import Nav from '../../components/nav/Nav'

class Layout extends Component{
    render(){
    return <div>
        <div className="container-full">
        <Nav isOnline={this.props.isOnline}/>
            <div id="image">
            </div>
            <div className="text-center">
                <button className="btn btn-lg bg-info">Enter</button>
            </div>
        </div>

  </div>
}
}
export default Layout;
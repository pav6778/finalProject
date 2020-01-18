import React, { Component } from 'react'
import API from '../../utils/API'
import './style.css'

class Nav extends Component{

    state = {
        linkName: "Log out",
        href: "/"
    }

    componentDidMount(){
        this.setState({linkName: this.props.linkName, href:this.props.href})
    }
redirectHandler(){
        API.logOut().then(res => {console.log(res)})
}

displayLink(){
if(this.state.linkName === "Log out"){
    return <div><li className="nav-item">
    <a className="nav-link" onClick={this.redirectHandler} href="/" >Log out</a>
     </li></div>
}else{
    return <div><li className="nav-item">
    <a className="nav-link"  href={this.props.href} >{this.props.linkName}</a>
     </li></div>
}
}
    render(){
    return <div className="navbar fixed-top bg-dark ">
    <a id="appName" className="navbar-brand" href="/"><h1 className="ml-3 text-warning">MindSplash </h1></a>
<ul className="nav ml-md-auto">
     
     <li className="nav-item">
         <a className="nav-link active" href="/about">About</a>
    </li>
    
    <div>
        {this.displayLink()}
    </div>
    
</ul>
</div>
}
}
export default Nav;
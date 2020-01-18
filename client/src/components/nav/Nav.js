import React, { Component } from 'react'
import API from '../../utils/API'
import './style.css'

class Nav extends Component{

    state = {
        linkName: "",
        hrefName: ""
    }


UNSAFE_componentWillMount(){
    console.log(this.props.isOnline)
    if(this.props.isOnline === true) {
        this.setState({linkName: "Logout", href: "/"})
    }else{
        this.setState({linkName: "Sign up", href: "/signup"})
    }
}
redirectHandler(){
        API.logOut().then(res => {console.log(res)})
}

    render(){
    return <div className="navbar navbar-expand bg-dark ">
    <a className="navbar-brand" href="/"><h1 className="font-weight-light ml-3 text-light">MindSplash </h1></a>
<ul className="nav ml-md-auto">
     <li className="nav-item">
         <a className="nav-link active" href="/about">About</a>
    </li>
    <li className="nav-item">
<a className="nav-link" href="/login">Login</a>
    </li>
    <li className="nav-item">
        <a className="nav-link" onClick={this.redirectHandler} href={this.state.href} >{this.state.linkName}</a>
     </li>
</ul>
</div>
}
}
export default Nav;
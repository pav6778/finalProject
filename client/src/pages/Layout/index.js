import React, { Component } from 'react'
import './style.css'
import Nav from '../../components/nav/Nav'

class Layout extends Component{
    state = {
        linkName: "Sign in/Sign up",
        href: "/login"

    }

    btnRedirect(){
     window.location.href = "/tool"  
    }
    render(){
    return <div>
        <div className="container-full">
        <Nav linkName={this.state.linkName} href={this.state.href}/>
            <div id="image">
            </div>
            <div className="text-center">
                <button onClick={this.btnRedirect}className="btn btn-lg bg-light">Click here to splash ideas</button>
            </div>
        </div>

  </div>
}
}
export default Layout;
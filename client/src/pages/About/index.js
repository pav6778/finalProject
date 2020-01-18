import React, { Component } from 'react'
import Nav from '../../components/nav/Nav'
import './style.css'

class About extends Component {

    state = {
        linkName: "Sign in/Sign up",
        href: "/login"
    }

    render(){
       
    return <div>
        <Nav linkName={this.state.linkName} href={this.state.href}/>
        <div className="container content bg-light">
            <div id="aboutPage">
                <h2 className="text-center">About</h2>
                <p>
                    What is mind mapping? A mind map is a diagram used to visually represent or outline information, it is a technique that helps individuals visualize and connect ideas. Mind map is a tool to help you improve productivity and efficiency at any task.
        
            </p>
            </div>
        </div>
    </div>
    }
}
export default About;
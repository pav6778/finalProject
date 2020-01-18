import React, { Component } from 'react'
import Nav from '../../components/nav/Nav'
import './style.css'

class About extends Component {


    render(){
       
    return <div>
        <Nav isOnline={this.props.isOnline}/>
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
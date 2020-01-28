import React, { Component } from 'react'
import Nav from '../../components/nav/Nav'
import "../../components/container/style.css"
import API from '../../utils/API'



class Login extends Component {
state = {
    href: '/signup',
    linkName: 'Sign up',
    message: "",
    alert: "",
    email: "",
    password: ""
}

componentDidMount(){
    if(this.props.history.location.state){
    this.propsMessage()
    }
}

propsMessage = () => {
    this.setState({message: this.props.history.location.state.message, alert: this.props.history.location.state.alert, email: this.props.history.location.state.email})
}

emailInput = evt =>{
    
    this.setState({email: evt.target.value})
}
passwordInput = evt => {

    this.setState({password: evt.target.value})
}

logInFormHandler = evt => {
    evt.preventDefault()
  API.authenticate({email: this.state.email, password: this.state.password})
  .then(res => {
      if(res.request.responseURL === "http://localhost:3000/"){
      this.redirect()
    }else{
        this.setState({message: "email or password is incorrect", alert: "alert alert-danger"})
    }
  })
  .catch(err => console.log(err))
}
redirect = () => {
    this.props.history.push('/tool')
}


    render() {
        return <div>
            <Nav linkName={this.state.linkName} href={this.state.href}/>
            <div className="row content">
                <div id="neuroMap" className="col-4">
                </div>
                <div id="login" className="col-8">
                    <div id="form">
                        <form onSubmit={this.logInFormHandler}>
                            <div className={this.state.alert} onChange={this.propsMessage}>{this.state.message}</div>
                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email"  className="form-control" placeholder="Enter email" onChange={this.emailInput}></input>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control"  placeholder="Password" onChange={this.passwordInput}></input>
                            </div>
                            <div className="form-group form-check">

                            </div>
                            <button type="submit" className="btn btn-primary form-control">Log in</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    }
}
export default Login;

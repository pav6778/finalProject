import React, { Component } from 'react'
import Nav from '../../components/nav/Nav'
import "../../components/container/style.css"
import API from '../../utils/API'



class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            message: "",
            alert: ""
        }
    }

    handleEmailChange = evt => {
        this.setState({ email: evt.target.value })
    }
    handlePasswordChange = evt => {
        this.setState({ password: evt.target.value })
    }
    handleSubmit = evt => {
        evt.preventDefault()
        if (this.state.email && this.state.password.length >= 6) {
            API.saveUsersInfo({
                email: this.state.email,
                password: this.state.password
            })
                .then(res => this.redirect())
                .catch(err => this.errorMessage())
        } else {
            this.setState({message: "Enter 6 character password", alert: "alert alert-danger"})
        }
    }

    redirect = () => {
        this.setState({message: "Success! Log in below.", alert: "alert alert-success"})
        this.props.history.push('/login', this.state)
        console.log(this.props.history)
    }
    errorMessage() {
            this.setState({ message: "This email is already registered", alert: "alert alert-danger" })
    }

    render() {

        return <div>
            <Nav/>
            <div className="row content">
                <div id="neuroMap" className="col-4">
                </div>
                <div id="login" className="col-8">
                    <div>
                        <div id="form">
                            <div className={this.state.alert} role="alert" onChange={this.errorMessage}>{this.state.message}</div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input onChange={this.handleEmailChange} value={this.state.email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input onChange={this.handlePasswordChange} value={this.state.password} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
                                </div>
                                <div className="form-group form-check">

                                </div>
                                <input type="submit" value="Register" className="btn btn-primary form-control"></input>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    }
}

export default Signup;

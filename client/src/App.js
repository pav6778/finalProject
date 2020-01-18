import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Layout from './pages/Layout'
import Canvas from './pages/Canvas'
import Login from './pages/Login'
import Signup from './pages/Signup'
import About from './pages/About'



class App extends Component {


  render(){
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" render={(props) => <Layout {...props} />}/>
          <Route exact path="/tool" render={(props) => <Canvas {...props} />}/>
          <Route exact path="/login" render={(props) => <Login {...props} />}/>
          <Route exact path="/signup" render={(props) => <Signup {...props} />}/>
          <Route exact path="/about" render={(props) => <About {...props} />}/>
          <h1 className="text-center mt-5 pt-5">
          <Route path="*" component={() => "404 PAGE NOT FOUND"}/>
          </h1>
        </Switch>
      </div>
    </Router>
  );
  }
}
export default App;

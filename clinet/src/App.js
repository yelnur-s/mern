import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from "react-redux";

import './App.css';
import  Navbar from './components/layout/Navbar';
import  Register from './components/auth/Register';
import  Login from './components/auth/Login';
import  Profile from './components/profile/Profile';
import setAuthToken from "./utils/setAuthToken";

import store from './store';
import ShowBlog from "./blog/ShowBlog";



setAuthToken();

class App extends Component {


  render() {
    return (
        <Provider store={store}>
            <Router>
              <div className="App">
                  <Navbar/>

                  <div className="main">
                      <Route exact path="/register" component={Register}/>
                      <Route exact path="/login" component={Login}/>
                      <Route exact path="/profile" component={Profile}/>

                      <Route exact path="/blog/:id" component={ShowBlog}/>

                  </div>

              </div>
            </Router>
        </Provider>
    );
  }
}

export default App;

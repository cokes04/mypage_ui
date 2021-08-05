import './App.css';
import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './page/Login';
import Main from './page/Main';
import AppHeader from './components/AppHeader';
import SignUp from './page/SignUp';
import { getToken, setDefaultHeader, removeToken } from './utils/Api';
import OAuth2RedirectHandler from './components/OAuth2RedirectHandler';
import EmailSignUp from './page/EmailSignUp';
import Notice from './page/Notice';
import MyNovel from './page/MyNovel';
import NovelList from './page/NovelList';
import Novel from './page/Novel';
import Search from './page/Search';

function App() {

  const [authenticated, setAuthenticated] = useState(false);  

  const authenticate = () => {
    setAuthenticated(true);
  }

  const logout = () => {
    setAuthenticated(false);
    removeToken();
  };

  useEffect(() => {
    setDefaultHeader();
  }, [])

  useEffect(() => {
    if( !getToken() )
      logout();
  })

  return (
    <Router>
      <div className="App">
        <AppHeader authenticated = {authenticated} handleLogout = {logout} />

        <div className='container'>
          <Switch>

            <Route path='/notice' component={Notice} exact/>
            <Route path='/best' component={Main} exact/>

            <Route  path={[     
                          '/paynovel/:type/:genre',
                          '/paynovel/:type',
                          '/paynovel',
                          '/freenovel/:type/:genre',
                          '/freenovel/:type',
                          '/freenovel',
                        ]} 
                    render={ ( props ) => <NovelList free={props.match.url.split('/')[1] === 'paynovel' ? 'Y' : 'N'}
                                                  type={props.match.params.type || 'all'}
                                                  genre={props.match.params.genre || 'all'}
                                                  {...props} 
                                          />} 
                    exact
             /> 

            <Route path='/mynovel' component={MyNovel} />
            <Route path='/search' render={ (props) => <Search keyword = {props.location.state.keyword} {...props}/> } />
            <Route path='/novel/{id}' render = {(props) => <Novel id = {props.match.params.id} />} exact/>
            <Route path='/login' render={ () => <Login authenticate = {authenticate} /> } exact />
            <Route path='/signup' component={SignUp} exact />
            <Route path='/signup/emailForm' component={EmailSignUp} exact/>
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler} />

            <Route path='/' component={Main} exact/>
            <Route component={Main} />
          </Switch>
          </div>
      </div>
    </Router>
  );
}


export default App;

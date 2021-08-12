import './App.css';
import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import AppHeader from './components/AppHeader';
import SignUpPage from './pages/SignUpPage';
import { getToken, setDefaultHeader, removeToken } from './utils/Api';
import OAuth2RedirectHandler from './components/OAuth2RedirectHandler';
import EmailSignUpPage from './pages/EmailSignUpPage';
import NoticePage from './pages/NoticePage';
import MyNovelPage from './pages/MyNovelPage';
import NovelListPage from './pages/NovelListPage';
import NovelPage from './pages/NovelPage';
import SearchPage from './pages/SearchPage';
import MyCreationPage from './pages/MyCreationPage';
import MainMenu from './components/MainMenu';
import NovelRegisterPage from './pages/NovelRegisterPage';

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
    else
      authenticate();
  })

  return (
    <Router>
      <div className="App">
        <AppHeader authenticated = {authenticated} handleLogout = {logout} />
        <MainMenu />
        <div className='container'>
          <Switch>

            <Route path='/notice' component={NoticePage} exact/>
            <Route path='/best' component={MainPage} exact/>

            <Route  path={[     
                          '/paynovel/:type/:genre',
                          '/paynovel/:type',
                          '/paynovel',
                          '/freenovel/:type/:genre',
                          '/freenovel/:type',
                          '/freenovel',
                        ]} 
                    render={ ( props ) => <NovelListPage free={props.match.url.split('/')[1] === 'paynovel' ? 'Y' : 'N'}
                                                  type={props.match.params.type || 'all'}
                                                  genre={props.match.params.genre || 'all'}
                                                  {...props} 
                                          />} 
                    exact
             /> 

            <Route path='/mynovel' component={MyNovelPage} />
            <Route path='/search' render={ (props) => <SearchPage keyword = {new URLSearchParams(props.location.search).get('keyword')} {...props}/> } />
            <Route path='/novel/:id' render = {(props) => <NovelPage id = {props.match.params.id} {...props} />} />
            
            <Route path='/my_creation/write/:novel_id' component={MyCreationPage}  exact/>
            <Route path='/my_creation/manage/:novel_id' component={MyCreationPage} exact/>
            <Route path='/my_creation/register' component={NovelRegisterPage} exact/>
            <Route path='/my_creation' component={MyCreationPage} />


            <Route path='/login' render={ () => <LoginPage authenticate = {authenticate} /> } exact />
            <Route path='/signup' component={SignUpPage} exact />
            <Route path='/signup/emailForm' component={EmailSignUpPage} exact/>
            <Route path="/oauth2/redirect" component = {OAuth2RedirectHandler} />
                  
            <Route path='/' component={MainPage} exact/>
            <Route component={MainPage} />
          </Switch>
          </div>
      </div>
    </Router>
  );
}


export default App;

import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from './pages/MainPage';
import AppHeader from './components/AppHeader';
import SignPage from './pages/SignPage';
import OAuth2RedirectHandler from './components/OAuth2RedirectHandler';
import EmailJoinPage from './pages/EmailJoinPage';
import NoticePage from './pages/NoticePage';
import MyNovelPage from './pages/MyNovelPage';
import NovelListPage from './pages/NovelListPage';
import NovelPage from './pages/NovelPage';
import SearchPage from './pages/SearchPage';
import MyCreationPage from './pages/MyCreationPage';
import MainMenu from './components/MainMenu';
import NovelManagePage from './pages/NovelManagePage';
import EpisodeRegisterPage from './pages/EpisodeRegisterPage';
import NovelRegisterPage from './pages/NovelRegisterPage';
import MyInfoPage from './pages/MyInfoPage';
import EpisodePage from './pages/EpisodePage';
import EpisodeModifyPage from './pages/EpisodeModifyPage';
import TicketChargePage from './pages/TicketChargePage';
import CashChargePage from './pages/CashChargePage';
import KakaoPayRedirectHandler from './components/KakaoPayRedirectHandler';
import PrivateRoute from './components/PrivateRoute';
import { isExistRefreshToken, setAuth, unAuth, } from './utils/AuthUtil';
import FindPasswordPage from './pages/FindPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AuthorPage from './pages/AuthorPage';
import UsageHistoryPage from './pages/UsageHistoryPage';
import PayApplyPage from './pages/PayApplyPage';
import SettlementPage from './pages/SettlementPage';
import TicketChargeResultPage from './pages/TicketChargeResultPage';
import {ACCESS_TOKEN_NAME} from "./utils/AuthUtil";
import VerifyEmailHandler from './components/VerifyEmailHandler';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import PublicRoute from './components/PublicRoute';
import ChangePasswordPage from './pages/ChangePasswordPage';

function App() {
       const [authenticated, setAuthenticated] = useState(false);

       const authenticate = (accessToken) => {
              setAuthenticated(true)
              setAuth(accessToken)
       }

       const unAuthenticate = () => {
              setAuthenticated(false)
              unAuth()
       }

       useEffect( () => {
              if (isExistRefreshToken()) {
                     setAuthenticated(true)
              } else{
                     setAuthenticated(false)
              }
       }, [])

       return (
              <div className="App">
                     <Router>
                            <Switch>
                                   <PrivateRoute authenticated={authenticated}
                                                 path="/kakaopay/redirect/:result"
                                                 render={(props) => <KakaoPayRedirectHandler pg_token={new URLSearchParams(props.location.search).get('pg_token')}
                                                 result={props.match.params.result}
                                                 {...props} />}
                                                 exact />

                                   <Route path="/oauth2/redirect"
                                                 render={(props) => <OAuth2RedirectHandler authenticate={authenticate}
                                                 result={new URLSearchParams(props.location.search).get("result")}
                                                 code={new URLSearchParams(props.location.search).get("code")}
                                                 message={new URLSearchParams(props.location.search).get("message")}
                                                 accessToken={new URLSearchParams(props.location.search).get(ACCESS_TOKEN_NAME)}
                                                 {...props} />}
                                                 exact />   
                                   

                                   <Route>
                                          <AppHeader    authenticated={authenticated}
                                                        unAuthenticate={unAuthenticate} />
                                          <MainMenu />

                                          <div className='container'>
                                                 <Route path={[
                                                        '/paynovel/:type/:genre',
                                                        '/paynovel/:type',
                                                        '/paynovel',
                                                        '/freenovel/:type/:genre',
                                                        '/freenovel/:type',
                                                        '/freenovel',
                                                        '/allnovel/:type/:genre',
                                                        '/allnovel/:type',
                                                        '/allnovel'
                                                 ]}
                                                        render={(props) => <NovelListPage payment={props.match.url.split('/')[1] === 'paynovel' ? 'pay' :(props.match.url.split('/')[1] === 'freenovel' ? 'free' : "all") }
                                                               type={props.match.params.type || 'all'}
                                                               genre={props.match.params.genre || 'all'}
                                                               ageGroup={'all'}
                                                               {...props}
                                                        />}
                                                        exact />

                                                 <Route path='/episode/:episode_id'
                                                        render={(props) => <EpisodePage episodeId={props.match.params.episode_id} {...props} />} />

                                                 <Route path='/search'
                                                        render={(props) => <SearchPage keyword={new URLSearchParams(props.location.search).get('keyword')} {...props} />} />

                                                 <Route path='/novel/:novel_id'
                                                        render={(props) => <NovelPage novelId={props.match.params.novel_id} authenticated={authenticated} {...props} />} />

                                                 <PrivateRoute path='/mynovel'
                                                        render={(props) => <MyNovelPage  {...props} />}
                                                 />


                                                 <PrivateRoute path='/my_info'
                                                        render={(props) => <MyInfoPage unAuthenticate = {unAuthenticate} {...props} />}
                                                        exact
                                                 />

                                                 <Route path='/author/:author_id'
                                                        render={(props) => <AuthorPage id={props.match.params.author_id} {...props} />} />

                                                 <PrivateRoute path='/ticket/charge'
                                                        render={(props) => <TicketChargePage novelId={new URLSearchParams(props.location.search).get('novelId')}
                                                                                             episodeId={new URLSearchParams(props.location.search).get('episodeId')}
                                                                                             authenticated={authenticated} {...props} />}
                                                        exact />
                                                 <PrivateRoute path='/ticket/charge/result'
                                                        render={(props) => <TicketChargeResultPage />}
                                                        exact />

                                                 <PrivateRoute path='/cash/charge'
                                                        render={(props) => <CashChargePage {...props} />}
                                                        exact />
                                                 <PrivateRoute path='/usage-history'
                                                        render={(props) => <UsageHistoryPage {...props} />}
                                                        exact />

                                                 <Route path='/my_creation/novel/:novel_id/episode/:episode_id/modify'
                                                        render={(props) => <EpisodeModifyPage novelId={props.match.params.novel_id}
                                                               episodeId={props.match.params.episode_id} {...props} />}
                                                        exact />
                                                 <Route path='/my_creation/write/:novel_id'
                                                        render={(props) => <EpisodeRegisterPage novelId={props.match.params.novel_id} {...props} />}
                                                        exact />
                                                 <Route path='/my_creation/manage/:novel_id'
                                                        render={(props) => <NovelManagePage id={props.match.params.novel_id} {...props} />}
                                                        exact />
                                                 <Route path='/my_creation/pay_apply/:novel_id'
                                                        render={(props) => <PayApplyPage novelId={props.match.params.novel_id} {...props} />}
                                                        exact />                                         
                                                 <PrivateRoute path='/my_creation/register'
                                                        component={NovelRegisterPage}
                                                        exact />

                                                 <PrivateRoute path='/my_creation/settlement'
                                                        component={SettlementPage}
                                                        exact />

                                                 <PrivateRoute path='/my_creation'
                                                        render={(props) => <MyCreationPage {...props} />} 
                                                        exact />


                                                 <PublicRoute path='/sign'
                                                        render={(props) => <SignPage authenticate={authenticate} {...props} />}
                                                        exact />

                                                 <PublicRoute path='/signup/emailForm'
                                                        component={EmailJoinPage}
                                                        exact />
                                                 <PrivateRoute path='/change/password' 
                                                        render={(props) => <ChangePasswordPage {...props} />}
                                                        exact />

                                                 <PublicRoute path='/find/password' 
                                                        render={(props) => <FindPasswordPage {...props} />}
                                                        exact />

                                                 <Route path='/reset/password' 
                                                        render={(props) => <ResetPasswordPage 
                                                               resetKey={new URLSearchParams(props.location.search).get('key')}
                                                               userId={new URLSearchParams(props.location.search).get('userId')}
                                                               {...props} />}
                                                        exact />

                                                 <Route path='/verify/email' 
                                                        render={(props) => <VerifyEmailHandler
                                                               verifyKey={new URLSearchParams(props.location.search).get('key')}
                                                               userId={new URLSearchParams(props.location.search).get('userId')}
                                                               {...props} />}
                                                        exact />

                                                 <Route path='/'
                                                        component = { (props) =>  <Redirect to={{
                                                               pathname: '/allnovel',
                                                           }}/> }
                                                        exact />

                                                 <Route component={MainPage} />
                                          </div>

                                   </Route>
                            </Switch>
                     </Router>
              </div>

       );
}


export default App;

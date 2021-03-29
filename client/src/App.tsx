import React from 'react';
import './App.css';
import Layout from './components/Layout';

import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Connection from './pages/connection';
import Disconnection from './pages/disconnect';
import Menu from './pages/menu';
import Game from './pages/game';
import Profile from './pages/profile';


function App() {

  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/">
          
            </Route>
            <Route path="/connect">
              <Connection/>
            </Route>
            <Route path="/disconnect">
              <Disconnection/>
            </Route>
            <Route path="/menu">
              <Menu/>
            </Route>
            <Route path="/profile">
              <Profile/>
            </Route>
            <Route path="/exercice/1">
              <Game id={1} difficulty={1}/>
            </Route>
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
    
  );
}

export default App;

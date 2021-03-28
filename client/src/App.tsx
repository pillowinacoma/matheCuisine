import React from 'react';
import './App.css';
import Layout from './components/Layout';

import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Connection from './pages/connection';
import Disconnection from './pages/disconnect';


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
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
    
  );
}

export default App;

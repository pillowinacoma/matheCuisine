import React from 'react';
import './App.css';
import Layout from './components/Layout';

import { Route, Switch, BrowserRouter } from 'react-router-dom';


function App() {

  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/">

            </Route>
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
    
  );
}

export default App;

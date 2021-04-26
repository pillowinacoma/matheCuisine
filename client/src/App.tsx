import React from "react";
import "./App.css";
import Layout from "./components/Layout";

import { Route, Switch, BrowserRouter } from "react-router-dom";
import Connection from "./pages/connection";
import Disconnection from "./pages/disconnect";
import Menu from "./pages/menu";
import Game from "./pages/game";
import Profile from "./pages/profile";
import Exercice from "./pages/exercices/exercice";
import Clock from "./pages/components/clock";

function App() {
    var json1 = require("./locales/exercices/difficulty_1.json");
    var json2 = require("./locales/exercices/difficulty_2.json");
    var json3 = require("./locales/exercices/difficulty_3.json");

    return (
        <div>
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route exact path="/"></Route>
                        <Route path="/connect">
                            <Connection />
                        </Route>
                        <Route path="/disconnect">
                            <Disconnection />
                        </Route>
                        <Route path="/menu">
                            <Menu />
                        </Route>
                        <Route path="/profile">
                            <Profile />
                        </Route>
                        <Route path="/exercice/1">
                            <Game id={1} difficulty={1} />
                        </Route>
                        {Object.entries(json1).map((element) => {
                            let key = element[0];
                            let value = element[1];
                            let path = "/difficulty-1/" + key;
                            return (
                                <Route path={path}>
                                    <Exercice difficulty={1} ex={key} />
                                </Route>
                            );
                        })}
                        {Object.entries(json2).map((element) => {
                            let key = element[0];
                            let value = element[1];
                            let path = "/difficulty-2/" + key;
                            return (
                                <Route path={path}>
                                    <Exercice difficulty={2} ex={key} />
                                </Route>
                            );
                        })}
                        {Object.entries(json3).map((element) => {
                            let key = element[0];
                            let value = element[1];
                            let path = "/difficulty-3/" + key;
                            return (
                                <Route path={path}>
                                    <Exercice difficulty={3} ex={key} />
                                </Route>
                            );
                        })}
                    </Switch>
                </Layout>
            </BrowserRouter>
        </div>
    );
}

export default App;

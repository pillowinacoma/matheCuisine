import * as React from 'react';
import { LangContext } from '../engine/translation/i18n';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
    page: {
        backgroundColor: "rgba(251, 238, 230, 0.85)",
        position: "relative",
        marginTop: 100,
        margin: "auto",
        width: "680px",
        padding: 10,
        "& *": {
            backgroundColor: "unset" 
        }
    },
}));

const Trainnings = () => {

    var json1 = require('../locales/trainnings/difficulty_1.json');
    var json2 = require('../locales/trainnings/difficulty_2.json');
    var json3 = require('../locales/trainnings/difficulty_3.json');

    const {translate} = React.useContext(LangContext);

    const classes = useStyle();

    return (
        <div className={classes.page}>
            <h1>Exercices d'entrainement</h1>
            <p>Tous les exercices d'entrainement présent ici sont sous forme de qcm ou encore sous un format des plus claire possible. </p>
            <p>Cela afin de ce concentrer sur les notions que l'on souhaite apprendre.</p>
            <table>
                <thead>
                    <tr>
                        <th><h2>{translate("easy")}</h2></th>
                    </tr>
                </thead>
                <tbody>
                {    
                    Object.entries(json1).map((element: any) => {
                        let key = element[0];
                        console.log(json1[key].notions)
                        return (
                            <tr>
                                <th><Link to={"trainning/difficulty-1/"+key}>{key}</Link></th>
                                <th>
                                { 
                                    Object.entries<string>(json1[key].notions).map((notion) => {
                                        let not: string = notion[1];
                                        return (
                                            <span>{not} </span>
                                        );
                                    })
                                } 
                                </th>
                            </tr>
                        );
                    
                    })
                 }
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <th><h2>{translate("medium")}</h2></th>
                    </tr>
                </thead>
                <tbody>
                {    
                    Object.entries(json2).map((element) => {
                        let key = element[0];
                        return (
                            <tr>
                                <th><Link to={"trainning/difficulty-2/"+key}>{key}</Link></th>
                                <th>
                                {
                                    Object.entries<string>(json2[key].notions).map((notion) => {
                                        let not: string = notion[1];
                                        return (
                                            <span>{not} </span>
                                        );
                                    })
                                } 
                                </th>
                            </tr>
   
                        );
                    
                    })
                 }
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <th><h2>{translate("hard")}</h2></th>
                    </tr>
                </thead>
                <tbody>
                {    
                    Object.entries(json3).map((element) => {
                        let key = element[0];
                        return (
                            <tr>
                                <th><Link to={"trainning/difficulty-3/"+key}>{key}</Link></th>
                                <th>
                                {
                                    Object.entries<string>(json3[key].notions).map((notion) => {
                                        let not: string = notion[1];
                                        return (
                                            <span>{not} </span>
                                        );
                                    })
                                } 
                                </th>
                            </tr>
   
                        );
                    
                    })
                 }
                </tbody>
            </table>
        </div>
    );

}

export default Trainnings;
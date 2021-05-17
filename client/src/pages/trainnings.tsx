import * as React from 'react';
import { LangContext } from '../engine/translation/i18n';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
    page: {

        position: "relative",
        marginTop: 100,
        marginBottom: 100,
        margin: "auto",
        width: "860px",
        padding: 30,
        borderRadius: 10,
        "& *": {
            backgroundColor: "unset" 
        },

    },
    glass: {
        width: "100%",
        left: -5,
        zIndex: -90,
        "box-shadow": "inset 0 0 2000px rgba(255, 255, 255, .5)",
        position: "absolute",
        backgroundColor: "rgba(251, 238, 230, 0.65)",
        height: "100%",
        "filter": "blur(1px)"
    },
    table: {
        width: "100%",
        justifyContent: "start",
        "& thead": {
            width: "100%"
        },
        "border-collapse": "collapse"
    },
    Cell: {
        width: "50%",
        textAlign: "start"
    },
    Row: {
        borderBottom: "2px solid dimgray"
    }
}));

const Trainnings = () => {

    var json1 = require('../locales/trainnings/difficulty_1.json');
    var json2 = require('../locales/trainnings/difficulty_2.json');
    var json3 = require('../locales/trainnings/difficulty_3.json');

    const {translate} = React.useContext(LangContext);

    const classes = useStyle();

    return (
        <div className={classes.page}>
            <div className={classes.glass}></div>
            <h1>Exercices d'entrainement</h1>
            <p>Tous les exercices d'entrainement présent ici sont sous forme de qcm ou encore sous un format des plus claire possible. </p>
            <p>Cela afin de ce concentrer sur les notions que l'on souhaite apprendre.</p>
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th colSpan={2}><h2>{translate("easy")}</h2></th>
                    </tr>
                </thead>
                <tbody>
                {    
                    Object.entries(json1).map((element: any) => {
                        let key = element[0];
                        console.log(json1[key].notions)
                        return (
                            <tr className={classes.Row}>
                                <th className={classes.Cell}><Link to={"trainning/difficulty-1/"+key}>{key}</Link></th>
                                <th className={classes.Cell}>
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

            <table className={classes.table}>
                <thead >
                    <tr>
                        <th colSpan={2}><h2>{translate("medium")}</h2></th>
                    </tr>
                </thead>
                <tbody>
                {    
                    Object.entries(json2).map((element) => {
                        let key = element[0];
                        return (
                            <tr className={classes.Row}>
                                <th className={classes.Cell}><Link to={"trainning/difficulty-2/"+key}>{key}</Link></th>
                                <th className={classes.Cell}>
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

            <table className={classes.table}>
                <thead>
                    <tr>
                        <th colSpan={2}><h2>{translate("hard")}</h2></th>
                    </tr>
                </thead>
                <tbody>
                {    
                    Object.entries(json3).map((element) => {
                        let key = element[0];
                        return (
                            <tr className={classes.Row}>
                                <th  className={classes.Cell}><Link to={"trainning/difficulty-3/"+key}>{key}</Link></th>
                                <th className={classes.Cell}>
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
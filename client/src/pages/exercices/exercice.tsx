import * as React from 'react';
import Type1 from './type1';
import Type2 from './type2';
import classes from '*.module.css';
import { makeStyles } from '@material-ui/core';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import CancelIcon from '@material-ui/icons/Cancel';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';

const type = [
    Type1,
    Type2
];

const useStyle = makeStyles((theme) => ({
    gameBox: {
        height: '100vh'
    },
    hourGlass: {
        fontSize: "20px",
        color: "yellow"
    },
    indice: {
        fontSize: "20px",
        color: "red"
    },
    cancel: {
        fontSize: "20px",
        color: "blue"
    }
}));

const Exercice = (props: {difficulty: number, ex: string}) => {
    const classes = useStyle();
    var json = require ('../../locales/exercices/difficulty_'+props.difficulty+'.json');

    let Type = type[json[props.ex].type]





    return (
        <div className={classes.gameBox}>
            <EmojiObjectsIcon className={classes.indice}/>
            <CancelIcon className={classes.cancel}/>
            <HourglassEmptyIcon className={classes.hourGlass}/>
            <Type params={json[props.ex]}/>
        </div>
    );

}

export default Exercice;
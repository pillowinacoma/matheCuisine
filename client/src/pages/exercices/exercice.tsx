import * as React from 'react';
import Type1 from './type1';
import Type2 from './type2';
import classes from '*.module.css';
import { makeStyles } from '@material-ui/core';

const type = [
    Type1,
    Type2
];

const useStyle = makeStyles((theme) => ({
    gameBox: {
        height: '100vh'
    }
}));

const Exercice = (props: {difficulty: number, ex: string}) => {
    const classes = useStyle();
    var json = require ('../../locales/exercices/difficulty_'+props.difficulty+'.json');

    let Type = type[json[props.ex].type]

    return (
        <div className={classes.gameBox}>
            <Type params={json[props.ex]}/>
        </div>
    );

}

export default Exercice;
import * as React from 'react';
import Type1 from './type1';
import Type2 from './type2';
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



    generator(json[props.ex]);

    return (
        <div className={classes.gameBox}>
            <EmojiObjectsIcon className={classes.indice}/>
            <CancelIcon className={classes.cancel}/>
            <HourglassEmptyIcon className={classes.hourGlass}/>
            <Type params={json[props.ex]}/>
        </div>
    );

}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

const generator = (detail: any) => {

    const vars: Array<number> = detail.vars;
    var coefResponse = detail.coef;
    var eq = 0;
    var result = detail.result;
    var generateVar: Array<number> = [];

    var restart = false;
    while(restart) {
        generateVar = [];
        for(let i = 0; i < vars.length; i++) {
            var x = Math.floor(getRandomInt(result));
            generateVar.push(x);
            eq += vars[i] * generateVar[i] ;
        }

        
        if(detail.decimal === "yes") {
            if(((result - eq) % coefResponse) !== 0) {
                restart = true;
            }
        }
        console.log("eq : "+vars[0]*generateVar[0]+" + "+vars[1]*generateVar[1]+" + "+vars[2]*generateVar[2]+" + "+coefResponse+" * x = "+(vars[0]*generateVar[0]+vars[1]*generateVar[1]+vars[2]*generateVar[2])+" + "+coefResponse+" * x = "+detail.result)
    }


    console.log("eq : "+vars[0]*generateVar[0]+" + "+vars[1]*generateVar[1]+" + "+vars[2]*generateVar[2]+" + "+coefResponse+" * x = "+(vars[0]*generateVar[0]+vars[1]*generateVar[1]+vars[2]*generateVar[2])+" + "+coefResponse+" * x = "+detail.result)

}

export default Exercice;
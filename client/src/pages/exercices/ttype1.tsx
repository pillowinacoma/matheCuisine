import * as React from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import { Equation } from '../components/lesson';
import { isOp } from './exercice';
import { isNumber } from 'util';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({

    equation: {

    }

}));

const TType1 = (props: {params: any, gen: any}) : JSX.Element => {

    const classes = useStyle();

    var  [rpn, resultat, solveur] = props.gen();



    var equation = false;
    if(rpn != undefined)
        rpn.array?.forEach((element: any) => {
            if(element === "r") equation = true;
        });

    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    var letter = alphabet[Math.floor(Math.random() * alphabet.length)]

    var eq = translationRpn(rpn, letter);

    console.log(eq);
    console.log(resultat);

    return (
        <div>
            <h2>Résoudre {equation ? " l'équation à un inconnue suivante.": "le calcule suivant"}</h2>
            
            <p className={classes.equation}>{eq} = {equation ? props.params.result : "?"}</p>

        </div>
    );

}

export default TType1;

const translationRpn = (rpn: any [], letter: string) => {

    var tempVar = [];
    var tempOp  = [];
    var tempStr: string = "";

    for(let i = 0; i < rpn.length ; i++) {

        if(isOp(rpn[i])) {
            if(tempStr.length === 0)
            {
                var b = tempVar.pop();
                var a = tempVar.pop();
                tempStr = a + " " + rpn[i] + " " + b;
            } else {
                if(i + 1 < rpn.length &&  isNumber(rpn[i + 1])) {
                    tempStr = " ( " + tempStr + " ) " + rpn[i] + " " + tempVar.pop();
                } else {
                    tempStr = tempStr + " " +  rpn[i] + " " + tempVar.pop();
                }
            }
        } else if(rpn[i] === "r"){
            tempVar.push(letter);
        } else {
            tempVar.push(rpn[i]);
        }
       // console.log(translation);
      //  console.log(i)
    }


    return tempStr;

}
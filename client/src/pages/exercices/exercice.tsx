import * as React from 'react';
import Type1 from './type1';
import Type2 from './type2';
import { makeStyles } from '@material-ui/core';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import CancelIcon from '@material-ui/icons/Cancel';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import Type3 from './type3';
import { isNumber } from 'util';

const type = [
    Type1,
    Type2,
    Type3
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



    var rpn = generator(json[props.ex], props.difficulty);

    var [correct, resultat] = solveur(rpn, json[props.ex].result, 100);


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

function selectOp(notions: Array<string>) {
    let randOp = Math.floor(getRandomInt(10));
    let choose = notions[randOp % (notions.length)];

    switch(choose) {
        case 'addition':
            return '+';
        case 'multiplication':
            return '*';
        case 'division':
            return '/';
        case 'soustraction':
            return '-';
        default:
            return '+';
    }

}

const generator = (detail: any, difficulty: number) => {

    const vars: Array<any> = detail.vars;
    var coefResponse = detail.coef;

    var result = detail.result;
    var generateVar: Array<any> = [];
    var rpn = [];
    var rpnTmpOp = [];

    var acceptBrackets = false;
    var openBrackets = 0;

    var alreadyPlaceVar = false;

    if(difficulty > 2) {
        acceptBrackets = true;
    }

    var restart = true;
    while(restart) {
        restart = false;
        generateVar = [];
        rpn = [];
        rpnTmpOp = [];


        for(let i = 0; i < vars.length; i++) {

            if(vars[i] === "r") {
                alreadyPlaceVar = true;
                generateVar.push( 'r' );
            } else {
                let x = getRandomInt(result);
                generateVar.push( vars[i] * x );
            }

            if(i > 0) {
                let op = selectOp(detail.notions);
                switch(op) {
                    case '*':
                        for(const [key, value] of Object.entries(generateVar)) {
                            rpn.push(value);
                        }
                        for(const [key, value] of Object.entries(rpnTmpOp)) {
                            rpn.push(value);
                        }
                        generateVar = [];
                        rpnTmpOp = [];
                        rpn.push('*');
                        break;
                    case '/':
                        for(const [key, value] of Object.entries(generateVar)) {
                            rpn.push(value);
                        }
                        for(const [key, value] of Object.entries(rpnTmpOp)) {
                            rpn.push(value);
                        }
                        generateVar = [];
                        rpnTmpOp = [];
                        rpn.push('/');
                        break;
                    default:
                        rpnTmpOp.push(op);
                        break;
                }
            }
            if(acceptBrackets) {
                let rand = Math.floor(Math.random() * 10);
                if(rand >= 9 - 1*difficulty) {
                    openBrackets++;
                }
            }

            if(openBrackets > 0) {
                let rand = Math.floor(Math.random() * 10);
                if(rand >= 5) {
                    openBrackets--;
                    for(const [key, value] of Object.entries(generateVar)) {
                        rpn.push(value);
                    }
                    for(const [key, value] of Object.entries(rpnTmpOp)) {
                        rpn.push(value);
                    }
                    generateVar = [];
                    rpnTmpOp = [];
                }
            }
        }
        
        if(generateVar.length != 0) {
            for(const [key, value] of Object.entries(generateVar)) {
                rpn.push(value);
            }
            if(rpnTmpOp.length == 0){ 
                restart = true;
            } else {
                for(const [key, value] of Object.entries(rpnTmpOp)) {
                    rpn.push(value);
                }
            }
        }

        if(detail.decimal === "yes") {

        }

        if(detail.acceptNegatif === "no") {
            
        }

    }

    return rpn;

}

const isOp = (elem: any) => {

    switch(elem) {
        case '+':
            return true;
        case '-':
            return true;
        case '*':
            return true;
        case '/':
            return true;
        default:
            return false;
    }

}
const calc = (a: number, b: number, op: any) => {
    switch(op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        default:
            throw ("je ne connais pas cette opérateur");
    }
}

const solveur = (rpn: any[], result: number, reponse: number) => {

    var tempVar = [];
    var tmpOp = [];
    var tmpResult = result;

    var tmpRpn = [];

    var searchVar = false;

  /*  for(let i = 0; i < rpn.length; i++) {
        if(rpn[i] == "*" || rpn[i] == "/") {
            tmpOpP.push(i);
        }
    }*/

    for(let i = 0; i < rpn.length; i++) {

        if(isNumber(rpn[i]) ||rpn[i] == "r" ) {
            tempVar.push(rpn[i]);
        }

        if(isOp(rpn[i]) && tempVar.length > 1) {
            if(!(tempVar[0] == "r") && !(tempVar[1] == "r")) {
                tempVar.reverse();
                let a = tempVar.pop();
                let b = tempVar.pop();
                let c = calc(a,b, rpn[i]);
                tempVar.push(c);
                tempVar.reverse();
            } else {
                searchVar = true;
                tempVar.forEach((elem) => {tmpRpn.push(elem)});
                for(let j = i; j < rpn.length; j++) {
                    tmpRpn.push(rpn[j]);
                }
                i = 999;
            }
           
        }

    }

    if(searchVar) {
        for(let i = tmpRpn.length - 1; i >= 0; i--) {
            if(isOp(tmpRpn[i])) {
                tmpOp.push(tmpRpn[i]);
                tmpRpn.pop();
            }

            if(isNumber(tmpRpn[i])) {
                tmpOp.reverse();
                let a = tmpRpn.pop();
                switch(tmpOp.pop()) {
                    case "+":
                        tmpResult = calc(tmpResult, a, "-");
                        break;
                    case "-":
                        tmpResult = calc(tmpResult, a, "+");
                        break;
                    case "*":
                        tmpResult = calc(tmpResult, a, "/");
                        break;
                    case "/":
                        tmpResult = calc(tmpResult, a, "*");
                        break;
                    default:
                        throw ("Je ne connais pas cette opérateur");
                }
                tmpOp.reverse();
            }

            if(tmpRpn[i] == "r") {

                switch(tmpOp[0]) {
                    case '+':
                        tmpResult = calc(tmpResult, tmpRpn[i - 1], "-");
                        break;
                    case '-':
                        tmpResult = calc(tmpResult, tmpRpn[i - 1], "-");
                        tmpResult = -tmpResult;
                        break;
                    case '*':
                        tmpResult = calc(tmpResult, tmpRpn[i - 1], "/");
                        break;
                    case '/':
                        tmpResult = calc(tmpResult, tmpRpn[i - 1], "*");
                        break;
                }

                i = -1;
            }
        }


    }

    return [reponse == tmpResult, searchVar ? tmpResult : tempVar[0]];

}

export default Exercice;
import * as React from 'react';
import Type1 from './type1';
import Type2 from './type2';
import Type3 from './type1';
import TType1 from './ttype1';
import TType2 from './ttype2';
import TType3 from './ttype3';
import recette from '../../locales/recettes.json';
import { makeStyles } from '@material-ui/core';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import CancelIcon from '@material-ui/icons/Cancel';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { isNumber } from 'util';

const type = [
    Type1,
    Type2,
    Type3
];

const trtype = [
    TType1,
    TType2,
    TType3
];

const useStyle = makeStyles((theme) => ({
    gameBox: {
        height: "100vh",
        position: "relative"
    },
    hourGlass: {
        fontSize: "40px",
        marginLeft: "calc(50% - 20px)",
        marginTop: 10,
        color: "#154360",
    },
    indice: {
        marginLeft: "calc(50% - 20px)",
        fontSize: "40px",
        marginTop: 10,
        color: "#F1C40F",
    },
    cancel: {
        marginLeft: "calc(50% - 20px)",
        marginTop: 10,
        fontSize: "40px",
        color: "#CB4335",
    },
    exHeader: {
        position: "relative",
        display: "flex",
        width: 500,
        marginLeft: "calc(50% - 250px)",
        "& div": {
            margin: "auto",
            marginTop: 25,
            marginBottom: 25,
            width: 150,
            height: 100,
            border: "2px solid dimgray",
            borderRadius: 10,
            "& p": {
                width: "50%",
                fontSize: 20,
                margin: 0,
                marginLeft: "25%",
                marginRight: "25%",
                textAlign: "center"
            }
        }
    },
    reussite: {
        position: "relative",
        duisplay: "block",
        width: "50%",
        marginLeft: "25%",
        marginRight: "25%",
        textAlign: "center",
        border: "5px solid #58D68D ",
        borderRadius: 15,
    },
    satisfiedIcon: {
        fontSize: 60,
        width: "100%",
        color: "#58D68D"
    }
}));


const Timer = (props:{finish: boolean}) => {
    const [time, setTime] = React.useState(0.00);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            if(!props.finish)
                setTime(time + 0.01);
        }, 10)

        return () => clearTimeout(timer);
    },[time]) 

    return (<p>{time.toFixed(2)}</p>);

}


const Exercice = (props: {difficulty: number, ex: string, trainning?: boolean}) => {
    const classes = useStyle();
    var json: any;

    const [finish, setFinish] = React.useState(false);

    const [nbError, setNbError] = React.useState(0);
    const [nbIndice, setNbIndice] = React.useState(0);

    if(!props.trainning) 
        json = require ('../../locales/exercices/difficulty_'+props.difficulty+'.json');
    else 
        json = require ('../../locales/trainnings/difficulty_'+props.difficulty+'.json');


    let Type: any;

    if(!props.trainning) {
        Type = type[json[props.ex].type]
    } else {
        Type = trtype[json[props.ex].type % 10]
    }

    /**
     * L'ajout du generateur en amont, si l'on utilise un type non définini dans le switch il faudra ajouter le générateur directement dans le composant.
     * Les parametre de l'exercice sont automatique passé en paramètre.
     */
    var gen = () => {};
    var solve;
    switch(json[props.ex].type % 10) { 
        case 0: //equation et calcule simple avec mini jeux et qcm  
            gen = () => {
     
                var {rpn, r} = generator(json[props.ex], props.difficulty);
                var rpnG = rpn;
                var rG: number = r;
                var [correct, resultat] = solveur(
                    rpnG,
                    rG
                );
             
                return [rpn, rG, resultat];
            };
            solve = solveur;
            break;
        case 1: // jeux et qcm avec temps
            gen = () => {
                var {startTime, values} = generateurTime();

                return [startTime, values];
            };
            solve = solveurTime;
            break;
        case 2: // convertion avec mini jeux
            gen = () => {

            };

            break;
        case 3: // convertion en qcm
            gen = () => {};
            break;
        default:
            gen = () => {};
            break;
    }






    return (
        <div className={classes.gameBox}>
            <div className={classes.exHeader}>
                <div>
                    <EmojiObjectsIcon className={classes.indice}/>
                    <p>{nbIndice}</p>
                </div>
                <div>
                    <CancelIcon className={classes.cancel} />
                    <p>{nbError}</p>
                </div>
                <div>
                    <HourglassEmptyIcon className={classes.hourGlass} />
                    <Timer finish={finish}/>
                </div>
            </div>

            {finish ? <div className={classes.reussite}><SentimentVerySatisfiedIcon className={classes.satisfiedIcon}/> Vous avez trouvé la bonne réponse !</div> : ""}

            <Type params={json[props.ex]} gen={gen} setFinish={setFinish} nbError={nbError} setNbError={setNbError} solveur={solve}/>
        </div>
    );
};


function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

function selectOp(notions: Array<string>) {
    let randOp = Math.floor(getRandomInt(10));
    let choose = notions[randOp % notions.length];

    switch (choose) {
        case "addition":
            return "+";
        case "multiplication":
            return "*";
        case "division":
            return "/";
        case "soustraction":
            return "-";
        default:
            return "+";
    }
}

const generator = (detail: any, difficulty: number) => {
    const vars: Array<any> = detail.vars;

    var maxRand = detail.maxRand;
    var generateVar: Array<any> = [];
    var rpn: any[] = [];
    var rpnTmpOp = [];

    var acceptBrackets = false;
    var openBrackets = 0;

    if (difficulty > 2) {
        acceptBrackets = true;
    }

    var restart = true;

    var r = parseFloat((Math.random() * (maxRand + 50)).toFixed(detail.acceptFloat ? 3 : 0));

    while (restart) {
        restart = false;
        generateVar = [];
        rpn = [];
        rpnTmpOp = [];

        for (let i = 0; i < vars.length; i++) {
            if (vars[i] === "r") {   
                generateVar.push("r");
            } else {
                let x = 1;
                if (detail.random) {
                    x = getRandomInt(maxRand);
                }

                generateVar.push(vars[i] * x);
            }

            if (i > 0) {
                let op = selectOp(detail.notions);
                switch (op) {
                    case "*":
                        // eslint-disable-next-line
                        for (const [key, value] of Object.entries(
                            generateVar
                        )) {
                            rpn.push(value);
                        }
                        // eslint-disable-next-line
                        for (const [key, value] of Object.entries(rpnTmpOp)) {
                            rpn.push(value);
                        }
                        generateVar = [];
                        rpnTmpOp = [];
                        rpn.push("*");
                        break;
                    case "/":
                        // eslint-disable-next-line
                        for (const [key, value] of Object.entries(
                            generateVar
                        )) {
                            rpn.push(value);
                        }
                        // eslint-disable-next-line
                        for (const [key, value] of Object.entries(rpnTmpOp)) {
                            rpn.push(value);
                        }
                        generateVar = [];
                        rpnTmpOp = [];
                        rpn.push("/");
                        break;
                    default:
                        rpnTmpOp.push(op);
                        break;
                }
            }
            if (acceptBrackets) {
                let rand = Math.floor(Math.random() * 10);
                if (rand >= 9 - 1 * difficulty) {
                    openBrackets++;
                }
            }

            if (openBrackets > 0) {
                let rand = Math.floor(Math.random() * 10);
                if (rand >= 5) {
                    openBrackets--;
                    // eslint-disable-next-line
                    for (const [key, value] of Object.entries(generateVar)) {
                        rpn.push(value);
                    }
                    // eslint-disable-next-line
                    for (const [key, value] of Object.entries(rpnTmpOp)) {
                        rpn.push(value);
                    }
                    generateVar = [];
                    rpnTmpOp = [];
                }
            }
        }

        if (generateVar.length !== 0) {
            // eslint-disable-next-line
            for (const [key, value] of Object.entries(generateVar)) {
                rpn.push(value);
            }
            if (rpnTmpOp.length === 0) {
                restart = true;
            } else {
                // eslint-disable-next-line
                for (const [key, value] of Object.entries(rpnTmpOp)) {
                    rpn.push(value);
                }
            }
        }
    }
    return {rpn, r};
};

export const isOp = (elem: any) => {

    switch(elem) {
        case '+':
            return true;
        case "-":
            return true;
        case "*":
            return true;
        case "/":
            return true;
        default:
            return false;
    }
};
const calc = (a: number, b: number, op: any) => {
    switch (op) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return a / b;
        default:
            throw "je ne connais pas cette opérateur";
    }
};

const solveur = (rpn: any[], attemptResult: number, reponse?: number): [boolean, number] => {
    var tempVar = [];
    var tmpResult = 0;
    var correct = false;
    var tmpR = attemptResult;
    if(reponse != undefined) {
        correct = attemptResult == reponse;
        tmpR = reponse;
    }

    for (let i = 0; i < rpn?.length; i++) {
        if (isNumber(rpn[i]) || rpn[i] === "r") {
            if(rpn[i] === "r") {
                tempVar.push(tmpR);
            } else {
                tempVar.push(rpn[i]);
            }

        }

        if(isOp(rpn[i]) && tempVar.length > 0) {
            let b = tempVar.pop();
            let a = tempVar.pop();
            let c = calc(a,b, rpn[i]);
            tempVar.push(c);
        }
    }   

    tmpResult = tempVar[0];

    if(!correct && reponse != undefined) {

        var [ok, res] = solveur(rpn, attemptResult);
        correct = (tmpResult == res);
    }

    return [
        correct,
        tmpResult
    ];
};

const recCalc = (tabVar: any[], tabOp: any[]) : number => {
    var a = tabVar.pop();
    if(tabVar.length > 0) {
        var op = tabOp.pop();
        return calc(a,recCalc(tabVar, tabOp), op);
    }
    else
        return a; 

}

const generateurTime = () => {


    var nbVar = 1 + getRandomInt(4);
    var nbVarUseless = getRandomInt(2);
    var values: [any, any, any, any][] = [];

    var recettes = recette.recettes;
    var startTime = {hour:getRandomInt(12), min: getRandomInt(59) };

    for(let i = 0; i < nbVar; i++) {
        let randRecette = getRandomInt(recettes.length);
        values.push([recettes[randRecette][0], recettes[randRecette][1], recettes[randRecette][2], recettes[randRecette][3] ] );
    }

    return {startTime, values};

}

const solveurTime = (startTime: {hour:number, min: number},values: any[], reponse?: {hour: number, min: number}): [boolean,  {hour: number, min: number}] => {


    var endTime = {hour: startTime.hour, min: startTime.min}

    var correct = false;

    for(let i = 0; i < values.length; i++) {
        
        
        endTime.min += values[i][1] ;
        if(values[i][2] != undefined)
            endTime.min += + values[i][2];
        if(endTime.min > 59) {
            let reste = endTime.min % 60;
            let qoef = endTime.min / 60;
            endTime.hour += Math.floor(qoef);
            endTime.min = reste;
        }

    }

    if(endTime.hour > 23) {
        endTime.hour = endTime.hour % 24;
    }
    

    if(reponse != undefined) {

        correct = endTime.hour === reponse.hour && endTime.min === reponse.min;

    }

    console.log(endTime)

    return [correct, endTime];

}

export default Exercice;

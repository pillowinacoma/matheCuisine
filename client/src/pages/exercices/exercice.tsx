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
import { generator } from './utile_type1';
import { solveur } from './utile_type1';
import { solveurTime } from './utile._type2';
import { generateurTime } from './utile._type2';

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


export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}


export default Exercice;

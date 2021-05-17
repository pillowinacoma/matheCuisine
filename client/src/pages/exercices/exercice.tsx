import * as React from 'react';
import TType1 from './ttype1';
import TType2 from './ttype2';
import TType3 from './ttype3';
import { makeStyles, Button, Slide, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import CancelIcon from '@material-ui/icons/Cancel';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { isNumber } from 'util';
import recette from '../../locales/recettes.json';
import Type1 from './type1';
import Type2 from './type2';
import Type3 from './type3';
import ReplayIcon from '@material-ui/icons/Replay';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import Help from '../components/help';
import { LangContext } from '../../engine/translation/i18n';
import { Horraire } from '../components/lesson';
import { Addition, Soustraction, Multiplication, Division, Equation } from '../components/lesson';

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

/** Type 1 */

export const translationRpn = (rpn: any[], letter: string) => {

    var tempVar: any[] = [];
    var tempOp: any[]  = [];
    var tempStr: string[] = [];
    let z = 0;
    if(rpn !== undefined)   {
        for(let i = 0; i < rpn?.length ; i++) {

            if(isNumber(rpn[i]) || rpn[i] === "r") {
                
                if(tempOp.length != 0) {
                    var str = "";
                   // if(tempVar.length > 1 || tempOp.length > tempVar.length)
                    //    str += " ( ";
                    tempOp.reverse();
              
                    while(tempVar.length !== 0) {
                        var a = tempVar.pop();
                        if(tempOp.length > 0 && tempVar.length > 0 && z == 0) {
                            var b = tempVar.pop();
                            str = str + b + " " + tempOp.pop() + " " + a + " ";
                            z++;
                        }
                        else {
                            if((tempOp[tempOp.length - 1] == "*" || tempOp[tempOp.length - 1] == "*") && str != "") str = " ( " + str + " ) ";
                            str = str + " " + tempOp.pop() + " " + a + " ";
                        }
                    }
                    tempOp.reverse();
                    if(str.includes(" ( "))
                        str += " ) "
                    if(tempOp.length >= 1) {
                        str = tempOp.pop() + " ( " + str + " ) ";
                    }
                    tempStr.push(str);
                }
                tempVar.push(rpn[i]);
            }

            if(isOp(rpn[i]))
            {
                tempOp.push(rpn[i]);
            }



        // console.log(translation);
        //  console.log(i)
        }
    }

    if(tempOp.length != 0) {
        var str = "";
        tempOp.reverse();
        while(tempVar.length !== 0) {
            var a = tempVar.pop();
            if(tempOp.length > 0 && tempVar.length > 0 && z == 0) {
                var b = tempVar.pop();
                str = str + b + " " + tempOp.pop() + " " + a + " ";
                z++;
            }
            else
                str = str + " " + tempOp.pop() + " " + a + " ";
        }
        z = 0;
        tempOp.reverse();

        if(tempOp.length >= 1) {
            str = tempOp.pop() + " ( " + str + " ) ";
        }

        tempStr.push(str);
    }


    var finalEq = "";

    for(let i = 0; i < tempStr.length; i++) {


        if(tempStr[i].startsWith("* ") || tempStr[i].startsWith("/ ")) {
            finalEq = " ( " + finalEq + " ) " + tempStr[i];
        } else {
            finalEq += tempStr[i];
        }


    }

    finalEq = finalEq.replace("r", letter);
    return finalEq;

}

export const selectOp = (notions: string[]) => {
    let randOp = Math.floor(getRandomInt(10));
    let newTable = notions;

    newTable = newTable.filter(item => item !== "fraction" && item !== "equation" && item !== "temps")

    console.log("notions :" , notions)
    let choose = notions[randOp % newTable.length];
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

export const generator = (detail: any, difficulty: number) => {
    const vars: any[] = detail.vars;

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

    var r = parseFloat((Math.random() * (maxRand)).toFixed(detail.acceptFloat ? 3 : 0));

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
        var [correct, resultat, impossible] = solveur(rpn, r);

        if(countDecimals(resultat) > 2 || resultat == Infinity || impossible) {
            restart = true;
        }

    }
    return {rpn, r};
};


const countDecimals = (value: number) => {
    if (Math.floor(value) !== value)
        return value.toString().split(".")[1].length || 0;
    return 0;
}

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

export const calc = (a: number, b: number, op: any) => {
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

export const solveur = (rpn: any[], attemptResult: number, reponse?: number): [boolean, number, boolean] => {
    var tempVar: any[] = [];
    var tmpResult = 0;
    var correct = false;
    var tmpR = attemptResult;
    let impossible = false;
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
            if(rpn[i] == "/" && b == 0) {
                impossible = true;
                break;
            }
            let c = calc(a,b, rpn[i]);
            tempVar.push(c);
        }
    }   

    tmpResult = tempVar[0];
    if(!impossible) {
        if(!correct && reponse != undefined) {

            var [ok, res] = solveur(rpn, attemptResult);
            correct = (tmpResult == res);
        }
    }
    return [
        correct,
        tmpResult,
        impossible
    ];
};

export const recCalc = (tabVar: any[], tabOp: any[]) : number => {
    var a = tabVar.pop();
    if(tabVar.length > 0) {
        var op = tabOp.pop();
        return calc(a,recCalc(tabVar, tabOp), op);
    }
    else
        return a; 

}

export const genEffect = (setRpn: any, setAttemptR: any, setResultat: any, setEquation: any, setLetter: any, gen: any) => {
    var  [_rpn, _r, _resultat] = gen();
    setRpn(_rpn);
    setAttemptR(_r);
    setResultat(_resultat);
    if(_rpn != undefined)
        Object.entries(_rpn).forEach((value: [string, any], index: number, array: [string, any][]) => {
            if(value[1] === "r") setEquation(true);
        });

        
    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    setLetter(alphabet[Math.floor(Math.random() * alphabet.length)])
}

export const checkResult = (rpn: any, eq: any, equation: boolean, attemptR: any, resultat:any, reponse: any,  setNbError: any, nbError: number, setFinish: any, setIncorrect: any) => {
        if(rpn != undefined ) {
            var [correct, result] = solveur(rpn, attemptR, parseFloat(reponse));
            if(equation) {
                if(eq.includes("/ 0") && reponse === undefined && (isFinite(resultat) || isNaN(resultat))){
                    setFinish(true);
                } else if(correct) {
                    setFinish(true);
                } else {
                    setIncorrect(true);
                    setNbError(nbError + 1);
                }
            } else {
                if(result == parseFloat(reponse)) {
                    setFinish(true)
                } else {
                    setIncorrect(true);
                    setNbError(nbError + 1);
                }
            }
        }
    
}


/** Type 2 */

export const generateurTime = (difficulty: number) => {


    var nbVar = difficulty + getRandomInt(1);
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

export const solveurTime = (startTime: {hour:number, min: number},values: any[], reponse?: {hour: number, min: number}): [boolean,  {hour: number, min: number}] => {


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

/** Type 3 */

const genFract = (detail: any) => {


    //BASEDENOM est le dénominateur de départ on donne à rechercher a l'utilisateur son dénominateur
    var denomR = getRandomInt(detail.denominateurMax) ;
 



    //DENOM est le denominateur donnez a l'utilisateur
    var denom = getRandomInt(detail.denominateurMax);
    var nom = getRandomInt(denom - 1);


    var [correct, result] = solveurFraction(denom, nom, denomR);

    while(denom == 0 || denomR == 0 || countDecimals(result) != 0 || nom == 0|| result == 0) {
        denomR = getRandomInt(detail.denominateurMax);
        denom = getRandomInt(detail.denominateurMax);
        nom = getRandomInt(denom - 1);
        [correct, result] = solveurFraction(denom,nom,denomR);
    }
    


    return {denomR, nom, denom};


}

const solveurFraction = (denom: number, nom: number, denomR: number, nomR?: number): [boolean, number] => {

    var correct = false;
    var coef = denomR / denom;

    var result = nom * coef;

    if(nomR != undefined && result == nomR ) {
        correct = true;
    }


    return [correct, result];

}

/** Loader pour exercice */

const useStyle = makeStyles((theme) => ({
    gameBox: {
        width: "100%",
        height: "calc(100vh - 64px)",
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
        width: "calc(100% - 1px)",
        justifyContent: "space-between"
    },
    useLessContent: {
        width: 300
    },
    exHeaderRight: {
        position: "relative",
        width: 300,
        display: "flex",
        justifyContent: "flex-end",
    },
    exHeaderLeft: {
        position: "relative",
        width:  500,
        display: "flex",
        "& div": {
            backgroundColor: "rgba(251, 238, 230, 0.65)",
            margin: "auto",
            marginTop: 25,
            marginBottom: 25,
            width: 150,
            height: 100,
            border: "2px solid rgba(251, 238, 230, 0.85)",
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
    replayBox: {
        backgroundColor: "unset",
        top: 35,
        height: 76,
        marginRight: 20,
    },
    replay: {
        marginLeft: "calc(50% - 30px)",
        fontSize: "60px",
        color: "#3498DB",
    },
    reussite: {
        zIndex: 10000,
        backgroundColor: "#D5F5E3",
        position: "relative",
        duisplay: "block",
        width: "50%",
        padding: 20,
        marginTop: 100,
        marginLeft: "25%",
        marginRight: "25%",
        textAlign: "center",
        fontSize: 30,
        color: "#58D68D",
        border: "5px solid #58D68D ",
        borderRadius: 15,
    },
    satisfiedIcon: {
        fontSize: 60,
        width: "100%",
        color: "#58D68D"
    },
    helpBox: {
        top: 35,
        height: 76,
        backgroundColor: "unset",
        color: "whitesmoke"
    },
    helpIcon: {
        color: "#F1C40F",
        fontSize: 60
    }
}));


const Timer = (props:{finish: boolean, replay: boolean, setNeedHelp: any}) => {
    const [time, setTime] = React.useState(0.00);

    React.useEffect(() => {
        setTime(0);
    }, [props.replay]);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            if(!props.finish) {
                setTime(time + 0.01);
                if(time > 10) {
                    props.setNeedHelp(true);
                }
            }
        }, 10)

        return () => clearTimeout(timer);
    },[time]) 

    return (<p>{time.toFixed(2)}</p>);

}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


const Exercice = (props: {difficulty: number, ex: string, trainning?: boolean}) => {
    const classes = useStyle();
    var json: any;
    const {translate} = React.useContext(LangContext);
    const [finish, setFinish] = React.useState(false);

    const [nbError, setNbError] = React.useState(0);
    const [nbIndice, setNbIndice] = React.useState(0);

    const [replay, setReplay] = React.useState(false);
    const [needHelp, setNeedHelp] = React.useState(false);
    const [openHelp, setOpenHelp] = React.useState(false);

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
    console.log(type)
    console.log(json[props.ex].type)
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
                var {startTime, values} = generateurTime(props.difficulty);

                return [startTime, values];
            };
            solve = solveurTime;
            break;
        case 2: // fraction avec mini jeux et qcm
            gen = () => {
                var {denomR, denom, nom} = genFract(json[props.ex]);

                return [denomR, denom, nom];
            }
            solve = solveurFraction;
            break;
        default:
            break;
    }

    React.useEffect(()=> {
        if(replay) {
            setNbIndice(0);
            setNeedHelp(false);
            setFinish(false);
            setReplay(false);
        }
    }, [replay])


    const handleHelp = () => {
        if(!openHelp)
            setNbIndice(nbIndice + 1)
        setOpenHelp(!openHelp)
    }



    return (
        <div className={classes.gameBox}>
            <div className={classes.exHeader}>
                <div className={classes.useLessContent}></div>
                <div className={classes.exHeaderLeft}>
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
                        <Timer finish={finish} replay={replay} setNeedHelp={setNeedHelp}/>
                    </div>
                </div>
                <div className={classes.exHeaderRight}>
                { needHelp ? <Button className={classes.helpBox} onClick={handleHelp}>
                            <LiveHelpIcon className={classes.helpIcon}/>
                            <p>{translate("needHelp")}</p>                
                        </Button> : ""}
                        <Button className={classes.replayBox} onClick={() => setReplay(true)}>
                            <ReplayIcon className={classes.replay}/>
                        </Button>
                </div>
            </div>
            <Dialog
                open={openHelp}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleHelp}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{translate("help")}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {Object.entries(json[props.ex].notions).map((element) => {
                            var notions = element[1];
                            var Text: any ;
                            switch(notions) {
                                case "addition":
                                    Text = Addition;
                                    break;
                                case "soustraction":
                                    Text = Soustraction;
                                    break;
                                case "multiplication":
                                    Text = Multiplication;
                                    break;
                                case "division":
                                    Text = Division;
                                    break;
                                case "temps":
                                    Text = Horraire;
                                    break;
                                case "equation":
                                    Text = Equation;
                                    break;
                                default: 
                                    Text = undefined;
                                    break;
                            }

                            return (
                            <div>{Text != undefined ? <Text/> : "" }</div>
                            )
                        })}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleHelp} color="primary">
                    {translate("close")}
                </Button>
                </DialogActions>
            </Dialog>
            {finish ? <div className={classes.reussite}><SentimentVerySatisfiedIcon className={classes.satisfiedIcon}/> Vous avez trouvé la bonne réponse !</div> : ""}

            {finish ? "" : <Type params={json[props.ex]} gen={gen} setFinish={setFinish} nbError={nbError} setNbError={setNbError} solveur={solve} replay={replay}/>}

        </div>
    );
};


export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}


export default Exercice;
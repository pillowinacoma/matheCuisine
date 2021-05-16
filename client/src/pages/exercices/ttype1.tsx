import * as React from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import { Equation } from '../components/lesson';
import { isOp } from './exercice';
import { isNumber } from 'util';
import { makeStyles, InputBase, TextField, Button } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

const useStyle = makeStyles((theme) => ({

    equation: {
        fontWeight: 100,
        fontSize: 40,
        marginLeft: "5%"
    },
    question: {
        fontSize: 25,
        fontWeight: 100
    },
    game: {
        position: "relative",
        marginLeft: "20%",
        marginRight: "20%",
        width: "60%"
    },
    valid: {
        width: "100%",
        marginRight: "40%",
        border: "2px solid #58D68D",
        maxWidth: "100%",
        backgroundColor: "#D5F5E3",
        "& p": {
            fontSize: 20,
            marginLeft: 0,
            width: "calc(100% - 150px)",
            color: "#58D68D",
            textAlign: "center"
        }
    },
    validIcon: {
        fontSize: 40,
        color: "#58D68D",
        width: 50
    },
    varReponse: {
        width: "40%",
        marginLeft: "30%",
        marginBottom: 50,
        fontSize: 40
    }

}));

const TType1 = (props: {params: any, gen: any, setFinish: any, nbError:number, setNbError:any, solveur: any}) : JSX.Element => {

    const classes = useStyle();
    const [reponse, setReponse] = React.useState<string>("");
    const [errorFormat, setErrorFormat] = React.useState(false);
    const [eq, setEq] = React.useState("");
    const [equation, setEquation] = React.useState(false);
    const [rpn, setRpn] = React.useState<any[]>();
    const [resultat, setResultat] = React.useState<number>(Infinity);
    const [attemptR, setAttemptR] = React.useState<number>(Infinity);
    const [incorrect, setIncorrect] = React.useState(false);
    const [letter, setLetter] = React.useState("");


    React.useEffect(() => {
        var  [_rpn, _r, _resultat] = props.gen();
        setRpn(_rpn);
        setAttemptR(_r);
        setResultat(_resultat);
        if(_rpn != undefined)
            Object.entries(_rpn).forEach((value: [string, any], index: number, array: [string, any][]) => {
                if(value[1] === "r") setEquation(true);
            });

            
        const alphabet = "abcdefghijklmnopqrstuvwxyz"

        setLetter(alphabet[Math.floor(Math.random() * alphabet.length)])

    }, []);


    React.useEffect(() => {
        if(rpn != undefined)
            setEq(translationRpn(rpn, letter));
    }, [letter]);

    const handleChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        setErrorFormat(false);
        setIncorrect(false);
        setReponse(event.target.value);
     /*   if(isNumber(reponse) && isNaN(reponse)) {
            setErrorFormat(true);
        }*/
    }

    const checkReponse = () => {
        console.log(rpn)
        console.log(attemptR)
        if(props.solveur != undefined) {
            if(rpn != undefined ) {
                var [correct, result] = props.solveur(rpn, attemptR, parseFloat(reponse));
                if(equation) {
                    if(eq.includes("/ 0") && reponse === undefined && (isFinite(resultat) || isNaN(resultat))){
                        props.setFinish(true);
                    } else if(correct) {
                        props.setFinish(true);
                    } else {
                        setIncorrect(true);
                        props.setNbError(props.nbError + 1);
                    }
                } else {
                    if(result == parseFloat(reponse)) {
                        props.setFinish(true)
                    } else {
                        setIncorrect(true);
                        props.setNbError(props.nbError + 1);
                    }
                }
            }

        }
    }

    return (
        <div className={classes.game}>
            <h2 className={classes.question}>Résoudre {equation ? " l'équation à un inconnue suivante": "le calcule suivant"} :</h2>
            
            <p className={classes.equation}>{eq} = {equation ? resultat :  <TextField id="outlined-basic" label="Réponse" variant="outlined" error={isNumber(reponse) && isNaN(reponse) || incorrect} helperText= {isNumber(reponse) && isNaN(reponse) ? "vous devez entrez un nombre" : incorrect ? "Mauvaise réponse" : ""} value={reponse} onChange={handleChange()}/>}</p>

            {equation ? <div className={classes.varReponse} >{letter} = <TextField id="outlined-basic" label="Réponse" variant="outlined" error={isNumber(reponse) && isNaN(reponse) || incorrect} helperText= {isNumber(reponse) && isNaN(reponse) ? "vous devez entrez un nombre" : incorrect ? "Mauvaise réponse" : ""} value={reponse} onChange={handleChange()}/> </div> : ""}

            <Button onClick={checkReponse} className={classes.valid}>
                <CheckIcon className={classes.validIcon}/>
                <p>Valider</p>
            </Button>
        </div>
    );

}

export default TType1;

const translationRpn = (rpn: any[], letter: string) => {

    var tempVar = [];
    var tempOp  = [];
    var tempStr: string[] = [];

    if(rpn !== undefined)   {
        for(let i = 0; i < rpn?.length ; i++) {

            if(isNumber(rpn[i]) || rpn[i] === "r") {
                
                if(tempOp.length != 0) {
                    var str = "";
                   // if(tempVar.length > 1 || tempOp.length > tempVar.length)
                    //    str += " ( ";
                    tempOp.reverse();
                    let z = 0;
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
            if(tempOp.length > 0 && tempVar.length > 0) {
                var b = tempVar.pop();
                str = str + b + " " + tempOp.pop() + " " + a + " ";
            }
            else
                str = str + " " + tempOp.pop() + " " + a + " ";
        }
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
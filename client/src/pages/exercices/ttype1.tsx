import * as React from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import { Equation } from '../components/lesson';
import { isNumber } from 'util';
import { makeStyles, InputBase, TextField, Button } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { genEffect, translationRpn, checkResult } from './exercice';
import { LangContext } from '../../engine/translation/i18n';

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
        color: "whitesmoke",
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
    },
    field: {
        backgroundColor:"whitesmoke",
        borderColor: "whitesmoke"
    }

}));

const TType1 = (props: {params: any, gen: any, setFinish: any, nbError:number, setNbError:any, solveur: any, replay: boolean}) : JSX.Element => {

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
    const {translate} = React.useContext(LangContext);

    React.useEffect(() => {
        genEffect(setRpn, setAttemptR, setResultat, setEquation, setLetter, props.gen);
    }, [props.replay]);


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
        checkResult(rpn, eq, equation, attemptR, resultat, reponse, props.setNbError, props.nbError, props.setFinish, setIncorrect );
        var [correct, result] = props.solveur(rpn, attemptR, parseFloat(reponse));
        console.log(result);
    }

    return (
        <div className={classes.game}>
            <h2 className={classes.question}>{equation ? translate("resolveEq") : translate("resolveComp")} </h2>
            
            <p className={classes.equation}>{eq} = {equation ? resultat :  <TextField id="outlined-basic" label={translate("reply")} variant="outlined" error={isNumber(reponse) && isNaN(reponse) || incorrect} helperText= {isNumber(reponse) && isNaN(reponse) ? "vous devez entrez un nombre" : incorrect ? "Mauvaise réponse" : ""} value={reponse} onChange={handleChange()}  className={classes.field}/>}</p>

            {equation ? <div className={classes.varReponse} >{letter} = <TextField id="outlined-basic" label={translate("reply")} variant="outlined" error={isNumber(reponse) && isNaN(reponse) || incorrect} helperText= {isNumber(reponse) && isNaN(reponse) ? "vous devez entrez un nombre" : incorrect ? "Mauvaise réponse" : ""} value={reponse} onChange={handleChange()}  className={classes.field}/> </div> : ""}

            <Button onClick={checkReponse} className={classes.valid}>
                <CheckIcon className={classes.validIcon}/>
                <p>{translate("valid")}</p>
            </Button>
        </div>
    );

}

export default TType1;


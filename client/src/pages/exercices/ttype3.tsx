
/**
 * entrainement de type 3 (fraction), ce fichier est un composant react 
 * qui s'occupe de l'affichage d'un entrainement de ce type 
 * et de recuperer la reponse de l'utilisateur et la verifier etc
 */
import * as React from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core';
import { isNumber } from 'util';
import CheckIcon from '@material-ui/icons/Check';
import { LangContext } from '../../engine/translation/i18n';

const countDecimals = (value: number) => {
    if (Math.floor(value) !== value)
        return value.toString().split(".")[1].length || 0;
    return 0;
}

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


const TType3 = (props: {params: any, gen: any, setFinish: any, nbError:number, setNbError:any, solveur: any, replay: boolean}) : JSX.Element => {
    const [flipped, setFlipped] = React.useState(0);
    const [denom, setDenom] = React.useState<number>(0);
    const [nom, setNom] = React.useState<number>(0);
    const [newDenom, setNewDenom] = React.useState<number>(0)
    const classes = useStyle();
    const [first, setFirst] = React.useState(-1);
    const {translate} = React.useContext(LangContext);
    const [reponse, setReponse] = React.useState<any>();
    const [incorrect, setIncorrect] = React.useState(false);
    const [errorFormat, setErrorFormat] = React.useState(false);
    React.useEffect(() => {
        var [denomR, denom, nom] = props.gen();
        setDenom(denom);
        setNom(nom);
        setNewDenom(denomR);

        let f = Math.floor(Math.random() * (denom - 1));
        while( countDecimals(denom/f) != 0  ) {

            f = Math.floor(Math.random() * (denom - 1));

        }

        setFirst(f);

    }, [props.replay]);

    const handleChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        setErrorFormat(false);
        setIncorrect(false);
        setReponse(event.target.value);
     /*   if(isNumber(reponse) && isNaN(reponse)) {
            setErrorFormat(true);
        
        }*/
    }

    const checkReponse = () => {
        const [correct, result] = props.solveur(denom, nom, newDenom, reponse);
        if (correct) {
            props.setFinish(true);
        } else {
            props.setNbError(props.nbError + 1);
        }
    };

    return (
        <div className={classes.game}>
            <h2 className={classes.question}>Trouvez le nominateur pour que les 2 fraction soit égale :</h2>
            
            <p className={classes.equation}>{nom} / {denom} = <TextField id="outlined-basic" label={translate("reply")} variant="outlined" error={isNumber(reponse) && isNaN(reponse) || incorrect} helperText= {isNumber(reponse) && isNaN(reponse) ? "vous devez entrez un nombre" : incorrect ? "Mauvaise réponse" : ""} value={reponse} onChange={handleChange()}  className={classes.field}/> / {newDenom}</p>
           
            <Button onClick={checkReponse} className={classes.valid}>
                <CheckIcon className={classes.validIcon}/>
                <p>{translate("valid")}</p>
            </Button>
        </div>
    );
}

export default TType3;
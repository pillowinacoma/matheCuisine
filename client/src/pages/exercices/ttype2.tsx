/**
 * entrainement de type 2 (problème de temps), ce fichier est un composant react 
 * qui s'occupe de l'affichage d'un entrainement de ce type 
 * et de recuperer la reponse de l'utilisateur et la verifier etc
 */
import * as React from 'react';
import { makeStyles, TextField, Button } from '@material-ui/core';
import { isNumber } from 'util';
import CheckIcon from '@material-ui/icons/Check';

const useStyle = makeStyles((theme) => ({

    hour: {
        fontSize: 40,
        marginBottom: 30
    },
    problem: {
        color: "black",
        position: "absolute",
        width: 400,
        marginLeft: "20%",
        padding: 10,
        border: "5px solid #D35400 ",
        backgroundColor: "#EDBB99",
        borderRadius: 20
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
    resolution: {
        position: "absolute",
        marginTop: 80,
        marginLeft: "calc(400px + 20% + 60px)",
    },
    game: {
        color: "whitesmoke"
    },
    field: {
        backgroundColor:"whitesmoke",
        borderColor: "whitesmoke"
    }

}));

const TType2 = (props: {params: any, gen: any, setFinish: any, nbError:number, setNbError:any, solveur: any, replay: boolean}) : JSX.Element => {

    const classes = useStyle();
    const [reponse, setReponse] = React.useState({hour: 0, min:0});
    const [incorrect, setIncorrect] = React.useState(false);

    const [startTime, setStartTime] = React.useState({hour: 0, min: 0})
    const [values, setValues] = React.useState([]);



    React.useEffect(() => {
        var  [startTime, values, valuesUseless] = props.gen();
        setStartTime(startTime);
        setValues(values);

    }, [props.replay]);


    const handleChange = (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setIncorrect(false);
        if(type == "hour") {
            setReponse({...reponse, hour: parseInt(event.target.value)});
        }
        if(type == "min") {
            setReponse({...reponse, min: parseInt(event.target.value)});
        }

    }

    const checkReponse = () => {

        const [correct, endTime] = props.solveur(startTime, values, reponse);

        if(correct) {
            props.setFinish(true);
        } else {
            props.setNbError(props.nbError + 1);
        }

    }

    return (
        <div className={classes.game}>

            <div className={classes.problem}>
                <p>Vous vous lancez dans la préparation d'un repas. Vous ne savez pas encore à quel heure vous finirez. Mais vous connaissez le temps de préparation de chaqu'un de vos plat.</p>
                <p>Vous commencez vos plat à {startTime.hour} h {startTime.min}</p>
                <p>Trouvez l'heure à laqu'elle vous finirez de cusinez.</p>
                <p>Vous êtes débutant vous préparé et cuisez alors vos plats lorsque le précédent à fini de cuire. Vous procédé dans l'ordre suivant : préparation puis cuisson</p>
                <ul>
                {Object.entries(values).map((values) => {
                    
                    console.log(values[1]);
                    let cook = values[1][0];

                    return (
                        <li>
                        <p>Il vous faudra {values[1][1]} minutes pour préparer {values[1][3] ? "vos" : "votre"} {cook} {values[1][2] != 0 ? "et " + values[1][2] + " minutes pour la cuisson" : ""}</p>
                        </li>
                    )
                })}
                </ul>
            </div>
            
            <div className={classes.resolution}>
                <div className={classes.hour} >heure = <TextField id="outlined-basic" label="Réponse" variant="outlined" error={isNumber(reponse.hour) && incorrect} helperText= {isNumber(reponse.hour) && incorrect ? "Mauvaise réponse" : ""} value={reponse.hour} onChange={handleChange("hour")}  className={classes.field}/> </div>
                <div className={classes.hour} >minute = <TextField id="outlined-basic" label="Réponse" variant="outlined" error={isNumber(reponse.min) && incorrect} helperText= {isNumber(reponse.min) && incorrect ? "Mauvaise réponse" : ""} value={reponse.min} onChange={handleChange("min")}  className={classes.field}/> </div>
                <Button onClick={checkReponse} className={classes.valid}>
                    <CheckIcon className={classes.validIcon}/>
                    <p>Valider</p>
                </Button>
            </div>

        </div>
    );

}

export default TType2;
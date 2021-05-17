import Clock from "../components/clock";
import React from "react";
import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";

const useStyle = makeStyles((theme) => ({
    hour: {
        fontSize: 40,
        marginBottom: 30,
    },
    problem: {
        color: "black",
        position: "absolute",
        width: 400,
        marginLeft: 40,
        padding: 10,
        border: "5px solid #D35400 ",
        backgroundColor: "#EDBB99",
        borderRadius: 20,
    },
    valid: {},
    validIcon: {},
}));

const Type2 = (props: {
    params: any;
    gen: any;
    setFinish: any;
    nbError: number;
    setNbError: any;
    solveur: any;
    replay: boolean;
}): JSX.Element => {
    const classes = useStyle();
    const [reponse, setReponse] = React.useState({ hour: 0, min: 0 });
    const [incorrect, setIncorrect] = React.useState(false);
    const [active, setActive] = React.useState(false);

    const [startTime, setStartTime] = React.useState({ hour: 0, min: 0 });
    const [values, setValues] = React.useState([]);

    React.useEffect(() => {
        var [startTime, values, valuesUseless] = props.gen();
        setStartTime(startTime);
        setValues(values);
    }, [props.replay]);

    const checkReponse = () => {
        const [correct, endTime] = props.solveur(startTime, values, reponse);

        if (correct) {
            props.setFinish(true);
        } else {
            props.setNbError(props.nbError + 1);
        }
    };


    return (
        <div>
            <div className={classes.problem}>
                <p>
                    Vous vous lancez dans la préparation d'un repas. Vous ne
                    savez pas encore à quel heure vous finirez. Mais vous
                    connaissez le temps de préparation de chaqu'un de vos plat.
                </p>
                <p>
                    Vous êtes débutant vous préparé et cuisez alors vos plats
                    lorsque le précédent à fini de cuire. Vous procédé dans
                    l'ordre suivant : préparation puis cuisson
                </p>
                <p>
                    Vous <strong>commencez</strong> vos plat à{" "}
                    <strong>
                        {startTime.hour} h {startTime.min}
                    </strong>{" "}
                </p>
                <p>Trouvez l'heure à laquelle vous finirez de cusinez.</p>
                <ul>
                    {Object.entries(values).map((values) => {
                        console.log(values[1]);
                        let cook = values[1][0];

                        return (
                            <li>
                                <p>
                                    Il vous faudra{" "}
                                    <strong>{values[1][1]} minutes</strong> pour
                                    préparer {values[1][3] ? "vos" : "votre"}{" "}
                                    {cook}{" "}
                                    {values[1][2] != 0 ? (
                                        <span>
                                            et{" "}
                                            <strong>
                                                {values[1][2]} minutes
                                            </strong>{" "}
                                            pour la cuisson
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <Clock time={startTime} setResponse={setReponse} setClicked={setActive} valider={checkReponse} active={active}/>
        </div>
    );
};

export default Type2;

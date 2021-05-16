import * as React from 'react';
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Board from "../components/board";
import Paquet from "../components/paquet";
import Draggable from "../components/draggable";
import Cible from "../components/cible";
import {
    Plus,
    Equals,
    Times,
    Minus,
    DividedBy,
} from "../components/operationSigns";
import { makeStyles } from "@material-ui/core";
import { genEffect, translationRpn, checkResult } from './exercice';


const useStyle = makeStyles((theme) => ({

    hour: {
        fontSize: 40,
        marginBottom: 30
    },
    problem: {
        position: "absolute",
        width: "calc(100% - 80px)",
        marginLeft: 40,
        marginRight: 40,
        padding: 10,
        border: "5px solid #D35400 ",
        backgroundColor: "#EDBB99",
        borderRadius: 20
    },

}));

const Type1 = (props: { params: any, gen: any, setFinish: any, nbError:number, setNbError:any, solveur: any }): JSX.Element => {

    const classes = useStyle();
    const [reponse, setReponse] = React.useState<string>("");
    const [eq, setEq] = React.useState("");
    const [equation, setEquation] = React.useState(false);
    const [rpn, setRpn] = React.useState<any[]>();
    const [resultat, setResultat] = React.useState<number>(Infinity);
    const [attemptR, setAttemptR] = React.useState<number>(Infinity);
    const [incorrect, setIncorrect] = React.useState(false);
    const [letter, setLetter] = React.useState("");

    React.useEffect(() => {
        genEffect(setRpn, setAttemptR, setResultat, setEquation, setLetter, props.gen);
    }, []);



    React.useEffect(() => {
        if(rpn != undefined)
            setEq(translationRpn(rpn, letter));
    }, [letter]);

    const checkReponse = () => {
        checkResult(rpn, eq, equation, attemptR, resultat, reponse, props.setNbError, props.nbError, props.setFinish, setIncorrect );
    }
    
    return (
        <div>
            <div className={classes.problem}>
                ok
            </div>
            <Board camera={{ position: [0, 0, 50] }}>

                <Draggable file="banana"/>
                <Cible position={[30,0,0]}/>
            </Board>
        </div>
    );
};

export default Type1;

const bananaMentions = (
    <Suspense fallback={"loading"}>
        <Paquet
            file="banana"
            center={[0, 0, 0]}
            dimensions={[5, 5, 1]}
            distance={[10, 5, 5]}
            scale={1}
        />

        <Times position={[-50, 20, 60]} size={15} />

        <Paquet
            file="banana"
            center={[-90, 0, 0]}
            dimensions={[5, 1, 5]}
            distance={[10, 5, 5]}
            scale={1}
        />
        <Equals position={[120, 10, 60]} size={15} />

        <Paquet
            file="banana"
            center={[100, 0, 0]}
            dimensions={[5, 5, 5]}
            distance={[10, 5, 5]}
            scale={1}
        />

        <OrbitControls />
    </Suspense>
);


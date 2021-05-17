import * as React from "react";
import Board from "../components/board";
import BackgroundImage from "../components/bgImage";
import PancakePan from "../components/pancakepan";
import pancakeImg from "../../img/pancakes.jpg";
import Cible from "../components/cible";
import { computeHeadingLevel } from '@testing-library/react';
import { makeStyles } from '@material-ui/core';
import { OrbitControls } from "@react-three/drei";

const countDecimals = (value: number) => {
    if (Math.floor(value) !== value)
        return value.toString().split(".")[1].length || 0;
    return 0;
}

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

const Type3 = (props: {params: any, gen: any, setFinish: any, nbError:number, setNbError:any, solveur: any, replay: boolean})  : JSX.Element => {
    const [flipped, setFlipped] = React.useState(0);
    const [denom, setDenom] = React.useState<number>(0);
    const [nom, setNom] = React.useState<number>(0);
    const [newDenom, setNewDenom] = React.useState<number>(0);
    const [first, setFirst] = React.useState(-1);
    const classes = useStyle();

    React.useEffect(() => {
        var [denomR, denom, nom] = props.gen();
        setDenom(denom);
        setNom(nom);
        setNewDenom(denomR);
       

        let f = Math.floor(Math.random() * (denomR - 1)) + 1;

        while( countDecimals(denomR/f) != 0 || f == denomR) {

            f = Math.floor(Math.random() * (denomR - 1)) + 1;

        }

        console.log('ligne ', denomR/f)
        console.log("colonne ", f)

        setFirst(f);
    }, [props.replay]);

    const checkReponse = () => {
        
        const [correct, result] = props.solveur(denom, nom, newDenom, flipped);
        
        if (correct) {
            props.setFinish(true);
        } else {
            props.setNbError(props.nbError + 1);
        }
    };

    return (
        <div>
            <div className={classes.problem}>
                <p>Vos clients vous demande de leur préparé <strong>{newDenom}</strong> pancakes.</p>
                <p>L'équivalent de <strong>{nom} / {denom}</strong> des pancakes sont prêt dépéché vous de les retourner !</p>
            </div>

            <Board camera={{ position: [0, 0, 50] }}>
                <React.Suspense fallback="loading text">
                    <Cible
                        execute={() => console.log(checkReponse())}
                        size={1}
                        rotation={[0, 0, 0]}
                        position={[-20, 30, 0]}
                        valEntry={"VALIDER"}
                    />
                </React.Suspense>
                <PancakePan dimensions={[(newDenom/first), first]} setFlipped={setFlipped}/>
                <OrbitControls/>
            </Board>
        </div>
    );
};

export default Type3;

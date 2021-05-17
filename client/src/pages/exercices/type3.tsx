import * as React from "react";
import Board from "../components/board";
import BackgroundImage from "../components/bgImage";
import PancakePan from "../components/pancakepan";
import pancakeImg from "../../img/pancakes.jpg";
import Cible from "../components/cible";

const countDecimals = (value: number) => {
    if (Math.floor(value) !== value)
        return value.toString().split(".")[1].length || 0;
    return 0;
};

const Type3 = (props: {
    params: any;
    gen: any;
    setFinish: any;
    nbError: number;
    setNbError: any;
    solveur: any;
    replay: boolean;
}): JSX.Element => {
    const [flipped, setFlipped] = React.useState(0);
    const [denom, setDenom] = React.useState<number>(0);
    const [nom, setNom] = React.useState<number>(0);
    const [newDenom, setNewDenom] = React.useState<number>(0);

    const [first, setFirst] = React.useState(-1);

    React.useEffect(() => {
        var [denomR, denom, nom] = props.gen();
        setDenom(denom);
        setNom(nom);
        setNewDenom(denomR);

        let f = Math.floor(Math.random() * (denom - 1));
        while (countDecimals(denom / f) != 0) {
            f = Math.floor(Math.random() * (denom - 1));
        }

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
            <Board camera={{ position: [0, 0, 50] }}>
                <PancakePan
                    dimensions={[denom - first, first]}
                    setFlipped={setFlipped}
                />
                <React.Suspense fallback="loading text">
                    <Cible
                        execute={() => console.log("validé")}
                        size={5}
                        rotation={[0, 0, 0]}
                        position={[0, 0, 0]}
                        valEntry={"VALIDER"}
                    />
                </React.Suspense>
            </Board>
        </div>
    );
};

export default Type3;

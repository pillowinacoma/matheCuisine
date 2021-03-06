
/**
 * entrainement de type 3 (fraction), ce fichier est un composant react 
 * qui s'occupe de l'affichage d'un entrainement de ce type 
 * et de recuperer la reponse de l'utilisateur et la verifier etc
 */
import * as React from "react";
import Board from "../components/board";
import Draggable from "../components/draggable";
import Cible from "../components/cible";
import Source from "../components/source";
import { Text } from "../components/source";
import { makeStyles } from "@material-ui/core";
import { isNumber } from "util";
import recette from "../../locales/recettes.json";
import { getRandomInt } from "./exercice";
import Droppable from "../components/droppable";
import { Box } from "@react-three/drei";

const useStyle = makeStyles((theme) => ({
    hour: {
        fontSize: 40,
        marginBottom: 30,
    },
    problem: {
        color: "black",
        position: "absolute",
        width: "calc(100% - 80px)",
        marginLeft: 40,
        marginRight: 40,
        padding: 10,
        border: "5px solid #D35400 ",
        backgroundColor: "#EDBB99",
        borderRadius: 20,
    },
}));

const Type1 = (props: {
    params: any;
    gen: any;
    setFinish: any;
    nbError: number;
    setNbError: any;
    solveur: any;
    replay: boolean;
}): JSX.Element => {
    const classes = useStyle();
    const [reponse, setReponse] = React.useState<string>("");
    const [eq, setEq] = React.useState("");
    const [equation, setEquation] = React.useState(false);
    const [rpn, setRpn] = React.useState<any[]>();
    const [resultat, setResultat] = React.useState<number>(Infinity);
    const [attemptR, setAttemptR] = React.useState<number>(Infinity);
    const [incorrect, setIncorrect] = React.useState(false);
    const [letter, setLetter] = React.useState("");
    const [question, setQuestion] = React.useState<string | JSX.Element>("");
    const [valTable, setValTable] = React.useState<number[]>([]);
    const [valEntry, setValEntry] = React.useState(0);
    const [negEntry, setNegEntry] = React.useState(false);

    React.useEffect(() => {
        var [_rpn, _r, _resultat] = props.gen();
        setRpn(_rpn);
        setAttemptR(_r);
        setResultat(_resultat);
        if (_rpn != undefined)
            Object.entries(_rpn).forEach(
                (
                    value: [string, any],
                    index: number,
                    array: [string, any][]
                ) => {
                    if (value[1] === "r") setEquation(true);
                }
            );

        const alphabet = "abcdefghijklmnopqrstuvwxyz";

        setLetter(alphabet[Math.floor(Math.random() * alphabet.length)]);
    }, [props.replay]);

    React.useEffect(() => {
        if (rpn != undefined) {
            setEq(translationRpn(rpn, letter));
            setQuestion(
                selectQuestion(rpn, equation, resultat, letter, "banane")
            );
        }
    }, [letter]);

    const handleChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        setIncorrect(false);
        setReponse(event.target.value);
        /*   if(isNumber(reponse) && isNaN(reponse)) {
            setErrorFormat(true);
        }*/
    };

    const checkReponse = () => {
        if (rpn != undefined) {
            var [correct, result] = props.solveur(
                rpn,
                attemptR,
                parseFloat(reponse)
            );
            if (equation) {
                if (
                    eq.includes("/ 0") &&
                    reponse === undefined &&
                    (isFinite(resultat) || isNaN(resultat))
                ) {
                    props.setFinish(true);
                } else if (correct) {
                    props.setFinish(true);
                } else {
                    setIncorrect(true);
                    props.setNbError(props.nbError + 1);
                }
            } else {
                if (result == parseFloat(reponse)) {
                    props.setFinish(true);
                } else {
                    setIncorrect(true);
                    props.setNbError(props.nbError + 1);
                }
            }
        }
    };

    React.useEffect(() => {
        setValEntry(
            valTable.reduce((acc, curr) => {
                return acc + curr;
            }, 0) * (negEntry ? -1 : 1)
        );
    }, [valTable, negEntry]);

    return (
        <div>
            <div className={classes.problem}>
                {question}
                {equation ? (
                    <p>
                        Trouvez <strong>{letter}</strong> ce sera la quantit??
                        dont vous aurez besoin ;).
                    </p>
                ) : (
                    ""
                )}
            </div>
            <Board camera={{ position: [0, 0, 50] }}>
                <React.Suspense fallback="loading">
                    <Source
                        val={1}
                        position={[-60, -20, 0]}
                        createElem={() => setValTable([...valTable, 1])}
                    />
                    <Source
                        val={2}
                        position={[-40, -20, 0]}
                        createElem={() => setValTable([...valTable, 2])}
                    />
                    <Source
                        val={5}
                        position={[-20, -20, 0]}
                        createElem={() => setValTable([...valTable, 5])}
                    />
                    <Source
                        val={10}
                        position={[0, -20, 0]}
                        createElem={() => setValTable([...valTable, 10])}
                    />
                    <Source
                        val={100}
                        position={[20, -20, 0]}
                        createElem={() => setValTable([...valTable, 100])}
                    />
                    <Source
                        val={1000}
                        position={[50, -20, 0]}
                        createElem={() => setValTable([...valTable, 1000])}
                    />
                    <Cible
                        negative={negEntry}
                        execute={()=>{
                            console.log(valEntry)
                        }}
                        position={[-10, -10, -2]}
                        valEntry={Math.abs(valEntry)}
                    />
                    <Cible
                        execute={() => setNegEntry(!negEntry)}
                        size={0.5}
                        rotation={[0, 0, 0]}
                        position={[20, -5, -2]}
                        valEntry={"NEGATIVE"}
                    />
                    <Cible
                        execute={() => {
                            setReponse(valEntry + "");
                            checkReponse();
                        }}
                        size={0.5}
                        rotation={[0, 0, 0]}
                        position={[20, 0, -2]}
                        valEntry={"VALIDER"}
                    />
                    <Cible
                        execute={() => {
                            setValEntry(0);
                            setNegEntry(false);
                            setValTable([]);
                        }}
                        size={0.5}
                        rotation={[0, 0, 0]}
                        position={[20, -10, -2]}
                        valEntry={"REINITIALISER"}
                    />
                </React.Suspense>
            </Board>
        </div>
    );
};

export default Type1;

const selectQuestion = (
    rpn: any[],
    equation: boolean,
    resultat: number,
    letter: string,
    model: string
) => {
    const unities = ["gramme", "kilo", ""];

    var count = 0;

    var tmpOp: string[] = [];

    var question = "";
    var ret = <div></div>;
    var recettes: any[] = recette.recettes;

    var randRecette: any[] =
        recettes[Math.floor(Math.random() * recettes.length)];
    var randGarniture =
        randRecette[4][Math.floor(Math.random() * randRecette[4].length)];
    var unity = "gramme";

    var randUnity = Math.floor(Math.random() * 3);

    rpn.forEach((element) => {
        if (isNumber(element) || element == "r") count++;
        if (isOp(element)) tmpOp.push(element);
    });

    if (count == 2 && !equation) {
        switch (tmpOp[0]) {
            case "+":
                ret = (
                    <div>
                        <p>
                            Vous pr??par??{" "}
                            {randRecette[3] == true ? "des " : "un/une "}{" "}
                            {randRecette[0]} vous avez besoin de{" "}
                            <strong>
                                {rpn[0]} {randGarniture}
                                {rpn[0] > 1 ? "s" : ""}
                            </strong>{" "}
                            pour un des ??l??ments composant le plat plus{" "}
                            <strong>
                                {rpn[1]} {model}
                                {rpn[1] > 1 ? "s" : ""}
                            </strong>
                        </p>
                        <p>Combien avez vous d'aliments au final ?</p>
                    </div>
                );
                break;
            case "-":
                ret = (
                    <div>
                        <p>
                            Vous avez actuellement{" "}
                            <strong>
                                {rpn[0]} {randGarniture}
                                {rpn[0] > 1 ? "s" : ""}
                            </strong>{" "}
                            et vous pr??par??{" "}
                            {randRecette[3] == true ? "des " : "un/une "}{" "}
                            {randRecette[0]} vous avez besoin de{" "}
                            <strong>
                                {rpn[1]} {randGarniture}
                                {rpn[1] > 1 ? "s" : ""}
                            </strong>{" "}
                            pour un des ??l??ments composant le plat
                        </p>
                        <p>
                            Combien vous reste t-il de {randGarniture}
                            {rpn[0] > 1 ? "s" : ""} ?
                        </p>
                    </div>
                );
                break;
            case "*":
                ret = (
                    <div>
                        <p>
                            Vous pr??par??{" "}
                            {randRecette[3] == true ? "des " : "un/une "}{" "}
                            {randRecette[0]} vous avez besoin de{" "}
                            <strong>
                                {rpn[0]} {randGarniture}
                                {rpn[0] > 1 ? "s" : ""}
                            </strong>{" "}
                            pour un des ??l??ments composant le plat, <br /> au
                            dernier on vous pr??viens que vous serez plus
                            nombreux pour le repas vous d??cidez alors de faire
                            le m??me plat {rpn[1]} fois
                        </p>
                        <p>
                            Combien vous faut t-il de {randGarniture}
                            {rpn[0] > 1 ? "s" : ""} pour pouvoir r??aliser tous
                            vos plats ?
                        </p>
                    </div>
                );
                break;
            case "/":
                ret = (
                    <div>
                        <p>
                            Se soir vous n'??tes pas nombreux. Votre recette
                            p??f??r?? semble trop copieuse vous d??cidez alors de
                            diviser par <strong>{rpn[1]} les quantit??s</strong>.
                        </p>
                        <p>
                            Votre recette,{" "}
                            {randRecette[3] == true ? "des " : "un/une "}{" "}
                            {randRecette[0]}
                            {randRecette[3] == true ? "s " : " "}, a besoin
                            normalement de{" "}
                            <strong>
                                {rpn[0]} {randGarniture}
                                {rpn[0] > 1 ? "s" : ""}
                            </strong>{" "}
                            pour sa r??alisation.
                        </p>
                        <p>
                            Combien vous faut t-il de {randGarniture}
                            {rpn[0] > 1 ? "s" : ""} pour pouvoir r??aliser votre
                            plats ?
                        </p>
                    </div>
                );
                break;
        }
    } else if (count == 2 && equation) {
        let randVers = Math.floor(Math.random() * 2);
        switch (tmpOp[0]) {
            case "+":
                ret = (
                    <div>
                        <p>
                            Vous pr??par??{" "}
                            {randRecette[3] == true ? "des " : "un/une "}{" "}
                            {randRecette[0]} vous avez besoin de{" "}
                            <strong>
                                {resultat} {randGarniture}
                                {rpn[0] > 1 ? "s" : ""}
                            </strong>{" "}
                            pour sa r??alisation vous en avais d??j?? sorti{" "}
                            <strong>{rpn[0]}</strong>
                        </p>
                        <p>Combien vous manque t'il de {randGarniture}s ?</p>
                    </div>
                );
                break;
            case "-":
                ret = (
                    <div>
                        <p>
                            Vous pr??par??{" "}
                            {randRecette[3] == true ? "des " : "un/une "}{" "}
                            {randRecette[0]} vous avez besoin de{" "}
                            <strong>
                                {resultat} {randGarniture}
                                {rpn[0] > 1 ? "s" : ""}
                            </strong>{" "}
                            pour sa r??alisation vous en avais d??j?? sorti{" "}
                            <strong>{rpn[0]}</strong>
                        </p>
                        <p>
                            Combien avez vous sorti de {randGarniture}s trop ?
                        </p>
                    </div>
                );
                break;
            case "*":
                if (randVers == 0) {
                    ret = (
                        <div>
                            <p>
                                Vous pr??par??{" "}
                                {randRecette[3] == true ? "des " : "un/une "}{" "}
                                {randRecette[0]} vous avez sorti{" "}
                                <strong>
                                    {resultat} {randGarniture}
                                    {rpn[0] > 1 ? "s" : ""}
                                </strong>{" "}
                                pour sa r??alisation mais vous en aviez besoin de{" "}
                                <strong>{rpn[0]}</strong>
                            </p>
                            <p>
                                Par combien devez vous multipliez le reste des
                                ingr??dients pour suivre la recette dans les m??me
                                proportions ?
                            </p>
                        </div>
                    );
                } else {
                    ret = (
                        <div>
                            <p>
                                Vous pr??par??{" "}
                                {randRecette[3] == true ? "des " : "un/une "}{" "}
                                {randRecette[0]} vous avez sorti{" "}
                                <strong>
                                    {resultat} {randGarniture}
                                    {rpn[0] > 1 ? "s" : ""}
                                </strong>{" "}
                                pour sa r??alisation mais vous en aviez besoin de{" "}
                                <strong>{rpn[0]}</strong>
                            </p>
                            <p>
                                Par combien avez vous multipliez la quantit?? ?
                            </p>
                        </div>
                    );
                }
                break;
            case "/":
                if (randVers == 0) {
                    ret = (
                        <div>
                            <p>
                                Vous pr??par??{" "}
                                {randRecette[3] == true ? "des " : "un/une "}{" "}
                                {randRecette[0]} vous avez sorti{" "}
                                <strong>
                                    {resultat} {randGarniture}
                                    {rpn[0] > 1 ? "s" : ""}
                                </strong>{" "}
                                pour sa r??alisation mais vous en aviez besoin de{" "}
                                <strong>{rpn[0]}</strong>
                            </p>
                            <p>
                                Par combien devez vous divisez le reste des
                                ingr??dients pour suivre la recette ?
                            </p>
                        </div>
                    );
                } else {
                    ret = (
                        <div>
                            <p>
                                Vous pr??par??{" "}
                                {randRecette[3] == true ? "des " : "un/une "}{" "}
                                {randRecette[0]} vous avez sorti{" "}
                                <strong>
                                    {resultat} {randGarniture}
                                    {rpn[0] > 1 ? "s" : ""}
                                </strong>{" "}
                                pour sa r??alisation mais vous en aviez besoin de{" "}
                                <strong>{rpn[0]}</strong>
                            </p>
                            <p>Par combien avez vous divisez la quantit?? ?</p>
                        </div>
                    );
                }

                break;
        }
    } else {
        let randDenom = Math.floor(Math.random() * 8);
        const denomination = [
            ["papa", "il"],
            ["maman", "elle"],
            ["grand fr??re", "il"],
            ["grande soeur", "elle"],
            ["oncle", "il"],
            ["tante", "elle"],
            ["grand m??re", "elle"],
            ["grand p??re", "il"],
        ];
        const smileSentences = [
            [
                "C'est bien jolie ! Mais vous ne connaissez pas la recette. Qu'elle id??e...",
                "C'est pas grave vous demandez ?? votre " +
                    denomination[randDenom][0] +
                    " de vous donnez la recette. Mais pour l'un des ingr??dients " +
                    denomination[randDenom][1] +
                    " vous donne " +
                    (equation ? "cette ??quation" : "ce calcule :") +
                    " compliqu?? ?? r??soudre",
            ],
            [
                "Ah ah vous vous lancez dans une recette compliqu??.",
                "Votre " +
                    denomination[randDenom][0] +
                    " vous a fait parvenir la recette. Mais pour trouver combien il vous faut de " +
                    randGarniture +
                    " " +
                    denomination[randDenom][1] +
                    " veut que vous resolviez " +
                    (equation ? "cette ??quation" : "ce calcule :"),
            ],
            [
                "Vous ??tes sur de vouloir faire cette recette ?",
                "Bien ! Mais je ne vais pas vous simplifiez la tache pour trouvez combien de  " +
                    randGarniture +
                    "s vous aurez besoin vous allez devoir faire " +
                    (equation ? "cette ??quation" : "ce calcule ") +
                    " pour moi.",
            ],
        ];
        let randSmile = Math.floor(Math.random() * 3);
        var smile = "";

        console.log(rpn);

        ret = (
            <div>
                <p>
                    Vous voulez pr??parer{" "}
                    {randRecette[3] == true ? "des " : "un/une "}{" "}
                    {randRecette[0]}. {smileSentences[randSmile][0]}
                </p>
                <p>{smileSentences[randSmile][1]}</p>
                <p>
                    <strong>
                        {translationRpn(rpn, letter)} ={" "}
                        {equation ? resultat : " ? "}
                    </strong>
                </p>
            </div>
        );
    }

    return ret;
};

const translationRpn = (rpn: any[], letter: string) => {
    var tempVar: any[] = [];
    var tempOp: any[] = [];
    var tempStr: string[] = [];
    let z = 0;
    if (rpn !== undefined) {
        for (let i = 0; i < rpn?.length; i++) {
            if (isNumber(rpn[i]) || rpn[i] === "r") {
                if (tempOp.length != 0) {
                    var str = "";
                    // if(tempVar.length > 1 || tempOp.length > tempVar.length)
                    //    str += " ( ";
                    tempOp.reverse();

                    while (tempVar.length !== 0) {
                        var a = tempVar.pop();
                        if (tempOp.length > 0 && tempVar.length > 0 && z == 0) {
                            var b = tempVar.pop();
                            str = str + b + " " + tempOp.pop() + " " + a + " ";
                            z++;
                        } else {
                            var op = tempOp.pop();
                            console.log(a, op);
                            if (
                                (tempOp[tempOp.length - 1] == "*" ||
                                    tempOp[tempOp.length - 1] == "*") &&
                                str != ""
                            )
                                str = " ( " + str + " ) ";
                            str = str + " " + op + " " + a + " ";
                        }
                    }
                    z = 0;
                    tempOp.reverse();
                    if (str.includes(" ( ")) str += " ) ";
                    if (tempOp.length >= 1) {
                        str = tempOp.pop() + " ( " + str + " ) ";
                    }
                    tempStr.push(str);
                }
                tempVar.push(rpn[i]);
            }

            if (isOp(rpn[i])) {
                tempOp.push(rpn[i]);
            }

            // console.log(translation);
            //  console.log(i)
        }
    }
    if (tempOp.length != 0) {
        var str = "";
        tempOp.reverse();
        while (tempVar.length !== 0) {
            var a = tempVar.pop();
            if (tempOp.length > 0 && tempVar.length > 0 && z == 0) {
                var b = tempVar.pop();
                str = str + b + " " + tempOp.pop() + " " + a + " ";
                z++;
            } else {
                str = str + " " + tempOp.pop() + " " + a + " ";
            }
        }
        z = 0;
        tempOp.reverse();

        if (tempOp.length >= 1) {
            str = tempOp.pop() + " ( " + str + " ) ";
        }

        tempStr.push(str);
    }

    var finalEq = "";

    for (let i = 0; i < tempStr.length; i++) {
        if (tempStr[i].startsWith("* ") || tempStr[i].startsWith("/ ")) {
            finalEq = " ( " + finalEq + " ) " + tempStr[i];
        } else {
            finalEq += tempStr[i];
        }
    }

    finalEq = finalEq.replace("r", letter);
    return finalEq;
};

export const isOp = (elem: any) => {
    switch (elem) {
        case "+":
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
/*
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
);*/

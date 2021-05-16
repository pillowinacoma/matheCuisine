import * as React from 'react';
import Board from "../components/board";
import Draggable from "../components/draggable";
import Cible from "../components/cible";
import { makeStyles } from "@material-ui/core";
import { isNumber } from 'util';

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

const Type1 = (props: {params: any, gen: any, setFinish: any, nbError:number, setNbError:any, solveur: any}) : JSX.Element => {

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
        setIncorrect(false);
        setReponse(event.target.value);
     /*   if(isNumber(reponse) && isNaN(reponse)) {
            setErrorFormat(true);
        }*/
    }

    const checkReponse = () => {
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
    };
    
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

const translationRpn = (rpn: any[], letter: string) => {

    var tempVar: any[] = [];
    var tempOp: any[]  = [];
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
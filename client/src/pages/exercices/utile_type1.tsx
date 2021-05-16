import { isNumber } from "util";
import { getRandomInt } from "./exercice";


export const translationRpn = (rpn: any[], letter: string) => {

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

export function selectOp(notions: Array<string>) {
    let randOp = Math.floor(getRandomInt(10));
    let choose = notions[randOp % notions.length];

    switch (choose) {
        case "addition":
            return "+";
        case "multiplication":
            return "*";
        case "division":
            return "/";
        case "soustraction":
            return "-";
        default:
            return "+";
    }
}

export const generator = (detail: any, difficulty: number) => {
    const vars: Array<any> = detail.vars;

    var maxRand = detail.maxRand;
    var generateVar: Array<any> = [];
    var rpn: any[] = [];
    var rpnTmpOp = [];

    var acceptBrackets = false;
    var openBrackets = 0;

    if (difficulty > 2) {
        acceptBrackets = true;
    }

    var restart = true;

    var r = parseFloat((Math.random() * (maxRand + 50)).toFixed(detail.acceptFloat ? 3 : 0));

    while (restart) {
        restart = false;
        generateVar = [];
        rpn = [];
        rpnTmpOp = [];

        for (let i = 0; i < vars.length; i++) {
            if (vars[i] === "r") {   
                generateVar.push("r");
            } else {
                let x = 1;
                if (detail.random) {
                    x = getRandomInt(maxRand);
                }

                generateVar.push(vars[i] * x);
            }

            if (i > 0) {
                let op = selectOp(detail.notions);
                switch (op) {
                    case "*":
                        // eslint-disable-next-line
                        for (const [key, value] of Object.entries(
                            generateVar
                        )) {
                            rpn.push(value);
                        }
                        // eslint-disable-next-line
                        for (const [key, value] of Object.entries(rpnTmpOp)) {
                            rpn.push(value);
                        }
                        generateVar = [];
                        rpnTmpOp = [];
                        rpn.push("*");
                        break;
                    case "/":
                        // eslint-disable-next-line
                        for (const [key, value] of Object.entries(
                            generateVar
                        )) {
                            rpn.push(value);
                        }
                        // eslint-disable-next-line
                        for (const [key, value] of Object.entries(rpnTmpOp)) {
                            rpn.push(value);
                        }
                        generateVar = [];
                        rpnTmpOp = [];
                        rpn.push("/");
                        break;
                    default:
                        rpnTmpOp.push(op);
                        break;
                }
            }
            if (acceptBrackets) {
                let rand = Math.floor(Math.random() * 10);
                if (rand >= 9 - 1 * difficulty) {
                    openBrackets++;
                }
            }

            if (openBrackets > 0) {
                let rand = Math.floor(Math.random() * 10);
                if (rand >= 5) {
                    openBrackets--;
                    // eslint-disable-next-line
                    for (const [key, value] of Object.entries(generateVar)) {
                        rpn.push(value);
                    }
                    // eslint-disable-next-line
                    for (const [key, value] of Object.entries(rpnTmpOp)) {
                        rpn.push(value);
                    }
                    generateVar = [];
                    rpnTmpOp = [];
                }
            }
        }

        if (generateVar.length !== 0) {
            // eslint-disable-next-line
            for (const [key, value] of Object.entries(generateVar)) {
                rpn.push(value);
            }
            if (rpnTmpOp.length === 0) {
                restart = true;
            } else {
                // eslint-disable-next-line
                for (const [key, value] of Object.entries(rpnTmpOp)) {
                    rpn.push(value);
                }
            }
        }
    }
    return {rpn, r};
};

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
export const calc = (a: number, b: number, op: any) => {
    switch (op) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return a / b;
        default:
            throw "je ne connais pas cette opérateur";
    }
};

export const solveur = (rpn: any[], attemptResult: number, reponse?: number): [boolean, number] => {
    var tempVar = [];
    var tmpResult = 0;
    var correct = false;
    var tmpR = attemptResult;
    if(reponse != undefined) {
        correct = attemptResult == reponse;
        tmpR = reponse;
    }

    for (let i = 0; i < rpn?.length; i++) {
        if (isNumber(rpn[i]) || rpn[i] === "r") {
            if(rpn[i] === "r") {
                tempVar.push(tmpR);
            } else {
                tempVar.push(rpn[i]);
            }

        }

        if(isOp(rpn[i]) && tempVar.length > 0) {
            let b = tempVar.pop();
            let a = tempVar.pop();
            let c = calc(a,b, rpn[i]);
            tempVar.push(c);
        }
    }   

    tmpResult = tempVar[0];

    if(!correct && reponse != undefined) {

        var [ok, res] = solveur(rpn, attemptResult);
        correct = (tmpResult == res);
    }

    return [
        correct,
        tmpResult
    ];
};

export const recCalc = (tabVar: any[], tabOp: any[]) : number => {
    var a = tabVar.pop();
    if(tabVar.length > 0) {
        var op = tabOp.pop();
        return calc(a,recCalc(tabVar, tabOp), op);
    }
    else
        return a; 

}
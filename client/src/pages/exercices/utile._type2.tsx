import { getRandomInt } from "./exercice";
import recette from '../../locales/recettes.json';

export const generateurTime = () => {


    var nbVar = 1 + getRandomInt(4);
    var nbVarUseless = getRandomInt(2);
    var values: [any, any, any, any][] = [];

    var recettes = recette.recettes;
    var startTime = {hour:getRandomInt(12), min: getRandomInt(59) };

    for(let i = 0; i < nbVar; i++) {
        let randRecette = getRandomInt(recettes.length);
        values.push([recettes[randRecette][0], recettes[randRecette][1], recettes[randRecette][2], recettes[randRecette][3] ] );
    }

    return {startTime, values};

}

export const solveurTime = (startTime: {hour:number, min: number},values: any[], reponse?: {hour: number, min: number}): [boolean,  {hour: number, min: number}] => {


    var endTime = {hour: startTime.hour, min: startTime.min}

    var correct = false;

    for(let i = 0; i < values.length; i++) {
        
        
        endTime.min += values[i][1] ;
        if(values[i][2] != undefined)
            endTime.min += + values[i][2];
        if(endTime.min > 59) {
            let reste = endTime.min % 60;
            let qoef = endTime.min / 60;
            endTime.hour += Math.floor(qoef);
            endTime.min = reste;
        }

    }

    if(endTime.hour > 23) {
        endTime.hour = endTime.hour % 24;
    }
    

    if(reponse != undefined) {

        correct = endTime.hour === reponse.hour && endTime.min === reponse.min;

    }

    console.log(endTime)

    return [correct, endTime];

}

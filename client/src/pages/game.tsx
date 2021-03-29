import * as React from 'react';
import Type1 from './exercices/type1';
import Type2 from './exercices/type2';



const selection : Array<any> = [
    Type1,
    Type2
];

const Game = (props: {id: number, difficulty: number}) => {

    var jsonName = "difficulty_" + props.difficulty;

    var json = require ('../locales/exercices/' + jsonName + '.json');
    
    var exName = "ex_" + props.id;

    var ex = json[exName];

    var SelectGame = selection[ex.type];

    return (

        <div>
            <SelectGame/>
        </div>

    );

}

export default Game;
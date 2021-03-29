import * as React from 'react';
import Type1 from './exercices/type1';
import Type2 from './exercices/type2';

const selection : Array<any> = [
    Type1,
    Type2
];

const Game = (props: {id: number}) => {

    

    const Select = selection[props.id];


    return (

        <div>
            <Select/>
        </div>

    );

}

export default Game;
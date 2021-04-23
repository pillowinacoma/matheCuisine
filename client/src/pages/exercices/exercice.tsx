import * as React from 'react';
import Type1 from './type1';
import Type2 from './type2';

const type = [
    Type1,
    Type2
];

const Exercice = (props: {difficulty: number, ex: string}) => {

    var json = require ('../../locales/exercices/difficulty_'+props.difficulty+'.json');

    let Type = type[json[props.ex].type]

    return (
        <div>
            <Type params={json[props.ex]}/>
        </div>
    );

}

export default Exercice;
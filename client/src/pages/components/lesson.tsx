import * as React from 'react';
import { makeStyles } from '@material-ui/core';


const useStyle = makeStyles((theme) => ({


}));


const Lesson = () => {

    const classes = useStyle();

    return (
        <div>
            <h1>Introduction</h1>
            <p>MatheCuisine est la pour vous aider à vous entrainer au calcule.</p>
            <p>Pour cela les première difficulté de nos exercices se centre sur les bases : addition, soustraction, multiplication et division</p>
            <p>Vous verrez ensuite comment réalisé des convertions mais aussi comment traité avec les heures.</p>
            <p>Toutes ses leçon vous permettrons de finir sur la réalisation d'équation plus compliqué réutilisant toutes les méthodes précédentes.</p>
            <h1>Les bases</h1>
            <Addition/>
            <Soustraction/>
            <Multiplication/>
            <Division/>
            <h1>Plus avancé</h1>
            <Conversion/>
            <Horraire/>
            <Equation/>

        </div>
    );

}

export default Lesson;

export const Addition = () => {

    const classes = useStyle();

    return (
        <div>
            <h2>Addition</h2>
            <p>Dans une formule du type 21,5 + 4,61 = 26,11 </p>
            <p>Les nombre présent à gauche de la formule sont appelé les  <strong>termes</strong>. Et le résultat à droite est appelé la <strong>somme</strong>.</p>
            <p>L'ordre des termes n'a pas d'importance dans la réalisation du calcule. Ce qui permet dans une somme avec plus d'éléments de regrouper les éléments qui vont bien ensemble.</p>
            <p>Par exemple si l'on cherche le résultat de la somme suivante :</p>
            <p> 5,1 + 10 + 4,9</p>
            <p>Pour trouver le résultat il nous faut cherche des valeur simple. On peut par exemple 5,1 et 4,9 ce qui nous donnera :</p>
            <p> 5,1 + 4,9 = 10</p>
            <p>Donc :</p>
            <p>(5,1 + 4,9) + 10 = 10 + 10 = 20</p>
        </div>
    );

}


export const Soustraction = () => {

    const classes = useStyle();

    return (
        <div>
            <h2>Soustraction</h2>
            <p>Dans une formule du type 10 - 5 = 5 </p>
            <p>Les nombre présent à gauche de la formule sont appelé les <strong>termes</strong>. Et le résultat à droite est appelé la <strong>différence</strong>.</p>
            <p>Contrairement à l'addition l'ordre des termes à une importance.</p>
            <p>Par exemple si l'on cherche le résultat de la différence suivante :</p>
            <p> 10 - 5 </p>
            <p>Nous obtenons <strong>5</strong> </p>
            <p>Mais si l'on recherche la différence suivante : 5 - 10; le résultat n'est plus le même (<strong>-5</strong> et non 5)</p>
        </div>
    );

}

export const Multiplication = () => {

    const classes = useStyle();

    return (
        <div>
            <h2>Multiplication</h2>
            <p></p>
        </div>
    );

}

export const Division = () => {

    const classes = useStyle();

    return (
        <div>
            <h2>Division</h2>
            <p></p>
        </div>
    );

}


export const Conversion = () => {

    const classes = useStyle();

    return (
        <div>
            <h2>Convertion</h2>
            <p></p>
        </div>
    );

}

export const Equation = () => {

    const classes = useStyle();

    return (
        <div>
            <h2>Equation</h2>
            <p></p>
        </div>
    );

}

export const Horraire = () => {

    const classes = useStyle();

    return (
        <div>
            <h2>Calcule avec les heures</h2>
            <p></p>
        </div>
    );

}


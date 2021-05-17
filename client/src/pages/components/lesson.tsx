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
            <p>Il s'agit ici de résoudre des calcules de la forme <strong>2 * 4</strong></p>
            <p>pour cela il faut connaitre ses tables de multiplication ou encore connaitre une méthode simple quoi que plus longue pour y résoudre.</p>
            <p>La méthode longue consiste simplement à prendre l'un des chiffre (le plus grand de préférence) et de l'additionner à lui même autant de fois que le second nombre nous le demande.</p>
            <p>On aura par exemple pour <strong>2 * 4</strong> : 4 + 4 = 8</p>
            <p>et pour <strong>3 * 6</strong> : 6 + 6 + 6 = <strong>18</strong></p>
        </div>
    );

}

export const Division = () => {

    const classes = useStyle();

    return (
        <div>
            <h2>Division</h2>
            <p>Nous cherchons à résoudre des calcules de la forme <strong>8 / 2</strong></p>
            <p>il faut tous simplement séparer huit en 2 par égale et donc la taille de ses part sera le résultat. Ici : <strong>4</strong></p>
        </div>
    );

}

export const Equation = () => {

    const classes = useStyle();

    return (
        <div>
            <h2>Equation</h2>
            <p>Le but d'une équation est de rechercher un inconnue pour cela il faudra savoir se servir correctement des opération vu avant.</p>
            <p>On cherche à trouver <strong>x</strong> dans : <strong>2 + x * 3 = 5</strong></p>
            <p>Lors de la résolution pour trouver <strong>x</strong> il faut vien faire attention aux priorité.</p>
            <p>Par exemple ici une façon de résoudre serait:</p>
            <ul>
                <li><span>2 + x * 3 = 5</span> </li>
                <li><span>x * 3 = 3</span> <span>(5 - 2)</span></li>
                <li><span>x = 1</span> <span>(3 / 3)</span></li>
            </ul>
        </div>
    );

}

export const Horraire = () => {

    const classes = useStyle();

    return (
        <div>
            <h2>Calcule avec les heures</h2>
            <p>Le calcule avec les horraire n'est pas forcément évident au début.</p>
            <p>Il y a quelque régles à retenir :</p>
            <ul>
                <li>dans une journée il y a 24 heures</li>
                <li>dans une heure il y a 60 minutes</li>
                <li>dans une minute il y a 60 secondes</li>
            </ul>
            <p>On comprend donc que lorsque l'on veut convertir 120 secondes, par exemples, on divise 120 par 60 ce qui nous donne 2. Donc 2 minutes</p>.
        </div>
    );

}


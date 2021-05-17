import * as React from 'react';
import { makeStyles } from '@material-ui/core';


const useStyle = makeStyles((theme) => ({


}));

const Help = () => {

    const classes = useStyle();

    return (
        <div>
            <h1>Fonctionnement du site</h1>
            <p>Si vous souhaitez vous entrainer à différents concepte mathématique vous êtes sur le von site.</p>
            <p>Notre site vous propose deux type d'éxercice, l'un sous forme de mini jeux et un autre sous une forme plus textuel.</p>
            <p>Les jeux sont disponible en cliquant sur le <strong>menu hamburger en gaut à gauche de l'écran</strong>.</p>
            <p>Pour les exercices un peu plus sérieux vous pouvez depuis votre menu ous rendre dans entrainement qui vous proposera différente difficulté et d'abroder différente notions.</p>
            <br/>
            <h1>Jeux de calcule</h1>
            <p>Les jeux protant sur le calcule fonctionne de la manière suivante.</p>
            <br/>
            <h1>Jeux avec horloge</h1>
            <p>Pour résoudre un jeux avec une horloge, lisez l'énoncé ! Et lorsque l'horloge arrive sur le résultat que vous attendez cliquez sur le bouton en haut de celle-ci.</p>
            <br/>
            <h1>Jeux avec des pancake</h1>
            <p>Les pancake, qui les aimes trop cuits ? Pour résoudre se genre d'éxercice vous allez devoir retourner autant de panckake que nécéssaire pour résoudre l'éxercice et ensuite valider votre réponse.</p>

        </div>
    );

}

export default Help;
# MatheCuisine

Ce projet a été réalisé sous le cadre de l'UE Logiciel Educatif (M1IF28) pour l'année 2020/2021.

Dans ce fichier README vous allez trouver une description générale du fonctionnement du site

## Technologies :

Ce projet est une Web App réalisé principalement en utilisant React et TypeScript, la mise en page du site on a utilisé materialUI en plus du CSS, et pour les jeux intercatifs on à utilisé a bibliothèque javaScript Three.js en plus du renderer react pour Three.Js : react-three-fiber

## `Fonctionnement`

### `Structure`

Tout d'abord, un système de connection permet à l'utilisateur de se connecter pour pouvoir acceder au logiciel, l'utilisateur se retrouve devant un menu qui contient des liens vers les differents parties du logiciel : 

+ Aide : partie qui explique le fonctionnement du logiciel et des jeux intercatifs.
+ Cours : explication brève des notions mathématiques interprétés.
+ Profile : profile de l'utilisateur, contiens des données sur les jeux et les exercices réalisés (temps moyen, erreur moyenne, nombre d'essays ...).
+ Entrainement : contient des exercices d'entrainement générés classés selon les notions et la difficulté.
+ Exercices : contient des jeux interactifs générés et classé selon la difficulté et les notion contenus.

### `Génération des jeux et d'entainements`
- les fichiers JSON contenus dans 'exercices' et 'trainings' [(ici)](https://forge.univ-lyon1.fr/p1509899/mathecuisine/-/tree/master/client/src/locales) contiennent les parametres à partir desquels le générateur génére les exercices, ces paramettres sont differents pour chaque type d'exercice mais en générale ils détérminent les notions abordés et la difficulté : 
+ pour les equations par exemple les parametres détérminerons si on peut avoir une solution décimale, negative, et la limite de la hauter des coefficients ... 

Après que le générateur génére le problème aléatoire avec les valeurs numeriques, un ennoncé est formulé sous forme de situation culinaire.

l'interface graphique est implementé differament selon le type de l'exercice/entrainement.

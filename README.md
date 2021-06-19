# MatheCuisine
 
Ce projet a été réalisé sous le cadre de l'UE Logiciel Educatif (M1IF28) pour l'année 2020/2021.
 
Dans ce fichier README vous allez trouver une description générale du fonctionnement du [site](https://mathecuisine.nidc.fr/)

[Video](https://www.youtube.com/watch?v=A2-dO3IXjho)
 
## Technologies :
 
Ce projet est une Web App réalisé principalement en utilisant React et TypeScript, la mise en page du site on a utilisé materialUI en plus du CSS, et pour les jeux interactifs on a utilisé la bibliothèque javaScript Three.js en plus du renderer react pour Three.Js : react-three-fiber
 
## `Fonctionnement`
 
### `Structure`
 
Tout d'abord, un système de connection permet à l'utilisateur de se connecter pour pouvoir accéder au logiciel, l'utilisateur se retrouve devant un menu qui contient des liens vers les differents parties du logiciel :
 
+ Aide : partie qui explique le fonctionnement du logiciel et des jeux interactifs.
+ Cours : explication brève des notions mathématiques interprétées.
+ Profil : profil de l'utilisateur, contient des données sur les jeux et les exercices réalisés (temps moyen, erreur moyenne, nombre d'essais ...).
+ Entrainement : contient des exercices d'entraînement générés classés selon les notions et la difficulté.
+ Exercices : contient des jeux interactifs générés et classés selon la difficulté et les notions contenus.
 
### `Génération des jeux et d'entraînements`
- les fichiers JSON contenus dans 'exercices' et 'trainings' [(ici)](https://forge.univ-lyon1.fr/p1509899/mathecuisine/-/tree/master/client/src/locales) contiennent les parametres à partir desquels le générateur génére les exercices, ces paramettres sont differents pour chaque type d'exercice mais en générale ils détérminent les notions abordés et la difficulté :
+ pour les équations par exemple les paramètres déterminerons si on peut avoir une solution décimale, négative, et la limite de la hauteur des coefficients ...
 
Après que le générateur génère le problème aléatoire avec les valeurs numériques, un énoncé est formulé sous forme de situation culinaire.
 
l'interface graphique est implémentée différemment selon le type de l'exercice/entraînement.

### `Répértoires`
pour vous aider à comprendre le code voici une description du contenu des differents répértoires : 
- ./client/src/components : composants visuels (navbar, sideBar ...) et leurs layout
- ./client/src/engine : 
    - profile : implementation d'un profile qui est exporté avec un povider pour que les composants en dessous puissent faire appel au fonctionnalités liés au profil
    - translation : moteur de traduction (EN/FR)
- ./client/src/locales/ : 
    - /exercices/ : parametres des exercices
    - /trainings/ : parametres des entrainements
    - /translation/ : dictionnaire pour les traductions (en construction)
    - recettes.json : recettes utilisées pour generer les ennoncés

- ./client/src/page/ : 
    - contient les composants pour les pages (connection, deconnection, profile ...)
    - /exercices : generateurs et solveurs des exercices et entrainements + logique, contient les composants exercices et entrainements
    - /components : composants 3d, et module d'aide personnalisé pour chaque notion 
- ./client/src/App.tsx : composant principal (router, layout ...)
- ./client/src/index.tsx : composant racine

 
 



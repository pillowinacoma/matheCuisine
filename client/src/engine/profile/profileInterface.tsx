import React from 'react'

export enum ActionType {
    CONNECT = 'CONNECT',
    DISCONNECT = 'DISCONNECT',
    ADD_SCORE = 'ADD_SCORE'
}

export interface UserState{
    login : string,
    score : number,
    doneExercises : Array<Exercice>
    //type : string,
    //profile : Profile
}

export interface Exercice{
    id : number,
    time : number, // time en ms
    score : number //score obtenue
}

export interface UserStateProps{
    children : React.ReactNode
}

export interface ConnexionAction{
    type : ActionType,
    payload : UserState
}

export interface ContextProps{
    state : UserState,
    dispatch : (payload : UserState) => any|null|undefined
}
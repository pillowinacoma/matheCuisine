import React from 'react'

export enum ActionType {
    SET_LOGIN = "SET_LOGIN",
    GET_LOGIN = "GET_LOGIN",
    GET_SCORE = "GET_SCODE",
    PLUS_SCORE = "PLUS_SCORE",
    MINUS_SCORE = "MINUS_SCORE",
    ADD_EXO = "ADD_EXO",
    GET_EXOS = "GET_EXOS"
}

export interface UserState {
    login: string,
    score: number,
    doneExos: Array<Exo>
    //type : string,
    //profile : Profile
}

export interface Exo {
    id: number,
    time: number, // time en ms
    score: number //score obtenue
}

export interface UserStateProps {
    children: React.ReactNode
}

export interface UserAction {
    type: ActionType,
    payload: UserState
}

export interface ContextProps {
    state: UserState;
    //dispatch : (payload : UserState) => any|null|undefined
    setLogin: (login: string) => string;
    plusScore: (pointsToAdd: number) => number;
    minusScore: (opintsToAbduct: number) => number;
    addExo: (exerciceToAdd: Exo) => Array<Exo>;
}
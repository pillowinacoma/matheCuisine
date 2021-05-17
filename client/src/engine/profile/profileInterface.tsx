import React from 'react'

export enum ActionType {
    SET_LOGIN = "SET_LOGIN",
    GET_LOGIN = "GET_LOGIN",
    ADD_EXO = "ADD_EXO",
    UPDATE_EXO = "UPDATE_EXO",
    GET_EXOS = "GET_EXOS",
    DELETE_LOGIN = "DELETE_LOGIN"
}

export interface UserState {
    login: string,
    score: number,
    doneExos: Exo[]
    //type : string,
    //profile : Profile
}

export interface Exo {
    id: string,
    count: number,
    time: number, // time en ms
    indices: number,
    errors: number
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
    setLogin: (login: string) => void;
    deleteLogin: () => void;
    addExo: (exoId: string, time: number, indices: number, errors: number) => void;
    updateExo: (exoId: string, time: number, indices: number, errors: number) => void;
}
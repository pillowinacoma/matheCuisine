import React from "react";
import { ActionType, ContextProps, UserAction, UserState, UserStateProps, Exo } from "./profileInterface";

const userReducer = (state: UserState, action: UserAction) => {
    switch (action.type) {
        case ActionType.SET_LOGIN:
            return {...state, login : action.payload.login};
        case ActionType.PLUS_SCORE:
            return {...state, score : state.score + action.payload.score}
        case ActionType.MINUS_SCORE:
            return {...state, score : state.score - action.payload.score}
        case ActionType.ADD_EXO:
            return {...state, doneExos : state.doneExos.concat(action.payload.doneExos)}
        case ActionType.DELETE_LOGIN:
            return action.payload;
        default:
            return state;
    }
}


const localStorageUser = localStorage.getItem('user');
const initialUser: UserState = localStorageUser ? JSON.parse(localStorageUser) : { login: "", score: 0, doneExos: [] };

export const UserContext = React.createContext({} as ContextProps);

const User: React.FC<UserStateProps> = ({ children }) => {
    const [state, dispatch] = React.useReducer(userReducer, initialUser);

    const setLogin = (newLogin: string) => {

        localStorage.setItem('user', JSON.stringify({...state, login : newLogin}));
        dispatch({
            type: ActionType.SET_LOGIN,
            payload: { ...initialUser, login: newLogin }
        });

    }

    const deleteLogin = () => {

        dispatch({
            type : ActionType.DELETE_LOGIN,
            payload : {login : "", score : 0, doneExos : []}
        })

        localStorage.removeItem('user');
    }

    const plusScore = (scoreToAdd : number) => {
        const initScoreUser = {...initialUser, score : scoreToAdd};

        dispatch({
            type : ActionType.PLUS_SCORE,
            payload : initScoreUser
        })

        return initScoreUser.score + initialUser.score;
    }

    const minusScore = (scoreToAdd : number) => {
        const initScoreUser = {...initialUser, score : scoreToAdd};

        dispatch({
            type : ActionType.PLUS_SCORE,
            payload : initScoreUser
        })

        return - initScoreUser.score + initialUser.score;
    }

    const addExo = (exerciceToAdd : Exo) => {
        const initExoUser = {...initialUser, doneExos : [exerciceToAdd]};

        dispatch({
            type : ActionType.PLUS_SCORE,
            payload : initExoUser
        })

        return initialUser.doneExos.concat(initExoUser.doneExos);
    }

    return (
        <UserContext.Provider value={{ state, setLogin, plusScore, minusScore, addExo, deleteLogin}}>
            {children}
        </UserContext.Provider>
    );
}

export default User;
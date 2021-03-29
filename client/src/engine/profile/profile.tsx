import React from "react";
import { ActionType, ContextProps, UserAction, UserState, UserStateProps, Exo } from "./profileInterface";

const userReducer = (state: UserState, action: UserAction) => {
    switch (action.type) {
        case ActionType.SET_LOGIN:
            state.login = action.payload.login;
            break;
        case ActionType.PLUS_SCORE:
            state.score += action.payload.score;
            break;
        case ActionType.MINUS_SCORE:
            state.score -= action.payload.score;
            break;
        case ActionType.ADD_EXO:
            state.doneExos.concat(action.payload.doneExos);
            break;
        case ActionType.DELETE_LOGIN:
            state = action.payload;
            break;
        default:
            break;
    }
    return state;
}

const initialUser: UserState = { login: "", score: 0, doneExos: [] };

export const UserContext = React.createContext({} as ContextProps);

const User: React.FC<UserStateProps> = ({ children }) => {
    const [state, dispatch] = React.useReducer(userReducer, initialUser);

    const setLogin = (newLogin: string) => {


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
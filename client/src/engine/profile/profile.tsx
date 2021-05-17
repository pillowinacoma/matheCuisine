import React from "react";
import { ActionType, ContextProps, UserAction, UserState, UserStateProps, Exo } from "./profileInterface";

const userReducer = (state: UserState, action: UserAction) => {
    switch (action.type) {
        case ActionType.SET_LOGIN:
            return {...state, login : action.payload.login};
        case ActionType.ADD_EXO:
            return {...state, doneExos : state.doneExos.concat(action.payload.doneExos)}
        case ActionType.UPDATE_EXO:
            return {
                ...state,
                doneExos: action.payload.doneExos
            };
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

    const addExo = (exoId: string, time: number, indices: number, errors: number) => {
        let exo = {id: exoId, count: 1, time: time, indices: indices, errors: errors};
        const initExoUser = {...initialUser, doneExos : [exo]};

        dispatch({
            type : ActionType.ADD_EXO,
            payload : initExoUser
        })

    }

    const updateExo = (exoId: string, time: number, indices: number, errors: number) => {

        let tmp = state.doneExos.filter((exo) => exo.id === exoId);

        let exo = tmp[0];

        if(exo != undefined) {

            exo.time = ((exo.time * exo.count) + time) / ((exo.count) + 1);
            exo.indices = ((exo.indices * exo.count) + indices) / ((exo.count) + 1);
            exo.errors = ((exo.errors * exo.count) + errors) / ((exo.count) + 1);
            exo.count++;

            let exos = state.doneExos.filter((exo) => exo.id !== exoId);

            exos.push(exo);
            let initExoUser = {...initialUser, doneExos : exos};
            dispatch({
                type: ActionType.UPDATE_EXO,
                payload: initExoUser
            });

        }

    }

    return (
        <UserContext.Provider value={{ state, setLogin, addExo, updateExo ,deleteLogin}}>
            {children}
        </UserContext.Provider>
    );
}

export default User;
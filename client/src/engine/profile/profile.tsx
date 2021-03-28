import React from "react";
import { ActionType, ConnexionAction, UserState } from "./profileInterface";

const userReducer = (state : UserState, action : ConnexionAction) => {
    switch (action.type) {
        case ActionType.CONNECT:
            
            break;
    
        default:
            return state;
    }
}
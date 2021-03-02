import * as React  from 'react';

export enum ActionType {
    SET_LANG = 'SET_LANG'
}

export interface LangState {
    language: string;
}

export interface LangStateProps {
    children: React.ReactNode;
}

export interface SetLangAction {
    type: typeof ActionType.SET_LANG;
    payload: string;
}

export interface ContextProps {
    state: LangState;
    setLanguage: (lang: string) => void;
    translate: (key: string) => string;
}
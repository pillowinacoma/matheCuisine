import * as React from 'react';
import {LangState, ActionType, LangStateProps, SetLangAction, ContextProps} from './i18nInterface';

import en from '../../locales/translation/en.json';
import fr from '../../locales/translation/fr.json';

const langReducer = (state: LangState, action: SetLangAction): LangState => {
    switch(action.type) {
        case ActionType.SET_LANG:
            return {
                language: action.payload
            }
        default:
            return state;
    }
}

const LocalStorageLang = localStorage.getItem('lang');
const initialState = {
    language: LocalStorageLang ? LocalStorageLang : "EN"
}

export const LangContext = React.createContext({} as ContextProps);

const I18n: React.FC<LangStateProps> = ({children}) => {
    const [state, dispatch] = React.useReducer(langReducer, initialState);
    const setLanguage = (lang: string) => {
        localStorage.setItem('lang', lang);
        dispatch({
            type: ActionType.SET_LANG,
            payload: lang
        })
    }

    const translate = (key: string): string => {
        const {language} = state;
        let data: {[key: string]: string} = {}

        switch(language) {
            case 'EN':
                data = en
                break;
            case 'FR':
                data = fr
                break;
            default:
                data = en;
                break;
        }

        return data[key];
    }

    return (
        <LangContext.Provider value={{state, setLanguage, translate}}>
            {children}
        </LangContext.Provider>
    );

}

export default I18n;
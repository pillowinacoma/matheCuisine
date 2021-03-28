import * as React from 'react';
import { Button, TextField } from '@material-ui/core';
import {LangContext} from '../engine/translation/i18n';


const Connection = () => {

    const {translate} = React.useContext(LangContext);

    const [login, setLogin] = React.useState("");
    const [error, setError] = React.useState("");
    
    const handleConnexion = () => {

    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    };

    return (
        <div>
            <TextField id="standard-basic" label={translate("loginDetail")} onChange={handleChange} autoComplete="off" placeholder="jean" error={error != "" ? true : false } helperText={error != "" ? error : ""}/>
            <Button variant="contained" color="primary" onClick={handleConnexion}>
                {translate('connection')}
            </Button>
        </div>
    );

}

export default Connection;
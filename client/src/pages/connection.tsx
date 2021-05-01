import * as React from 'react';
import { Button, TextField } from '@material-ui/core';
import {LangContext} from '../engine/translation/i18n';
import {UserContext} from '../engine/profile/profile'
import { Link } from 'react-router-dom';


const Connection = () => {

    const {translate} = React.useContext(LangContext);
    const {setLogin} = React.useContext(UserContext);

    const [login, changeLogin] = React.useState("");
    const [error] = React.useState("");
    
    const handleConnexion = () => {
        setLogin(login);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeLogin(event.target.value);
    };

    return (
        <div>
            <TextField id="standard-basic" label={translate("loginDetail")} onChange={handleChange} autoComplete="off" placeholder="jean" error={error !== "" ? true : false } helperText={error !== "" ? error : ""}/>
            <Button variant="contained" color="primary" onClick={handleConnexion} component={Link} to='/'>
                {translate('connection')}
            </Button>
        </div>
    );

}

export default Connection;
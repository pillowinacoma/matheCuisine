import * as React from 'react';
import {LangContext} from '../engine/translation/i18n';
import { Paper, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';


const Menu = () => {

    const {translate} = React.useContext(LangContext);

    return (
        <div>
            <Button>
                <Paper elevation={0} >
                    <h2>Profile</h2>
                    <span>progression</span>
                </Paper>
            </Button>
            <Button>
                <Paper elevation={0} >
                    <h2>Wikicuisine</h2>
                </Paper>
            </Button>
            <Button>
                <Paper elevation={0} >
                    <h2>{translate("help")}</h2>
                </Paper>
            </Button>
            <Button>
                <Paper elevation={0}>
                    <h2>{translate("begin")}</h2>
                </Paper>
            </Button>
            <Button>
                <Paper elevation={0}>
                    <h2>{translate("lesson")}</h2>
                </Paper>
            </Button>

        </div>
    );

}

export default Menu;
import * as React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, makeStyles, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { LangContext } from '../engine/translation/i18n';
import LanguageIcon from '@material-ui/icons/Language';

import { UserContext } from '../engine/profile/profile'
import { Link } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
    toolbar: {
        display: "flex",
        minHeight: 64,
        minWidth: "100%",
    },

    menuButton: {
        marginRight: theme.spacing(2),
    },


    title: {
        textAlign: "start",
        flexGrow: 1,
    },

    languageSection: {
        display: "flex",
        alignItems: "center",
        fontWeight: 600,
        color: "inherit",
    },
    languageIcon: {
        marginLeft: 5,
    }
}));

const NavBar = (props: { sideOpen: boolean, setSideOpen: any }): JSX.Element => {

    const classes = useStyle();

    const { setLanguage, state: { language }, translate } = React.useContext(LangContext);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const { state } = React.useContext(UserContext);

    const toogleSide = () => {
        props.setSideOpen(!props.sideOpen);
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (text: string) => {
        return (
            event: React.KeyboardEvent | React.MouseEvent,
        ) => {
            if (event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }
            setAnchorEl(null);
            setLanguage(text);
        }

    };


    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toogleSide}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        MatheCuisine
                    </Typography>

                    {state.login !== "" ?
                        <Typography>
                            login : {state.login}
                        </Typography> : ""
                    }

                    <Button className={classes.languageSection} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <span>{language}</span>
                        <LanguageIcon className={classes.languageIcon} />
                    </Button>
                    <Menu
                        elevation={0}
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        onClose={handleClose(language)}
                    >
                        <MenuItem onClick={handleClose("EN")}>ENG</MenuItem>
                        <MenuItem onClick={handleClose("FR")}>FR</MenuItem>
                    </Menu>
                    {state.login === "" ? 
                        <Button color="inherit" component={Link} to="/connect">{translate('login')}</Button>
                        :
                        <Button color="inherit" component={Link} to="/disconnect"> {translate('deconnection')}</Button>
                    }
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );

}

export default NavBar;
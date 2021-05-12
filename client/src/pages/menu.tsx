import * as React from 'react';
import {LangContext} from '../engine/translation/i18n';
import { Paper, Button, makeStyles, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide } from '@material-ui/core';
import { Link } from 'react-router-dom';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DoneIcon from '@material-ui/icons/Done';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import KitchenIcon from '@material-ui/icons/Kitchen';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import Help from './components/help';
import Lesson from './components/lesson';
const useStyle = makeStyles((theme) => ({
    page: {
        marginTop: 100,
        margin: "auto",
        width: "680px",
        padding: 10
    },
    logo: {
        fontSize: 60
    },
    button: {
        margin: 10,
        minWidth: 200,
        minHeight: 150,
        marginTop: 10,
        marginBottom: 10,
        border: "5px solid whitesmoke",
        textAlign: "center",
        "& h2": {
            margin: 0
        }
    },
    "a h2" : {
        "text-decoration": "inherit",
    },
    buttonDouble: {
        margin: 10,
        minWidth: 420,
        minHeight: 150,
        marginTop: 10,
        marginBottom: 10,
        border: "5px solid whitesmoke",
        "& h2": {
            margin: 0
        }
    }
}));

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Menu = () => {
    const classes = useStyle();
    const {translate} = React.useContext(LangContext);


    const [openHelp, setOpenHelp] = React.useState(false);
    const [openLesson, setOpenLesson] = React.useState(false);


    const handleClickHelp = () => {
        setOpenHelp(!openHelp);
    }

    const handleClickLesson = () => {
        setOpenLesson(!openLesson);
    }



    return (
        <Paper className={classes.page}>
            <Button className={classes.button}>
                <Paper elevation={0} >
                    <AccountBoxIcon className={classes.logo}/>
                    <h2>Profile</h2>
                    <span>progression</span>
                </Paper>
            </Button>
            <a href="https://fr.wikibooks.org/wiki/Catégorie:Recettes_de_cuisine_par_ingrédient" rel="noreferrer" target="_blank">
                <Button className={classes.buttonDouble}>
                    <Paper elevation={0} >
                        <KitchenIcon className={classes.logo}/>
                        <h2>Wikicuisine</h2>
                    </Paper>
                </Button>
            </a>
            <br/>
            <Button className={classes.button} onClick={handleClickHelp}>
                <Paper elevation={0} >
                    <EmojiObjectsIcon className={classes.logo}/>
                    <h2>{translate("help")}</h2>
                </Paper>
            </Button>
            <Button className={classes.button} component={Link} to={"/difficulty-1/Exercice-1"}>
                <Paper elevation={0}>
                    <DoneIcon className={classes.logo}/>
                    <h2>{translate("begin")}</h2>
                </Paper>
            </Button>
            <Button className={classes.button} onClick={handleClickLesson}>
                <Paper elevation={0}>
                    <MenuBookIcon className={classes.logo}/>
                    <h2>{translate("lesson")}</h2>
                </Paper>
            </Button>
            <Dialog
                open={openHelp}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClickHelp}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{translate("help")}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Help />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClickHelp} color="primary">
                    {translate("close")}
                </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openLesson}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClickLesson}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{translate("lesson")}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Lesson/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClickLesson} color="primary">
                    {translate("close")}
                </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );

}

export default Menu;
import * as React from 'react';
import { Drawer, Divider, Paper, List, ListItem, ListItemIcon, makeStyles, ListItemText } from '@material-ui/core';
import { LangContext } from '../engine/translation/i18n';
import { Link } from 'react-router-dom';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
    scrollBar: {
        height: "calc(100% - 300px)",
        maxHeight: "calc(100% - 300px)",
        "overflow": "auto",
        backgroundColor: "#EDBB99"
    },
    listItem: {
        width: "100%",
    },
    icon: {
        minWidth: 35,
    },
    fullList: {
        width: 'auto',
    },
    bottomList: {
        position: "relative",
        height: "calc(100% - (100% - 300px))",
        backgroundColor: "#A04000",
        color: "white"
    },
    infos: {
        textAlign: "left",
        fontSize: 12,
        marginTop: 20,
        "& p": {
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 16
        }
    },
    helpItem: {
        marginTop: 0,
        color: theme.palette.neutral.primary,
        display: "flex",
        alignItems: 'center',
        fontWeight: 600
    },
    helpIcon: {
        margin: 16,
        marginRight: 10,
        marginTop: 0,
        marginBottom: 3,
    },
    drawer: {
        top: 65,
        width: 200,
    },
}));
const Listing = (props: { classes: any, translate: any }) => {
    var json1 = require('../locales/exercices/difficulty_1.json');
    var json2 = require('../locales/exercices/difficulty_2.json');
    var json3 = require('../locales/exercices/difficulty_3.json');


    return (
        <Paper className={props.classes.scrollBar}>
            <List>
                {    
                    Object.entries(json1).map((element) => {
                        let key = element[0];
                        return (
                            <ListItem button component={Link} to={"/difficulty-1/"+key} className={props.classes.listItem} key={key} alignItems="center">
                                <ListItemText primary={key} />
                                <ListItemIcon className={props.classes.icon}><StarIcon/></ListItemIcon>
                            </ListItem>
                        );
                    
                    })
                 }{ Object.entries(json2).map((element) => {
                        let key = element[0];
                        return (
                            <ListItem button component={Link} to={"/difficulty-2/"+key} className={props.classes.listItem} key={key} alignItems="center">
                                <ListItemText primary={key} />
                                <ListItemIcon className={props.classes.icon}><StarIcon/><StarIcon/></ListItemIcon>
                            </ListItem>
                        );
                    
                    })}
                  {  Object.entries(json3).map((element) => {
                        let key = element[0];
                        return (
                            <ListItem button component={Link} to={"/difficulty-3/"+key} className={props.classes.listItem} key={key} alignItems="center">
                                <ListItemText primary={key} />
                                <ListItemIcon className={props.classes.icon}><StarIcon/><StarIcon/><StarIcon/></ListItemIcon>
                            </ListItem>
                        );
                    
                    })
                }
               
            </List>
        </Paper>
    );
};

const BottomList = (props: { classes: any, translate: (key: string) => string }) => (
    <div className={props.classes.bottomList}>
        <div className={props.classes.infos}>

            <p>Version: <strong>SBDA.03.2021</strong></p>
            <p>{props.translate("server")}: <strong>Artic.Edu</strong></p>
        </div>
    </div>
);

const SideBar = (props: { open: boolean }): JSX.Element => {

    const classes = useStyles();
    const { translate } = React.useContext(LangContext);

    return (
        <React.Fragment>
            <Drawer classes={{
                paper: classes.drawer,
            }} anchor={"left"} open={props.open} variant="persistent">
                <Listing classes={classes} translate={translate} />
                <Divider />
                <BottomList classes={classes} translate={translate} />
            </Drawer>
        </React.Fragment>
    );

}

export default SideBar;
import * as React from 'react';
import SideBar from './SideBar';
import NavBar from './NavBar';
import { UserContext } from '../engine/profile/profile';
import classes from '*.module.css';
import { makeStyles } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { LangContext } from '../engine/translation/i18n';

const useStyle = makeStyles((theme) => ({
    bg: {
        position: "fixed",
        top: 0,
        zIndex: -99,
        backgroundImage: "url(./backgroundFV.jpg)",
        backgroundSize: "100%",
        width: "100%",
        minHeight: "100vh"
    },
    glass:{
        position: "fixed",
        top: 0,
        zIndex: -98,
        backgroundImage: "url(./backgroundFV.jpg)",
        backgroundColor: "rgba(250,250,250,.5)",
        opacity: .7,
        backgroundSize: "100%",
        width: "100%",
        minHeight: "100vh",
        "filter": "blur(8px)",
        "-webkit-filter": "blur(8px)"
    },
    signalisation: {
        position: "absolute",
        marginTop: 10,
        display: "flex",
        fontSize: 30,
        fontWeight: 600,
        color: "whitesmoke",
        "& span": {
            marginLeft: 10,
            marginTop: 10,
        }
    },
    signIcon: {
        marginLeft: 10,
        fontSize: 50
    }
}));

const Layout = (props: {children: React.ReactNode | JSX.Element}): JSX.Element => {

    const classes = useStyle();
    const {translate} = React.useContext(LangContext);
    const [sideOpen, setSideOpen] = React.useState(false);
    const { state } = React.useContext(UserContext);
    return (
        <div>
            <NavBar sideOpen={sideOpen} setSideOpen={setSideOpen}/>
            {state.login != "" && !sideOpen ? <div className={classes.signalisation}><ArrowUpwardIcon className={classes.signIcon}/><span> {translate("yourex")}</span></div> : ""}
            {state.login != "" ? <SideBar open={sideOpen}/> : ""}
            <div className={classes.bg}>
                    
            </div>
            <div className={classes.glass}>
                    
            </div>
            {props.children}
        </div>
    );

}

export default Layout;

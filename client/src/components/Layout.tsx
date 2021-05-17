import * as React from 'react';
import SideBar from './SideBar';
import NavBar from './NavBar';
import { UserContext } from '../engine/profile/profile';
import classes from '*.module.css';
import { makeStyles } from '@material-ui/core';

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
    }
}));

const Layout = (props: {children: React.ReactNode | JSX.Element}): JSX.Element => {

    const classes = useStyle();

    const [sideOpen, setSideOpen] = React.useState(false);
    const { state } = React.useContext(UserContext);
    return (
        <div>
            <NavBar sideOpen={sideOpen} setSideOpen={setSideOpen}/>
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
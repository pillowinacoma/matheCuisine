import * as React from 'react';
import SideBar from './SideBar';
import NavBar from './NavBar';
import { UserContext } from '../engine/profile/profile';

const Layout = (props: {children: React.ReactNode | JSX.Element}): JSX.Element => {

    const [sideOpen, setSideOpen] = React.useState(false);
    const { state } = React.useContext(UserContext);
    return (
        <div>
            <NavBar sideOpen={sideOpen} setSideOpen={setSideOpen}/>
            {state.login != "" ? <SideBar open={sideOpen}/> : ""}
            {props.children}
        </div>
    );

}

export default Layout;
import * as React from 'react';
import SideBar from './SideBar';
import NavBar from './NavBar';

const Layout = (props: {children: React.ReactNode | JSX.Element}): JSX.Element => {

    const [sideOpen, setSideOpen] = React.useState(false);

    return (
        <div>
            <NavBar sideOpen={sideOpen} setSideOpen={setSideOpen}/>
            <SideBar open={sideOpen}/>
            {props.children}
        </div>
    );

}

export default Layout;
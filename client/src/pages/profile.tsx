import * as React from 'react';
import {LangContext} from '../engine/translation/i18n';

const Profile = () => {

    const {translate} = React.useContext(LangContext);

    return (
        <div>
            <h1>{translate("loginDetail")} : </h1>
            <span>Exp: / </span>

        </div>
    );

}

export default Profile;
import * as React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { LangContext } from "../engine/translation/i18n";
import { UserContext } from "../engine/profile/profile";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
    page: {
        width: 400,
        margin: "auto",
        marginTop: 100,
        display: "grid",
        padding: 30,
        backgroundColor: "whitesmoke",
        borderRadius: "20px",
    },
    button: {
        margin: "auto",
        marginTop: 15,
    },
}));

const Disconnection = () => {
    const { translate } = React.useContext(LangContext);
    const { deleteLogin } = React.useContext(UserContext);

    const handleConnexion = () => {
        deleteLogin();
    };

    const classes = useStyle();
    return (
        <div className={classes.page}>
            <h1>Au revoir</h1>
            <h4>
                Vous pouvez vous déconnecter en cliquant sur le boutton si
                dessous
            </h4>
            <Button
                variant="contained"
                color="primary"
                onClick={handleConnexion}
                component={Link}
                className={classes.button}
                to="/"
            >
                {translate("clickHere")}
            </Button>
        </div>
    );
};

export default Disconnection;

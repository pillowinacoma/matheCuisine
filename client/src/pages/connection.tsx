import * as React from "react";
import { Button, TextField, makeStyles } from "@material-ui/core";
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

const Connection = () => {
    const classes = useStyle();

    const { translate } = React.useContext(LangContext);
    const { setLogin } = React.useContext(UserContext);

    const [login, changeLogin] = React.useState("");
    const [error] = React.useState("");

    const handleConnexion = () => {
        setLogin(login);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeLogin(event.target.value);
    };

    return (
        <div className={classes.page}>
            <h1>Bienvenue sur MatheCuisine</h1>
            <h2>Pour continuer sur notre site veuillez vous identifier</h2>
            <TextField
                id="standard-basic"
                label={translate("loginDetail")}
                onChange={handleChange}
                autoComplete="off"
                placeholder="jean"
                error={error !== "" ? true : false}
                helperText={error !== "" ? error : ""}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleConnexion}
                component={Link}
                to="/"
                className={classes.button}
            >
                {translate("connection")}
            </Button>
        </div>
    );
};

export default Connection;

import * as React from "react";
import { LangContext } from "../engine/translation/i18n";
import { makeStyles } from "@material-ui/core";
import { UserContext } from "../engine/profile/profile";

const mockExos = [
    { id: "Exercice1", time: 21684, indices: 18, errors: 26, count: 100 },
    { id: "Exercice2", time: 24584, indices: 2, errors: 26, count: 100 },
    { id: "Exercice3", time: 27884, indices: 3, errors: 26, count: 100 },
    { id: "Exercice4", time: 22384, indices: 8, errors: 26, count: 100 },
    { id: "Exercice5", time: 21765, indices: 9, errors: 26, count: 100 },
];

const useStyle = makeStyles((theme) => ({
    page: {
        position: "relative",
        marginTop: 100,
        marginBottom: 100,
        margin: "auto",
        width: "860px",
        padding: 30,
        borderRadius: 10,
        "& *": {
            backgroundColor: "unset",
        },
    },
    glass: {
        width: "100%",
        left: -5,
        zIndex: -90,
        "box-shadow": "inset 0 0 2000px rgba(255, 255, 255, .5)",
        position: "absolute",
        backgroundColor: "rgba(251, 238, 230, 0.65)",
        height: "100%",
        filter: "blur(1px)",
    },
    table: {
        width: "100%",
        justifyContent: "start",
        "& thead": {
            width: "100%",
        },
        "border-collapse": "collapse",
    },
    Cell: {
        "text-align": "center",
    },
    Row: {
        borderBottom: "2px solid dimgray",
    },
}));

const Profile = () => {
    const { translate } = React.useContext(LangContext);
    const { state } = React.useContext(UserContext);
    const classes = useStyle();
    const exos = state.doneExos;
    console.log(state);

    return (
        <div className={classes.page}>
            <div className={classes.glass}></div>
            <h1>Bonjour {state.login} </h1>
            {exos.length !== 0 ? (
                <>
                    <h3>Voici votre profile</h3>
                    <p>
                        Vous trouverez si dessous les exercices que vousavez
                        r??alis?? avec quelques de details
                    </p>
                    <table className={classes.table}>
                        <thead>
                            <tr>
                                <th colSpan={2}>
                                    <h5>Id</h5>
                                </th>
                                <th colSpan={2}>
                                    <h5>Temps moyen</h5>
                                </th>
                                <th colSpan={2}>
                                    <h5>Indices utilis??s (moyenne)</h5>
                                </th>
                                <th colSpan={2}>
                                    <h5>Nombres d'erreur</h5>
                                </th>
                                <th colSpan={2}>
                                    <h5>R??p??titions</h5>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.doneExos.map((exo) => {
                                return (
                                    <tr className={classes.Row}>
                                        <th
                                            className={classes.Cell}
                                            colSpan={2}
                                        >
                                            {exo.id}
                                        </th>
                                        <td
                                            className={classes.Cell}
                                            colSpan={2}
                                        >
                                            {exo.time.toFixed(2)}s
                                        </td>
                                        <td
                                            className={classes.Cell}
                                            colSpan={2}
                                        >
                                            {exo.indices}
                                        </td>
                                        <td
                                            className={classes.Cell}
                                            colSpan={2}
                                        >
                                            {exo.errors}
                                        </td>
                                        <td
                                            className={classes.Cell}
                                            colSpan={2}
                                        >
                                            {exo.count}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </>
            ) : (
                <h3>Vous n'avez pas encore r??alis?? d'exercices</h3>
            )}
        </div>
    );
};

export default Profile;

import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Board from "../components/board";
import Clock from "../components/clock";
import Paquet from "../components/paquet";
import {Plus} from "../components/plus";

const Type3 = (props: { params: any }): JSX.Element => {
    return (
        <Board>
            <Suspense fallback={"loading"}>
                <Paquet
                    file="banana"
                    center={[0, 0, 0]}
                    dimensions={[1, 5, 16]}
                    distance={[10, 5, 5]}
                    scale={1}
                />

                <Plus/>

                <Paquet
                    file="banana"
                    center={[-40, 0, 0]}
                    dimensions={[2, 5, 16]}
                    distance={[20, 5, 5]}
                    scale={1}
                />
                <OrbitControls />
            </Suspense>
        </Board>
    );
};

export default Type3;

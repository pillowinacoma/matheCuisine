import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Board from "../components/board";
import Paquet from "../components/paquet";
import Draggable from "../components/draggable";
import PancakePan from "../components/pancakepan";
import Cible from "../components/cible";
import {
    Plus,
    Equals,
    Times,
    Minus,
    DividedBy,
} from "../components/operationSigns";

const Type3 = (props: { params: any }): JSX.Element => {
    const bananaMentions = (
        <Suspense fallback={"loading"}>
            <Paquet
                file="banana"
                center={[0, 0, 0]}
                dimensions={[5, 5, 1]}
                distance={[10, 5, 5]}
                scale={1}
            />

            <Times position={[-50, 20, 60]} size={15} />

            <Paquet
                file="banana"
                center={[-90, 0, 0]}
                dimensions={[5, 1, 5]}
                distance={[10, 5, 5]}
                scale={1}
            />
            <Equals position={[120, 10, 60]} size={15} />

            <Paquet
                file="banana"
                center={[100, 0, 0]}
                dimensions={[5, 5, 5]}
                distance={[10, 50, 5]}
                scale={1}
            />

            <OrbitControls />
        </Suspense>
    );

    return (
        <Board camera={{ position: [0, 0, 50] }}>
            <PancakePan dimensions={[6,5]} />
            <OrbitControls />
        </Board>
    );
};

export default Type3;

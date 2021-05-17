import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Billboard } from "@react-three/drei";

import imgExample from "../../img/nature.jpeg";

const BackgroundImage = ({ ...props }) => {
    const texture = useLoader(THREE.TextureLoader, props?.img ?? imgExample);
    return (
        <Billboard args={[0, 0]}>
            <mesh position={ props?.position ?? [0, 0, -100]}>
                <planeBufferGeometry attach="geometry" args={props?.args ?? [400, 400]} />
                <meshBasicMaterial
                    attach="material"
                    //@ts-ignore
                    map={texture}
                    toneMapped={false}
                />
            </mesh>
        </Billboard>
    );
};

export default BackgroundImage;

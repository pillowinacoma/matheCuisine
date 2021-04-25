import * as React from 'react';
import Board from '../components/board';

import {Model} from '../components/models';
import { Suspense } from 'react';
import { Vector3 } from 'three';
import { RenderCallback } from 'react-three-fiber';

const Type1 = () : JSX.Element => {


    const frame = (gltf: any) =>  {
        gltf.scene.rotateY(0.03);   
    }


    return (
        <Board>
                <Suspense fallback={'loading'}>
                    <Model file={"banana"} position={[0,0,0]} scale={[.75,.75,.75]} frame={frame}/>
                </Suspense>
        </Board>
    );

}

export default Type1;
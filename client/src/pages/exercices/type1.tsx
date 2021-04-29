import * as React from 'react';
import Board from '../components/board';

import {Model} from '../components/models';
import { Suspense, useRef } from 'react';
import { Vector3 } from 'three';
import { RenderCallback } from 'react-three-fiber';

const Type1 = () : JSX.Element => {

    const vars: Array<number> = [12,4,3];
    var coefResponse = 1;
    var response = -9999999;
    var eq = 0;
    vars.forEach(element => {
        eq += element;
    });

    eq += coefResponse * response;


    var resultat = 16;

    const frame = (gltf: any) =>  {
        gltf.scene.rotateY(0.03);   
    }
    const model1 = <Model file={"banana"} position={[-1,-1,0]} scale={[.75,.75,.75]} frame={frame}/>;
    const model2 = <Model file={"banana"} position={[2,2,2]} scale={[.5,.5,.5]} frame={frame}/>;
    return (
        <Board>
            <Suspense fallback={'loading'}>
                    {model1}
            </Suspense>
        </Board>
    );

}

export default Type1;
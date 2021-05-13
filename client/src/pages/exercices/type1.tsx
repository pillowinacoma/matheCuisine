import * as React from 'react';
import Board from '../components/board';

import {Model} from '../components/models';
import { Suspense } from 'react';

const Type1 = (props: {params: any, gen: any}) : JSX.Element => {

    const frame = (gltf: any) =>  {
        gltf.scene.rotateY(0.03);   
    }

    const model1 = <Model file={"banana"} position={[-1,-1,0]} scale={[.75,.75,.75]} frame={frame}/>;
    return (
        <Board>
            <Suspense fallback={'loading'}>
                    {model1}
            </Suspense>
        </Board>
    );

}

export default Type1;
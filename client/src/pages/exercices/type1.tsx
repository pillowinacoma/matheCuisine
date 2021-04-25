import * as React from 'react';
import Board from '../components/board';

import {Model} from '../components/models';
import { Suspense } from 'react';
import { Vector3 } from 'three';

const Type1 = () : JSX.Element => {





    return (
        <Board>
                <Suspense fallback={'loading'}>
                    <Model file={"banana"} position={[0,0,0]}/>
                </Suspense>
        </Board>
    );

}

export default Type1;
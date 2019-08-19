import React from 'react';
import { useRef, useLayoutEffect } from 'react';

const useAnimationCanvas = (draw: (conext: any) => void, contextType = '2d', contextAttributes = {}) => {
    const refCanvas = useRef<HTMLCanvasElement> (null);


    useLayoutEffect(() => {
        if (refCanvas && refCanvas.current) {
            const context = refCanvas.current.getContext(contextType, contextAttributes);
            
            const animationFrame = () => {
               draw(context);
               return requestAnimationFrame(animationFrame);
            }

            const animationFrameId = requestAnimationFrame(animationFrame);

            return () => cancelAnimationFrame(animationFrameId);
        }
    });

    return refCanvas;
}

export default useAnimationCanvas;
const Canvas = () => {
    const refCanvas = useAnimationCanvas((context) => {
        context.beginPath();
        context.arc((Math.random() * 800) + 1, (Math.random() * 800) + 1, 50, 0, 2 * Math.PI);
        context.stroke();
    });

    return <canvas ref={refCanvas} width={800} height={800} />
}

export default Canvas;
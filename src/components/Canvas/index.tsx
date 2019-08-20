import React from 'react';
import { useRef, useLayoutEffect } from 'react';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from 'settings';
import Snowflake from 'models/Snowflake';

const useAnimationCanvas = (draw: (conext: any) => void, contextType = '2d', contextAttributes = {}) => {
    const refCanvas = useRef<HTMLCanvasElement>(null);

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

const Canvas = () => {
    const flake = new Snowflake();

    const refCanvas = useAnimationCanvas((context) => {
        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        flake.render();

        context.fillStyle = `rgba(255, 255, 255, ${flake.alpha})`;
        context.beginPath();
        context.arc(
          flake.position.x, 
          flake.position.y,
          flake.radius,
          0,
          2 * Math.PI
        );
        context.fill();
  
    });

    return <canvas ref={refCanvas} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} style={{ backgroundColor: '#231f20'}} />
}

export default Canvas;

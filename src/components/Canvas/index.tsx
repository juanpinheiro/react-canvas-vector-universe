import React from 'react';
import { useRef, useLayoutEffect } from 'react';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from 'settings';
import Snowflake from 'models/Snowflake';
import Vector2 from 'models/Vector2';

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

const generateSnowflakes = () => {
    const TOTAL_SNOWFLAKES = 1000;
    const snowflakes: Snowflake[] = [];

    while (true) {
        snowflakes.push(new Snowflake());

        if (snowflakes.length >= TOTAL_SNOWFLAKES) {
            break;
        }
    }

    return snowflakes;
}

const Canvas = () => {
    const snowflakes = generateSnowflakes();

    const refCanvas = useAnimationCanvas((context) => {
        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        snowflakes.forEach((snowflake) => {
            snowflake.render();

            context.fillStyle = `rgba(255, 255, 255, ${snowflake.alpha})`;
            context.beginPath();
            context.arc(
              snowflake.position.x, 
              snowflake.position.y,
              snowflake.radius,
              0,
              2 * Math.PI
            );
            context.fill();
        });
  
    });

    const handleClick = (event: any) => {
        event.preventDefault();
        const normalized = Vector2.normalized(new Vector2(event.clientX, event.clientY));
        const scalar = 10;

        snowflakes.forEach((snowflake) => {
            snowflake.applyForce(new Vector2(scalar * normalized.x, scalar * normalized.y));
        })        
    }

    const handleRightClick = (event: any) => {
        event.preventDefault();

        const mouseVector = new Vector2(event.clientX, event.clientY);

        snowflakes.forEach(snowflake => {
            const force = snowflake.position.copy();
            force.decrement(mouseVector);
            force.scale(-1);
            force.scale(0.01);
            snowflake.applyForce(force);
          });
    }

    return <canvas 
                ref={refCanvas}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                style={{ backgroundColor: '#231f20'}} 
                onClick={handleClick}
                onContextMenu={handleRightClick}
            />
}

export default Canvas;

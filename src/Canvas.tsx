import { useEffect, useRef, useState } from "react";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<any>();
  const [pos, setPos] = useState<number[]>([]);
  const [rect, setRect] = useState<any[]>([]);
  const [isDraw, setIsDraw] = useState(false);
  const canvas = canvasRef.current;

  useEffect(() => {
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        setCtx(context);
      }
    }
  }, [canvas]);

  useEffect(() => {
    rect.forEach((item) => {
      if (!canvas) return;
      ctx.fillStyle = "red";
      ctx.fillRect(item.x, item.y, item.width, item.height);
    });
    console.log(rect);
  }, [rect, ctx, canvas]);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDraw(true);
    setPos([e.clientX, e.clientY]);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDraw || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "red";
    ctx.strokeRect(pos[0], pos[1], e.clientX - pos[0], e.clientY - pos[1]);
  };

  const onMouseUp = (e: React.MouseEvent) => {
    setIsDraw(false);
    setRect([
      ...rect,
      {
        x: pos[0],
        y: pos[1],
        width: e.clientX - pos[0],
        height: e.clientY - pos[1],
      },
    ]);
  };

  return (
    <canvas
      ref={canvasRef}
      width="500"
      height="500"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    />
  );
};

export default Canvas;

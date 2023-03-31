import { RootState } from "index";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDrawing } from "slices/modeSlice";
import useKeyboard from "./hooks/useKeyboard";

function Canvas() {
  useKeyboard();
  const dispatch = useDispatch();
  const { drawing } = useSelector((state: RootState) => state.mode);
  const [ctx, setCtx] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<any>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    setCtx(context);
  }, []);

  useEffect(() => {
    if (!ctx) return;
    if (points.length > 1) {
      ctx.strokeStyle = "slategray";
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
      }
      ctx.stroke();
      setPoints([]);
    }
  }, [drawing]);

  function handleMouseDown(event: React.MouseEvent<HTMLCanvasElement>) {
    if (!drawing) {
      console.log("click");
      dispatch(setDrawing(true));
    }
    setPoints([
      ...points,
      [event.nativeEvent.offsetX, event.nativeEvent.offsetY],
    ]);
  }

  function handleMouseMove(event: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current as HTMLCanvasElement;

    if (points.length > 0) {
      console.log("move");
      const prevPoint = points.slice(-1)[0];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 10;
      ctx.moveTo(prevPoint[0], prevPoint[1]);
      ctx.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
      ctx.stroke();
    }
  }

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      width={500}
      height={500}
    />
  );
}

export default Canvas;

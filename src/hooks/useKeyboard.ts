import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDrawing } from "slices/modeSlice";

export const useKeyboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        dispatch(setDrawing(false));
      }
    });
  }, []);
};

export default useKeyboard;

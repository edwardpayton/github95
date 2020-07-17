import React from "react";

export default function Avatar({ src }) {
  const refCanvas = React.useRef(undefined);

  React.useEffect(() => {
    const ctx = refCanvas.current.getContext("2d");
    const img = new Image();
    img.src = src;
    img.width = 60;
    img.height = 60;

    img.onload = () => {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, 60, 60);
    };
  }, [src]);

  return (
    <>
      <canvas
        ref={refCanvas}
        height="60"
        width="60"
        style={{
          width: 60,
          height: 60,
        }}
      />
    </>
  );
}

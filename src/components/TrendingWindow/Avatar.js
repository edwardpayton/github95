import React from "react";

export default function Avatar({ src }) {
  const refCanvas = React.useRef(undefined);

  React.useEffect(() => {
    const ctx = refCanvas.current.getContext("2d");
    const img = new Image();
    img.src = src;
    img.width = 50;
    img.height = 50;

    img.onload = () => {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, 50, 50);
    };
  }, [src]);

  return (
    <>
      <canvas
        ref={refCanvas}
        height="50"
        width="50"
        style={{
          width: 50,
          height: 50,
        }}
      />
    </>
  );
}

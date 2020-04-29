import React from "react";

export default function Desktop() {
  const aa = ["burger", "hotdog"];

  return (
    <section className="flex flex-column max-width-5 mx-auto">
      {aa.map((a) => (
        <div
          style={{
            width: "140px",
            height: "140px",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <img src="" alt="icon" />
          <p>{a}</p>
        </div>
      ))}
    </section>
  );
}

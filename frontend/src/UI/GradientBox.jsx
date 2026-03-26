"use client";

export default function GradientBox({
  children,
  className = "",
  backgroundImage, // ✅ add this prop
  backgroundGradient = `radial-gradient(circle at top left,
            rgba(165, 239, 255, 0.2) 0%,
            rgba(186, 131, 60, 0.2) 77%,
            rgba(186, 131, 60, 0.2) 100%
          )`,
  borderGradient1 = `radial-gradient(circle at top left,
            rgba(185, 131, 62, 0.7) 0%,
            rgba(186, 131, 60, 0.25) 100%
          )`,
  borderGradient2 = `radial-gradient(circle at top left,
    rgba(152, 249, 255, 1) 0%,
    rgba(255, 255, 255, 0) 100%
  )`,
}) {
  return (
    <div className={`relative rounded-xl overflow-hidden ${className}`}>
      {/* 🔹 Background image (lowest layer) */}
      {backgroundImage && (
        <div
          className="absolute inset-0 rounded-xl bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: "right bottom",
            backgroundSize: "auto 90px", // 👈 fixed height
          }}
        />
      )}



      {/* 🔹 Background gradient (overlays the image slightly) */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{ background: backgroundGradient }}
      />

      {/* 🔹 First border stroke */}
      <div
        className="absolute inset-0 rounded-xl p-[1px]"
        style={{
          background: borderGradient1,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* 🔹 Second border stroke */}
      <div
        className="absolute inset-0 rounded-xl p-[1px]"
        style={{
          background: borderGradient2,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* 🔹 Free content area */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

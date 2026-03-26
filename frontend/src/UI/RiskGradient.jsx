"use client";

export default function RiskGradient({
    children,
    className = "",
    backgroundImage, // ✅ add this prop
    backgroundGradient = `radial-gradient(
        circle at top left,
        rgba(165, 239, 255, 0.2) 0%,   /* #A5EFFF @ 20% */
        rgba(110, 191, 244, 0.2) 77%,  /* #6EBFF4 @ 20% */
        rgba(70, 144, 212, 0.2) 100%   /* #4690D4 @ 20% */
      )`,
    borderGradient1 = `radial-gradient(circle at top left,
  rgba(234, 191, 255, 1) 0%,
  rgba(135, 38, 183, 0) 100%
)`,

    borderGradient2 = `radial-gradient(circle at top left,
  rgba(152, 249, 255, 1) 0%,
  rgba(255, 255, 255, 0) 100%
)`,

}) {
    return (
        <div className={`relative rounded-xl overflow-hidden ${className} `}>
            {/* 🔹 Background image (lowest layer) */}
           



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

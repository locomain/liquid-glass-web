import React, { useEffect, useRef } from "react";

const LiquidGlass = ({ children, tint, radius, noShine = false, hover = false }) => {
  const ref = useRef();

  useEffect(() => {
    if (tint) {
      ref.current?.style.setProperty("--lg-tint", tint);
    }
    if (radius) {
      ref.current?.style.setProperty("--lg-radius", radius);
    }
  }, [tint, radius]);

  return (
    <div
      ref={ref}
      className={`liquid-glass ${hover ? "hover-enabled" : ""} ${noShine ? "no-shine" : ""}`}
    >
      <style>
        {`
          .liquid-glass {
            --lg-blur: 3px;
            --lg-radius: 2rem;
            --lg-padding: 0.6rem;
            --lg-gap: 8px;
            --lg-tint: rgba(255, 255, 255, 0.25);
            --lg-gloss: rgba(255, 255, 255, 0.5);
            --lg-shadow: 0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);
            --lg-transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);

            display: block;
            position: relative;
            border-radius: var(--lg-radius);
            overflow: hidden;
            cursor: pointer;
            isolation: isolate;
            color: black;
          }

          .liquid-glass .wrapper {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: var(--lg-gap);
            padding: var(--lg-padding);
            border-radius: inherit;
            transition: var(--lg-transition);
            box-shadow: var(--lg-shadow);
          }

          .liquid-glass .effect,
          .liquid-glass .tint,
          .liquid-glass .shine,
          .liquid-glass .content {
            position: absolute;
            inset: 0;
            border-radius: inherit;
          }

          .liquid-glass .effect {
            z-index: 0;
            backdrop-filter: blur(var(--lg-blur));
            filter: url(#glass-distortion);
            overflow: hidden;
          }

          .liquid-glass .tint {
            z-index: 1;
            background: var(--lg-tint);
          }

          .liquid-glass .shine {
            z-index: 2;
            box-shadow:
              inset 2px 2px 1px 0 var(--lg-gloss),
              inset -1px -1px 1px 1px var(--lg-gloss);
          }

          .liquid-glass .content {
            z-index: 3;
            position: relative;
          }

          .liquid-glass.no-shine .shine {
            display: none;
          }

          .liquid-glass.hover-enabled:hover .wrapper {
            padding: 0.8rem;
            border-radius: calc(var(--lg-radius) + 0.5rem);
          }

          @media (prefers-reduced-motion: reduce) {
            .liquid-glass {
              transition: none;
            }
          }
        `}
      </style>
      <svg style={{ display: "none" }}>
        <filter
          id="glass-distortion"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.001 0.005"
            numOctaves="1"
            seed="17"
            result="turbulence"
          />
          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>
          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
          <feSpecularLighting
            in="softMap"
            surfaceScale="5"
            specularConstant="1"
            specularExponent="100"
            lightingColor="white"
            result="specLight"
          >
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>
          <feComposite
            in="specLight"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litImage"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale="200"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <div className="wrapper">
        <div className="effect"></div>
        <div className="tint"></div>
        {!noShine && <div className="shine"></div>}
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default LiquidGlass;

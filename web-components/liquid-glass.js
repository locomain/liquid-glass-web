class LiquidGlass extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = `
      <style>
        :host {
          --lg-blur: 3px;
          --lg-radius: 2rem;
          --lg-padding: 0.6rem;
          --lg-gap: 8px;
          --lg-tint: rgba(255,255,255,.25);
          --lg-gloss: rgba(255,255,255,.5);
          --lg-shadow: 0 6px 6px rgba(0,0,0,.2), 0 0 20px rgba(0,0,0,.1);
          --lg-transition: all .4s cubic-bezier(.175,.885,.32,2.2);

          display: block;
          position: relative;
          border-radius: var(--lg-radius);
          overflow: hidden;
          cursor: pointer;
          isolation: isolate; 
          color: black;
        }

        .wrapper {
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

        .effect, .tint, .shine, .content {
          position: absolute;
          inset: 0;
          border-radius: inherit;
        }

        .effect {
          z-index: 0;
          backdrop-filter: blur(var(--lg-blur));
          filter: url(#glass-distortion);
          overflow: hidden;
        }

        .tint {
          z-index: 1;
          background: var(--lg-tint);
        }

        .shine {
          z-index: 2;
          box-shadow:
            inset 2px 2px 1px 0 var(--lg-gloss),
            inset -1px -1px 1px 1px var(--lg-gloss);
        }

        .content {
          z-index: 3;
          position: relative;
        }

        :host([no-shine]) .shine {
          display: none;
        }

        :host([hover]:hover) .wrapper {
          padding: 0.8rem;
          border-radius: calc(var(--lg-radius) + .5rem);
        }

        @media (prefers-reduced-motion: reduce) {
          :host { transition: none; }
        }
      </style>

    <svg style="display: none">
        <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
        <feTurbulence type="fractalNoise" baseFrequency="0.001 0.005" numOctaves="1" seed="17" result="turbulence" />

        <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
        </feComponentTransfer>

        <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />

        <feSpecularLighting in="softMap" surfaceScale="5" specularConstant="1" specularExponent="100"
            lighting-color="white" result="specLight">
            <fePointLight x="-200" y="-200" z="300" />
        </feSpecularLighting>

        <feComposite in="specLight" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litImage" />

        <feDisplacementMap in="SourceGraphic" in2="softMap" scale="200" xChannelSelector="R" yChannelSelector="G" />
        </filter>
    </svg>

    <div class="wrapper">
        <div class="effect"></div>
        <div class="tint"></div>
        <div class="shine"></div>
        <div class="content"><slot></slot></div>
    </div>
    `;
    }

    static get observedAttributes() { return ["tint", "radius"]; }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "tint") {
            this.style.setProperty("--lg-tint", newValue);
        }
        if (name === "radius") {
            this.style.setProperty("--lg-radius", newValue || "0");
        }
    }

}

if (!customElements.get("liquid-glass")) {
    customElements.define("liquid-glass", LiquidGlass);
}

# LiquidGlass UI Components

<p align="center">
  <img src="./example.gif" alt="LiquidGlass demo" style="max-width:320px;border-radius:16px;box-shadow:0 6px 24px rgba(0,0,0,.15);" />
  <br />
  <small>If the GIF doesn't load, <a href="./example.gif">download <code>example.gif</code></a>.</small>
</p><br />

**LiquidGlass** is a reusable UI component developed by [Studio Perrello](https://studioperrello.com) that adds a stunning, glass-like distortion and shine effect using SVG filters and modern CSS.

It's highly customizable and ideal for buttons, cards, menus, modals, or any UI element that deserves a refined, premium look.

> ❗ This component is proprietary. See [LICENSE](./LICENSE) for usage restrictions.

---

## 📦 Available Implementations

| Framework     | Status | Description                                               |
|---------------|--------|-----------------------------------------------------------|
| 🧩 Web Component | ✅     | Native `<liquid-glass>` custom element, usable anywhere   |
| ⚛️ React         | ✅     | Self-contained functional component (JS or TS)            |
| 🖼️ Vue 3         | ✅     | Standalone single-file component (Composition API)        |
| 🅰️ Angular       | ✅     | Reusable component with `@Input()` bindings (Angular 2+) |

---

## ⚙️ Installation & Usage

### 1. 🧩 Web Component

```html
<script type="module" src="glass.js"></script>

<liquid-glass tint="rgba(255,255,255,0.3)" radius="1.5rem" hover>
  <p>Hello glass world</p>
</liquid-glass>
````

#### Optional Attributes:

* `tint`: Background tint (e.g., `rgba(255,255,255,0.2)`)
* `radius`: Border radius (e.g., `2rem`)
* `hover`: Enables hover animation
* `no-shine`: Removes the glossy inner shine

---

### 2. ⚛️ React Component

#### Installation

Add the component file (`LiquidGlass.jsx`) to your project.

#### Usage

```jsx
import LiquidGlass from './LiquidGlass';

<LiquidGlass tint="rgba(255,255,255,0.3)" radius="1.5rem" hover noShine={false}>
  <p>Hello glass world</p>
</LiquidGlass>
```

---

### 3. 🖼️ Vue 3 Component

#### Installation

Add the component file (`LiquidGlass.vue`) to your project.

#### Usage

```vue
<script setup>
import LiquidGlass from './LiquidGlass.vue'
</script>

<template>
  <LiquidGlass tint="rgba(255,255,255,0.3)" radius="1.5rem" :hover="true" :noShine="false">
    <p>Hello glass world</p>
  </LiquidGlass>
</template>
```

---

### 4. 🅰️ Angular (2+) Component

#### Installation

Add the component file (`liquid-glass.component.ts`) to your project and declare it in a module.

```ts
import { LiquidGlassComponent } from './liquid-glass.component';

@NgModule({
  declarations: [LiquidGlassComponent],
  exports: [LiquidGlassComponent]
})
export class SharedModule {}
```

#### Usage

```html
<app-liquid-glass
  [tint]="'rgba(255,255,255,0.3)'"
  [radius]="'1.5rem'"
  [hover]="true"
  [noShine]="false"
>
  <p>Hello glass world</p>
</app-liquid-glass>
```

---

## 🎨 Customization

You can override the following CSS variables in **any implementation** (via props, styles, or inline):

| Variable          | Default                      | Description                 |
| ----------------- | ---------------------------- | --------------------------- |
| `--lg-tint`       | `rgba(255,255,255,0.25)`     | Background tint color       |
| `--lg-radius`     | `2rem`                       | Border radius               |
| `--lg-padding`    | `0.6rem`                     | Inner padding               |
| `--lg-gap`        | `8px`                        | Gap between elements inside |
| `--lg-gloss`      | `rgba(255,255,255,0.5)`      | Inner shine/gloss overlay   |
| `--lg-shadow`     | `0 6px 6px rgba(...)`        | Drop shadow styling         |
| `--lg-transition` | `all 0.4s cubic-bezier(...)` | Animation timing/easing     |
| `--lg-blur`       | `3px`                        | Background blur intensity   |

---

## 🧪 Demo

[Simple example](https://glass.studioperrello.com)
---

## 📄 License

This software is proprietary and not open-source.

You may **not** redistribute, resell, or reuse this component outside of approved usage or without express permission.

© [Studio Perrello](https://studioperrello.com)

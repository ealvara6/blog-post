# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

Photo by Lisa from Pexels: https://www.pexels.com/photo/photo-of-people-sitting-beside-glass-wall-1833320/
Photo by fauxels: https://www.pexels.com/photo/colleagues-shaking-each-other-s-hands-3184291/
Photo by Andrea Piacquadio: https://www.pexels.com/photo/woman-wearing-coat-762020/
Photo by LinkedIn Sales Navigator: https://www.pexels.com/photo/man-wearing-white-dress-shirt-and-black-blazer-2182970/
Photo by Thyrone Paas: https://www.pexels.com/photo/portrait-photo-of-man-1722198/
Photo by Simon Robben: https://www.pexels.com/photo/man-in-brown-polo-shirt-614810/
Photo by mododeolhar: https://www.pexels.com/photo/man-wearing-white-crew-neck-long-sleeved-top-3474629/
Photo by Andrea Piacquadio: https://www.pexels.com/photo/smiling-woman-in-gray-tank-top-3812720/
Photo by Jenna Hamra: https://www.pexels.com/photo/grayscale-photo-of-a-woman-1001180/
Photo by Andrea Piacquadio: https://www.pexels.com/photo/man-in-blue-crew-neck-shirt-3768689/
Photo by Anna Shvets: https://www.pexels.com/photo/positive-black-woman-looking-at-camera-5325840/
Photo by Muhd Emir: https://www.pexels.com/photo/woman-in-black-shirt-wearing-sunglasses-3796217/
Photo by Olena Bohovyk: https://www.pexels.com/photo/woman-with-nose-ring-3646160/
Photo by arwin waworuntu: https://www.pexels.com/photo/gothic-style-portrait-of-young-woman-in-bandung-33620754/

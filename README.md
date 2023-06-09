<p align="center">
  <a href="" alt="alt" width="500" />
  </a>
</p>

<h1 align="center">Weather App</h1>

Weather app built on top of [Open-Meteo](https://open-meteo.com/en/docs) APIs

<br />

## Preview

<img src="https://github.com/salihcodev/weather-app/blob/develop/src/assets/preview.gif?raw=true" width="100%" height="100%" />

</br>

## File Structure

### High level structure

```javascript

.../weather app
│
├── index.html
├── package.json
├── pnpm-lock.yaml
├── public
│   └── icon.svg
├── README.md
├── src
│   ├── assets
│   │
│   ├── common
│   │   ├── interfaces
│   │   │
│   │   ├── @types
│   │   │
│   │   ├── constants
│   │   │
│   │   ├── context
│   │   │  
│   │   ├── style
│   │   │
│   │   └── utils
│   │
│   ├── components
│   ├── views
│   │
│   ├── App.tsx
│   ├── main.tsx
│   │
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Generals

### How to run the application

First:

```bash
> pnpm install
```

[pnpm](https://pnpm.io/installation) has to be installed
in your machine or simply you can go with `yarn` or `npm`

Second:

```bash
> pnpm start:dev
```

Then the app should starts on [http://127.0.0.1:4000](http://127.0.0.1:4000)

### Project naming convention

- For naming files and directories i like to use **cabab-case**
- For naming functions, utilities i like to use **camelCase** is javascript used to be
- For naming interfaces, types i like to use **PascalCase**

<br>

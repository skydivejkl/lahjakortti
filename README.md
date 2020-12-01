# Gift Card PDF generator and emailer

Using node.js, Typescript, React and headless Chrome.

## Hacking

```
npm ci
```

Create `src/server/config.ts`

```tsx
export default {
    port: 3432,
    authKey: "nskweonrn32482SFKMWF",
    nodemailer: {
        name: "test",
        streamTransport: true,
        newline: "unix",
        buffer: true,
    },
};
```

Enable `http://localhost:8081/assets/bundle.js` in `public/index.html`

and start dev stuff

```
npm run dev
```

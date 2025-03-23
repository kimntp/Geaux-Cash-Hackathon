# How to Use

You must have both [Rust](https://www.rust-lang.org/) and [Node.js](https://nodejs.org/en/) installed.

```
npm add react react-bootstrap vite bootstrap
```

First boot up the Rust web server, then start the React client.

To run the server:

```
cargo run
```

To run the client:

```
cd client
npm run dev
```
Once both are running you can access the app on [http://localhost:5173/]()

```
cargo run -- --input=../fullstack-app/src/types.rs --output=../fullstack-app/client/src/types.d.ts
```
listening on 127.0.0.1:3000
```
Next start your front end Vite dev server.

_(Make sure you are in the `/fullstack-app/client` directory!)_

If you see any errors on these commands, double check again that you are running them from the directories listed above.

With both running visit the default Vite server URL/port at:

[http://localhost:5173/]()

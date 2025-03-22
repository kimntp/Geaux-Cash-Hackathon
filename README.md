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

The complete tutorial on how this project was built follows below:

# Contents

1. [Motivation](#motivation)
1. [Project Setup](#project-setup)
1. [Rust Server](#rust-server)
1. [React Client](#react-client)
1. [Add Styles](#add-styles)
1. [Conclusion](#conclusion)


We're going to keep it fairly simple for this demonstration, just a basic struct. You can add more complex types later if you like.

Now let's update our server code to include a GET route that returns a serialized vector of Person structs.

When this is deserialized in Typescript the front end should expect to receive an array of Person objects.

`fullstack-app/src/main.rs`

```rust
use axum::{http::StatusCode, response::IntoResponse, routing::get, Json, Router};
use std::net::SocketAddr;
use tower_http::cors::{Any, CorsLayer};

// NEW
mod types;
use types::Person;

#[tokio::main]
async fn main() {
    let cors = CorsLayer::new().allow_origin(Any);

    let app = Router::new()
        .route("/", get(root))

        // NEW
        .route("/people", get(get_people))
        .layer(cors);

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("listening on {}", addr);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn root() -> &'static str {
    "Hello, World!"
}

// NEW
async fn get_people() -> impl IntoResponse {
    let people = vec![
        Person {
            name: String::from("Person A"),
            age: 36,
            favourite_food: Some(String::from("Pizza")),
        },
        Person {
            name: String::from("Person B"),
            age: 5,
            favourite_food: Some(String::from("Broccoli")),
        },
        Person {
            name: String::from("Person C"),
            age: 100,
            favourite_food: None,
        },
    ];

    (StatusCode::OK, Json(people))
}

```

There are three blocks in the above I've annotated as `// NEW` to indicate the changes we have made to the origin example of `main.rs`.

We've imported the types from the `types.rs` file, created a new route function called `get_people` which returns a vector of example people as JSON (the `Json` struct takes care of the serialization for us using `serde` in the background).


```
cargo run -- --input=../fullstack-app/src/types.rs --output=../fullstack-app/client/src/types.d.ts
```


### Option 3: Run my Published Copy

If you didn't follow the previous tutorial you can [simply use mine](https://crates.io/crates/typester).

Just repeat `Option 2` with `typester` in place of `YOUR_TYPEGEN_PROGRAM`.

---

If all goes well you'll have a generated file with the following filename and content:

`client/src/types.d.ts`
```ts
type HashSet<T extends number | string> = Record<T, undefined>;
type HashMap<T extends number | string, U> = Record<T, U>;
type Vec<T> = Array<T>;
type Option<T> = T | undefined;
type Result<T, U> = T | U;

export interface Person {
  name: string;
  age: number;
  favourite_food: Option<string>;
}
```

With this type file in place you should no longer see any error in your `App.tsx` file and `person` should be correctly typed and identifiable as a `Person` by your IDE for type checking and intellisense.

Here's a look at how VS Code will interpret it:

![Type Hint Example](https://res.cloudinary.com/dqse2txyi/image/upload/v1666050136/axum_server/ts_example_chvbjf.png)

# Add Styles

Just before we test out the finished version live, let's just it a quick pass with some CSS and turn these people into some basic employee cards.

We'll be straight up pulling it directly from [this simple example here](https://www.w3schools.com/howto/howto_css_cards.asp):

Create a file called `App.css` directly beside `App.tsx` (or override the one that is included with the project by default) and add this CSS:

`client/src/App.css`
```css
.app {
  display: flex;
  flex-direction: row;
  column-gap: 16px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  max-width: 300px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.container {
  padding: 2px 16px;
}

img {
  width: 300px;
}
```

Next, update your `App.tsx` to include the following.  You can feel free to change the avatar URLs if you choose.  Make sure you don't miss the `import "App.css";` in there!


```
listening on 127.0.0.1:3000
```

Next start your front end Vite dev server.

_(Make sure you are in the `/fullstack-app/client` directory!)_

If you see any errors on these commands, double check again that you are running them from the directories listed above.

With both running visit the default Vite server URL/port at:

[http://localhost:5173/]()

use actix_web::{post, web, App, HttpServer, HttpResponse, Responder};
use serde::{Deserialize, Serialize};
use actix_cors::Cors;
use std::sync::{LazyLock, Mutex};

#[derive(Serialize, Deserialize, Default)]
struct SignUpRequest {
    first_name: String,
    last_name: String,
    email: String,
    password: String,
}

#[derive(Serialize, Deserialize, Default)]
struct MoneyGoalAndDate {
    money_goal: String,
    date: String,
}
type UserData = (SignUpRequest, MoneyGoalAndDate);

static DATABASE: LazyLock<Mutex<UserData>> = LazyLock::<Mutex<UserData>>::new(|| {
    Mutex::new((SignUpRequest::default(), MoneyGoalAndDate::default()))
});

#[post("/signup")]
async fn sign_up(sign_up_data: web::Json<SignUpRequest>) -> impl Responder {
    println!("Name: {} {}", sign_up_data.first_name, sign_up_data.last_name);
    println!("Email: {}", sign_up_data.email);
    println!("Password: {}", sign_up_data.password);

    DATABASE.lock().unwrap().0 = sign_up_data.0;

    HttpResponse::Ok().body("User signed up successfully!")
}

#[post("/money_goal_and_date")]
async fn money_goal_and_date(data: web::Json<MoneyGoalAndDate>) -> impl Responder {
    println!("Goal: {}; date: {}", data.money_goal, data.date);
    DATABASE.lock().unwrap().1 = data.0;

    HttpResponse::Ok().body("User inputted lies about their goals! :)")
}


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Setup HTTP server
    HttpServer::new(|| {
        App::new()
            .wrap(Cors::default()
            .allow_any_origin().allow_any_method().allow_any_header())
            .service(sign_up)
    })
    .bind("127.0.0.1:3000")?
    .run()
    .await
}

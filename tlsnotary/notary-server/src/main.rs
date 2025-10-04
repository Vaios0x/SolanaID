use axum::{
    extract::State,
    http::StatusCode,
    routing::{get, post},
    Json, Router,
};
use ed25519_dalek::{Keypair, Signer};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tlsn_notary::NotaryServer;
use tower_http::cors::{Any, CorsLayer};

#[derive(Clone)]
struct AppState {
    notary: Arc<NotaryServer>,
    keypair: Arc<Keypair>,
}

#[derive(Debug, Deserialize)]
struct NotarizeRequest {
    session_id: String,
    transcript_data: Vec<u8>,
}

#[derive(Debug, Serialize)]
struct NotarizeResponse {
    proof: Vec<u8>,
    signature: String,
    notary_pubkey: String,
}

#[tokio::main]
async fn main() {
    // Initialize tracing
    tracing_subscriber::fmt::init();

    // Generate or load notary keypair
    let keypair = Keypair::generate(&mut rand::rngs::OsRng);
    
    // Initialize TLSNotary server
    let notary = NotaryServer::new()
        .bind("0.0.0.0:7047")
        .build()
        .await
        .expect("Failed to start notary server");

    let state = AppState {
        notary: Arc::new(notary),
        keypair: Arc::new(keypair),
    };

    // CORS configuration
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    // Build router
    let app = Router::new()
        .route("/health", get(health_check))
        .route("/notarize", post(notarize))
        .route("/pubkey", get(get_pubkey))
        .layer(cors)
        .with_state(state);

    tracing::info!("Notary server listening on 0.0.0.0:7047");

    axum::Server::bind(&"0.0.0.0:7047".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn health_check() -> StatusCode {
    StatusCode::OK
}

async fn notarize(
    State(state): State<AppState>,
    Json(req): Json<NotarizeRequest>,
) -> Result<Json<NotarizeResponse>, StatusCode> {
    // Process TLS session and generate proof
    let proof = state
        .notary
        .notarize_session(&req.session_id, &req.transcript_data)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    // Sign the proof
    let signature = state.keypair.sign(&proof);
    
    Ok(Json(NotarizeResponse {
        proof: proof.clone(),
        signature: hex::encode(signature.to_bytes()),
        notary_pubkey: hex::encode(state.keypair.public.to_bytes()),
    }))
}

async fn get_pubkey(State(state): State<AppState>) -> String {
    hex::encode(state.keypair.public.to_bytes())
}

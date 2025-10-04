FROM rust:1.75-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    pkg-config \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy source code
COPY tlsnotary/notary-server/ .

# Build the application
RUN cargo build --release

# Expose port
EXPOSE 7047

# Run the application
CMD ["./target/release/solanaid-notary"]

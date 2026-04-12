# Kyber ML-KEM Messaging Stack

This project provides a C++20 implementation of a post-quantum secure messaging system using ML-KEM-768 (FIPS 203).

## Overview: ML-KEM (Kyber)

ML-KEM, originally known as Kyber, is a Module Lattice-based Key Encapsulation Mechanism. It is part of the FIPS 203 standard by NIST for post-quantum cryptography.

### How it Works
1.  Key Generation: The receiver generates a public key and a private key.
2.  Encapsulation: The sender uses the receiver's public key to generate a shared secret and an encapsulated key (ciphertext).
3.  Decapsulation: The receiver uses their private key and the encapsulated key to recover the same shared secret.

### Security
ML-KEM-768 is designed to be secure against both classical and quantum computers, providing a security level roughly equivalent to AES-192. It relies on the hardness of the Module Learning With Errors (M-LWE) problem.

## Features

- Standard Compliant: Strictly follows NIST FIPS 203 (Final Standard) for ML-KEM-768.
- Modern C++: Built with C++20, leveraging `std::span` and RAII.
- Secure Memory: `SecureBuffer` utility for automatic zeroization of sensitive material.
- Robust Protocol: AEAD (AES-256-GCM) and HKDF-SHA256 for symmetric data channel.
- Performance: High-efficiency NTT and polynomial arithmetic.
- Cross-Platform: Tested on Linux (Ubuntu 24.04).

## Project Structure

```text
Kyber/
├── apps/                # CLI applications (sender, receiver, demo)
├── benchmarks/          # Performance measurement suite
├── docs/                # Architecture and technical documentation
├── include/kyber/       # Public API headers
│   ├── crypto.h         # AEAD and KDF interfaces
│   ├── mlkem.h          # ML-KEM-768 implementation
│   ├── session.h        # Session management
│   ├── utils.h          # Buffer and security utilities
│   └── wire.h           # Wire format definitions
├── src/                 # Implementation files
│   ├── crypto/          # Cryptographic primitives (ML-KEM, AES-GCM, HKDF)
│   ├── protocol/        # Session and protocol logic
│   ├── serialization/   # Wire format serialization
│   └── utils/           # Randomness and hex utilities
├── tests/               # Unit test suite
└── CMakeLists.txt       # Build system configuration
```

## Installation & Building

### Prerequisites

- Compiler: GCC 11+ or Clang 13+ (supporting C++20).
- Libraries: OpenSSL 3.0 or higher.
- Build Tools: CMake 3.15+ (recommended) or manual compilation.

#### Ubuntu/Debian
```bash
sudo apt update
sudo apt install build-essential cmake libssl-dev
```

### Building with CMake (Recommended)

```bash
mkdir build && cd build
cmake ..
make
```

This will produce the following binaries:
- `kyber_receiver`: Receiver CLI
- `kyber_sender`: Sender CLI
- `kyber_demo`: End-to-end demonstration
- `unit_tests`: Test suite
- `benchmark_tool`: Performance benchmarks

### Manual Compilation

If you prefer to compile manually using `g++`:

```bash
# Compile Receiver
g++ -std=c++20 -O3 -Iinclude -Isrc src/utils/random.cpp src/crypto/aead/aes_gcm.cpp src/crypto/kdf/hkdf.cpp src/crypto/mlkem/mlkem.cpp src/protocol/session.cpp src/serialization/wire.cpp apps/receiver_cli.cpp -lssl -lcrypto -o kyber_receiver

# Compile Sender
g++ -std=c++20 -O3 -Iinclude -Isrc src/utils/random.cpp src/crypto/aead/aes_gcm.cpp src/crypto/kdf/hkdf.cpp src/crypto/mlkem/mlkem.cpp src/protocol/session.cpp src/serialization/wire.cpp apps/sender_cli.cpp -lssl -lcrypto -o kyber_sender
```

## Running the CLI Tools

1.  Terminal 1 (Receiver):
    ```bash
    ./kyber_receiver
    ```
    The receiver will output its Public Key in hex format. Copy it.

2.  Terminal 2 (Sender):
    ```bash
    ./kyber_sender
    ```
    - Paste the receiver's Public Key when prompted.
    - Type your message and press Enter.
    - The sender will output an Encrypted Message in hex. Copy it.

3.  Terminal 1 (Receiver):
    - Paste the Encrypted Message hex.
    - The receiver will decrypt and display the original message.

## Performance Results (Typical)

- ML-KEM-768 KeyGen: ~105 us
- ML-KEM-768 Encaps: ~100 us
- ML-KEM-768 Decaps: ~125 us
- E2E 1KB Message: ~270 us

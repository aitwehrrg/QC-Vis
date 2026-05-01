# ML-KEM (Kyber) Interactive Visualizer

**Visual Companion & Documentation Dashboard for FIPS 203 (ML-KEM)**

> [!IMPORTANT]
> This repository contains the **interactive visualizer and documentation site** for the ML-KEM algorithm. It is designed to explain and demonstrate the mathematical foundations of the project. The actual C++20 codebase for the "Quantum IRC" messaging system is maintained separately.

An interactive, high-fidelity visualization dashboard and simulation environment for understanding **ML-KEM (FIPS 203)**, the NIST-standardized Module-Lattice-Based Key-Encapsulation Mechanism. 

Developed as a student research project at **VJTI**, this project serves as the visual companion to a high-performance C++20 implementation of ML-KEM, providing an intuitive way to explore the mathematical foundations and protocol flows of post-quantum cryptography.

## Key Features

- **3D Lattice Simulation:** Interactive visualization of **Module-LWE (Learning With Errors)** using Three.js and React Three Fiber to demonstrate how secrets are hidden in mathematical noise.
- **Interactive Protocol Flow:** A condensed, step-by-step breakdown of the **KeyGen, Encapsulation, and Decapsulation** processes as defined in FIPS 203.
- **Cryptographic System Map:** A high-level overview of the full **Quantum IRC** messaging stack, illustrating the interplay between ML-KEM, HKDF-SHA256, and AES-256-GCM.
- **Real-time Math Rendering:** Mathematical foundations (Polynomial Rings, NTT, etc.) explained through live simulations and KaTeX-rendered equations.
- **Performance Insights:** Visualization of empirical benchmarks for ML-KEM-512, 768, and 1024 parameter sets based on typical Linux x86-64 performance.
- **Educational Glossary:** Deep-dive tooltips and documentation for cryptographic primitives, lattice theory, and FIPS 203 terminology.

## The Underlying Implementation

The visualizer documents a custom C++20 implementation of the **Kyber ML-KEM Messaging Stack** with the following properties:

- **FIPS 203 Compliance:** Implements the official NIST standard for Module-Lattice-Based Key Encapsulation.
- **Cryptographic Stack:**
    - **Key Encapsulation:** ML-KEM-768 (NIST Security Level 3, AES-192 equivalent).
    - **Key Derivation:** HKDF-SHA256.
    - **Message Encryption:** AES-256-GCM (Authenticated Encryption).
- **Security Architecture:**
    - **Constant-Time Execution:** Branchless logic for implicit rejection to mitigate timing side-channels.
    - **Self-Contained:** Zero external cryptographic dependencies for the ML-KEM core (includes a custom SHA-3/SHAKE implementation).
    - **Memory Safety:** No heap allocation in critical cryptographic paths (stack-allocated buffers only).

## Tech Stack (Visualizer)

- **Framework:** [Next.js](https://nextjs.org/) 16 (App Router)
- **Library:** [React 19](https://react.dev/)
- **3D Graphics:** [Three.js](https://threejs.org/) via [@react-three/fiber](https://github.com/pmndrs/react-three-fiber)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Animations:** [GSAP](https://greensock.com/gsap/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Mathematics:** [KaTeX](https://katex.org/)
- **Testing:** [Vitest](https://vitest.dev/)

## Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd QC-Vis
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Testing

The project uses Vitest for unit and component testing.

```bash
# Run all tests
npm run test:run

# Run tests in watch mode
npm run test

# Check coverage
npm run test -- --coverage
```

## Credits

This visualizer and the underlying cryptographic research were developed by:

- **Abhay Upadhyay** – ML-KEM-768 (FIPS 203) cryptographic library.
- **Rupak Gupta** – ML-KEM-768 (FIPS 203) cryptographic library.
- **Ghruank Kothare** – IRC protocol, server/client integration, and visualizer architecture.

## License

This project is licensed under the MIT License.

## References

- [NIST FIPS 203](https://doi.org/10.6028/NIST.FIPS.203) — ML-KEM Standard
- [CRYSTALS-Kyber](https://pq-crystals.org/kyber/) — Original specification
- [NIST SP 800-227](https://csrc.nist.gov/pubs/sp/800/227/ipd) — Migration Guidance

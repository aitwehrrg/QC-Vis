# ML-KEM (Kyber) Interactive Visualizer

An interactive, high-fidelity visualization dashboard and simulation environment for understanding **ML-KEM (FIPS 203)**, the NIST-standardized Module-Lattice-Based Key-Encapsulation Mechanism.

This project serves as the visual companion to a high-performance C++20 implementation of ML-KEM, providing an intuitive way to explore the mathematical foundations and protocol flows of post-quantum cryptography.

## Key Features

- **3D Lattice Simulation:** Interactive visualization of Module-LWE (Learning With Errors) using Three.js and React Three Fiber.
- **Interactive Protocol Flow:** Step-by-step breakdown of KeyGen, Encapsulation, and Decapsulation processes.
- **Cryptographic System Map:** A high-level overview of the full messaging stack, including KEM, HKDF-SHA256, and AES-256-GCM.
- **Real-time Math Rendering:** Mathematical foundations explained through live simulations and KaTeX-rendered equations.
- **Performance Insights:** Visualization of benchmarks for ML-KEM-512/768/1024 parameter sets.
- **Educational Glossary:** Deep-dive tooltips and documentation for cryptographic primitives and lattice theory.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **3D Graphics:** [Three.js](https://threejs.org/) via [@react-three/fiber](https://github.com/pmndrs/react-three-fiber) & [@react-three/drei](https://github.com/pmndrs/drei)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Animations:** [GSAP](https://greensock.com/gsap/) (GreenSock Animation Platform)
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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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

## Project Structure

- `app/`: Next.js App Router pages and layouts.
  - `components/`: Core UI components (Navigation, SystemMap, etc.).
  - `simulation/`: The 3D simulation environment and scene logic.
  - `lib/`: Cryptographic math, constants, and utilities.
- `tests/`: Vitest test suites.
- `public/`: Static assets and icons.

## License

This project is licensed under the MIT License.

# Learning Client-Side HTTP to Server Communication

This project demonstrates the evolution of client-server communication in TypeScript applications, starting from raw HTTP requests and progressively introducing higher-level abstractions.

## Project Structure

The repository is organized into stages, each building upon the previous one:

### Stage 1: Raw HTTP Fundamentals

-   Plain `XMLHttpRequest` and `fetch` API
-   Understanding HTTP methods, headers, and status codes
-   Manual error handling and request cancellation
-   Callback patterns and Promises

### Stage 2: Basic Abstractions

-   Creating reusable HTTP client wrappers
-   Type-safe request/response handling
-   Custom hooks for React applications
-   Simple caching mechanisms

### Stage 3: Intermediate Libraries

-   Axios and its ecosystem
-   SWR for data fetching
-   Basic state management with HTTP
-   Request middleware patterns

### Stage 4: Advanced Patterns

-   React Query / TanStack Query fundamentals
-   Optimistic updates
-   Advanced caching and invalidation
-   Request deduplication and retry logic

### Stage 5: Full-Stack Type Safety

-   Introduction to tRPC
-   End-to-end typesafe APIs
-   Schema validation with Zod
-   Comparison with GraphQL and REST

## Getting Started

Each stage has its own folder with a complete working project. To get started with any stage:

1. First, start the common backend server:

    ```
    cd server
    npm install
    npm run dev
    ```

2. Then, navigate to the stage directory of your choice:

    ```
    cd stage1-raw-http  # or stage2, stage3, etc.
    npm install
    npm start
    ```

3. Open your browser to the URL shown in the terminal (typically http://localhost:1234)

## Learning Path

This repository is designed to help you understand client-server communication from the ground up. The recommended approach is to:

1. Start with Stage 1 to understand the core concepts of HTTP requests
2. Progress through each stage sequentially
3. Complete the exercises in each stage's README
4. Compare implementations between stages to see how abstractions evolve

## Shared Backend Server

All stages use the same backend server located in the `server/` directory. This provides:

-   RESTful CRUD endpoints for todos and users
-   Consistent API structure across all stages
-   Simulated network conditions (delays, errors)
-   Proper HTTP status codes and response formats

## Development

If you want to modify or extend the projects:

1. Each stage is self-contained with its own package.json
2. TypeScript is used throughout for type safety
3. Parcel is used as a simple bundler for the client applications
4. Express.js powers the shared backend server

## Contributing

Feel free to submit issues or pull requests if you have suggestions for improvements or additional examples to include in the learning path.

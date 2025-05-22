# Stage 1: Raw HTTP Fundamentals

This project demonstrates the fundamentals of HTTP communication in the browser using the two primary APIs:

1. **XMLHttpRequest** - The original way to make HTTP requests in JavaScript
2. **Fetch API** - The modern approach introduced in ES6

## Learning Objectives

-   Understand the basic structure of HTTP requests and responses
-   Learn how to use XMLHttpRequest with callback patterns
-   Master the Fetch API with Promises and async/await
-   Implement proper error handling for network requests
-   Handle request cancellation and timeouts
-   Work with different HTTP methods (GET, POST, PUT, DELETE)

## Getting Started

1. Start the backend server:

    ```
    cd ../server
    npm run dev
    ```

2. Start the frontend application:

    ```
    npm start
    ```

3. Open your browser to http://localhost:1234

## Application Structure

-   `index.html` - Main HTML structure with UI controls
-   `index.ts` - Entry point and shared utilities
-   `types.ts` - TypeScript interfaces for data models
-   `xhr.ts` - XMLHttpRequest implementation
-   `fetch.ts` - Fetch API implementation
-   `styles.css` - Basic styling

## Key Concepts

### XMLHttpRequest

-   Event-based API (onload, onerror, etc.)
-   Synchronous or asynchronous operation
-   Manual handling of request lifecycle
-   Built-in timeout and abort capabilities
-   Requires manual JSON parsing

### Fetch API

-   Promise-based API
-   More concise syntax
-   Built-in JSON methods
-   AbortController for cancellation
-   Separates network errors from HTTP status errors

## Exercises

1. Try modifying both implementations to add request headers
2. Implement request throttling to prevent excessive API calls
3. Add a loading indicator during active requests
4. Create a retry mechanism for failed requests
5. Implement a basic caching system for GET requests

## Next Steps

Once you're comfortable with these raw HTTP concepts, proceed to Stage 2 to learn about creating reusable abstractions on top of these APIs.

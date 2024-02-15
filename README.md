# Chatzie

A Todo app on the edge created with Next.js 14 and TRPC. Each authenticated user has their own Task list with optimistic updates. 

Typical edge runtime apps have to make requests to a non-edge database which nullifies the speed advantage. However, In this app thanks to Turso and edge caching, both the application and the database leverages edge computing without the compomises.

## Features

   - Edge Runtime
   - SSR
   - Authentication
   - End-to-end Typesafety
   - Sophisticated Data Fetching
   - Optimistic Updates for smoother UX
   - Good Folder Structure and File Naming Conventions
   - Clear Development and Production Enviorment Distinction with Scripts
  
## Technologies Used

   - Next.js 14
   - tRPC
   - React Query for State Management, Data Fetching and Caching
   - Clerk for Authentication
   - Turso for DB on the Edge
   - Drizzle ORM & Kit
   - Typescript
   - TailwindCSS for styling
   - Zod for data validation and Typesafety

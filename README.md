# authentication-system-ts

A TypeScript-based authentication system built with modern web technologies.

## Tech Stack

- **Runtime**: [Bun](https://bun.com) - Fast all-in-one JavaScript runtime
- **Language**: TypeScript 5
- **Backend Framework**: Express.js 5.x
- **Database**: PostgreSQL 17 with [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Environment Management**: dotenv

## Quick Start

Install dependencies:

```bash
bun install
```

Run development server:

```bash
bun run dev
```

Build:

```bash
bun run build
```

Database:

```bash
bun db:generate   # Generate migrations
bun db:migrate    # Run migrations
bun studio        # Open Drizzle Studio
```

# Next.js Authentication Template with Routing

This project is a template for a Next.js application that includes authentication features with routing. Users can register and log in using credentials or third-party providers such as Google, GitHub, Apple, Facebook, etc, and protected routes are implemented using middleware. The template utilizes a PostgreSQL database and is built using Prisma.

## Getting Started

To get started with this template, follow the steps below:

### Clone the Repository

```
git clone https://github.com/your-username/nextjs-auth-routing.git
```

### Install Dependencies

Navigate to the project directory and install the required packages:

```
cd nextjs-auth-routing
npm install
```

### Set Up Environment Variables

Create a `.env` file in the project root directory and configure the following environment variables.

```
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=

NEXTAUTH_SECRET=
```

And the providers needed:

```
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=

APPLE_ID=
APPLE_SECRET=
```

### Set Up Prisma

Apply the database schema and migrations using the following command:

```
npx prisma db push
```

### Start the Application

Start the Next.js development server with the following command:

```
npm run dev
```

The application will be accessible at `http://localhost:3000` in your web browser.

## Protected Routes

This template uses middleware provided by Next.js to protect certain routes. The `next-auth/middleware` module is used to handle authentication and protect routes. By default, all routes except `/register`, `/api/*`, and `/login` are protected. You can customize the protected routes by modifying the `config` object in the `middleware.ts` file located on the root:

```
export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/((?!register|api|login).*)"],
};
```

The `matcher` array uses regular expressions to define which routes should be protected. You can modify the regular expression pattern to suit your specific needs.

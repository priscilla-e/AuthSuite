# Robin

Robin is a Next.js application that utilizes the NextAuth for authentication.

Topics covered: 
1. **Part 1 - Setting of NextAuth v4 with OAuth Providers (Google & Github)**
2. **Part 2 -  Setting of NextAuth v4 with Credentials Provider**
3. **Part 3 - Protecting Routes (Middleware)**

## Part 1 -  Setting of NextAuth v4 with OAuth Providers!

As of February 5 2024, the NextAuth documentation is a hot mess! NextAuth is currently transitioning to Auth.js, so everything about it is a bit disorganized. The most common confusion is deciding whether to stick with the old NextAuth v4 or use the NextAuth v5@beta(or is it Auth.js now?) I'm still confused. I will be sticking with the old stable version (v4). 

NOTE: This guide is tailored for the Next.js App router setup, which differs slightly from the old Pages router configuration. If you need to set this up Pages router, please refer to the original video tutorial in the resources section below.

### 1. Install NextAuth
Begin by installing NextAuth in your project:

```bash
  npm i next-auth
```

### 2. Set up relevant Environment variables
For OAuth Providers like Google and GitHub, your .env file should be configured as follows:
```text
NEXTAUTH_SECRET=secret-key
NEXTAUTH_URL=https://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

If you are not sure how to obtain these keys, i've tried my best to document it below:

**NEXTAUTH_SECRET**  
This key secures your sessions. Generate it using OpenSSL with the command:
```bash
openssl rand -base64 32
```
Alternatively, you can use any secure string generator.

**NEXTAUTH_URL**  
Set this to your deployment URL or http://localhost:3000 for local development.

**GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET**  
Required for Google authentication. Create a project on the Google Cloud Platform and configure OAuth credentials:

https://console.developers.google.com/apis/credentials

Ensure your OAuth consent screen is configured and add the appropriate redirect URI:
* For production: `https://{YOUR_DOMAIN}/api/auth/callback/google`
* For development: `http://localhost:3000/api/auth/callback/google`

**GITHUB_CLIENT_ID & GITHUB_CLIENT_SECRET**  
For GitHub OAuth, create a new OAuth app at:  
[GitHub OAuth Apps](https://github.com/settings/apps)

Set the Authorization callback URL fieldto:
* For production: `https://{YOUR_DOMAIN}/api/auth/callback`
* For development: `http://localhost:3000/api/auth/callback`


### 3. Define AuthOptions Configuration file
First, ensure you have the correct imports in your auth-options.ts file. You can name this file what ever you want, just remember to export authOptions.

```typescript
// app/lib/auth-options.ts

import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  // Configure one or more authentication providers and or adapter
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
}
```

### 4. Add NextAuth API Route Handler
Create new endpoint `app/api/auth/[...nextauth]/route.ts`. The allows NextAuth to create relevant auth routes. 
All requests to /api/auth/* (signIn, callback, signOut, etc.) will automatically be handled by this route handler.

```typescript
// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import authOptions from "@/app/lib/auth-options";

const handler =  NextAuth(authOptions);

export {handler as GET, handler as POST};
```

Here is a list some some of the primary routes created and managed by NextAuth, along with their purposes:

1. `/api/auth/signin`: The route for the sign-in page, where users can choose an authentication provider.

2. `/api/auth/signout`: The route that handles sign-out. It can redirect users to a sign-out page that confirms they have been signed out or directly sign them out.

3. `/api/auth/session`: Returns the current session state. Useful for client-side checks to see if the user is signed in and to retrieve user session information.

4. `/api/auth/callback/:provider`: The callback route for authentication providers. After successfully authenticating with an external provider (e.g., Google, GitHub), the user is redirected back to 

There are other... refer to NextAuth documentation:)

**OPTIONAL: Create custom auth pages: ** 
To customize the behavior or appearance of some of these routes (such as the sign-in or sign-out pages), you can use the pages option in your NextAuth configuration. This allows you to specify custom URLs for these pages, giving you control over the user experience without having to manage the underlying logic.

```typescript
// app/lib/auth-options.ts
pages: {
  signIn: '/login',  // Custom sign-in page
  signOut: '/signout', // Custom sign-out page
  error: '/error', // Custom error page
}
```

### 5. Add Session Provider Component

To access the authentication session on the client we need to wrap our entire application with the next-auth SessionProvider component. This component uses React Context to pass the session down to all our components.

To achieve this in Next.js 13 and above, we will need to create a seperate client component since we cannot convert the RootLayout into a client component. 

Create a wrapper AuthProvider client component as follows:

```typescript
// app/auth-provider.tsx

"use client";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

const AuthProvider = ({ children }: PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
```

Now add the custom auth provider to your RootLayout.

```typescript
// app/layout.tsx

import AuthProvider from "./auth-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
```

**NOTE:** With this you have successfully configured authentication for your app using OAuth providers. 
If you don't need to persist your user data in a database, feel free to skip `Step 6. Configure Adapters`


### 6. Configure Adapters (Prisma Adapter With MongoDB)

Adapters play a crucial role in NextAuth by enabling the persistence of user data and session information in your database after users log in to your application. They serve as a bridge between NextAuth and various types of databases, ensuring that user sessions are managed efficiently and securely.

NextAuth supports a variety of adapters for different databases and ORMs, allowing you to choose one that matches your project's database engine. For an up-to-date list of supported adapters and their documentation, refer to the NextAuth documentation on adapters:

[NextAuth.js Adapters Documentation](https://next-auth.js.org/adapters)

**Step 1: Install Prisma and NextAuth Prisma Adapter**
First, add Prisma to your project along with the Prisma Client. You also need to install the NextAuth Prisma Adapter.

```bash
npm install prisma --save-dev
npm install @prisma/client
npm install @next-auth/prisma-adapter
```

**Step 2: Initialize Prisma**
Use the Prisma CLI to initialize Prisma in your project. This command creates a new Prisma configuration file.
```bash
npx prisma init
```

**Step 3: Configure Your schema.prisma for MongoDB**

Specify the MongoDB connection string in your `.env` file as DATABASE_URL.
If you're not sure how to obtain your DATABASE_URL, refer to Prisma Docs:

[Set up Prisma ORM for MongoDB](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/mongodb-typescript-mongodb)

Edit the `prisma/schema.prisma` file to define your MongoDB connection and schema and the neccessary NextAuth models.
The following schema is for MongoDB, if you use a different DB engine like Postgres, please refer to the official NextAuth documentation!

```text
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model Account {
  id                String  @id @default(auto()) @map("_id") @db.ObjectId
  userId            String  @db.ObjectId
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  sessionToken String   @unique
  userId       String   @db.ObjectId
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id             String    @id @default(auto()) @map("_id") @db.ObjectId
  name           String?
  email          String?   @unique
  emailVerified  DateTime?
  image          String?
  accounts       Account[]
  sessions       Session[]
}

model VerificationToken {
  id         String   @id @default(auto()) @map("_id") @db.ObjectId
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

**Step 4: Generate Prisma Client and Synchronize Schema with Database**
Run the following commands to generate your Prisma client and push the models to your MongoDB database.
```bash
npx prisma generate
npx prisma db push
```

**NOTE:** Whenever you make changes to your Prisma schema in the future, you manually need to invoke `prisma generate` in order to accommodate the changes in your Prisma Client API and then `prisma db push` to push changes to MongoDB


**Step 5: Create a Custom Prisma client insance**
This ensure to avoid having too many prisma instances laying around on your application.

More information here: [Instantiating Prisma Client](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/instantiate-prisma-client)

```typescript
// app/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

```

**Step 6: Add Adapter to AuthOptions**
Add Prisma Adapter to your authOptions configuration file.
If you have been following along, your file should now look like:

```typescript
// app/lib/auth-options.ts

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import prisma from "@/app/lib/prisma"; // your custom prisma client instance

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login", // intercepts the default signIn route (/api/auth/signin)
  },
  session: {
    strategy: "jwt", // use JSON Web Tokens for session management, OAuth wont work without this
  },
};
```

### 7. Accessing Auth Session
You can access the session from both server-side components and client-side components in Next.js.

**Server Components and Routes:**
To access the session in server components, you can use the `getServerSession`  function provided by NextAuth.

Here's an example of it in action in Robin
```typescript
import { getServerSession } from "next-auth/next";
import authOptions from "@/app/lib/auth-options";
import Header from "./header";

export default async function Home() {
  // Accessing the session from the server side (sever components & routes)
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header />
      <main className="container mx-auto text-center py-20">
        <h3 className="text-2xl">
          Welcome to <span className="text-indigo-500">Robin!</span>
        </h3>

        {/* User details */}
        <div className="mt-10">
          {session && (
            <div>
              <p> {session.user?.name}</p>
              <p> {session.user?.email}</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

```

**Client Components** 
To access the session in client components, use the useSession hook provided by NextAuth. This hook allows you to access the current session and react to changes in authentication state.

Code Example:
```typescript
'use client' // remember to add this
import { useSession, signIn, signOut } from "next-auth/react";

export default function UserComponent() {
  const { data: session, status } = useSession();

  const handleGoogleSignIn = async () => {
    signIn("google", { callbackUrl: "/" });
  };
  const handleGithubSignIn = async () => {
    signIn("github", { callbackUrl: "/" });
  };


  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <div>
        <p>Hello, {session?.user?.name}!</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  } else {
    return (
      <>
        <button onClick={handleGoogleSignIn}>Sign in with Google</button>
        <button onClick={handleGithubSignIn}>Sign in with Github</button>
      </>
    );
  }
}

```

## Part 2 - Setting of NextAuth v4 with Credentials Provider


TODO:



## Part 3 - Protecting Routes (Middleware)
```typescript
//middleware.ts
export {default} from "next-auth/middleware";

/* 
Defined protected routes array for the middleware
-----------------------------------------------
You can also use wildcard to match rounds
e.g. ['/user/*'] will match all routes that starts with /user/
-----------------------------------------------
// *: zero or more
// ?: zero or one
// +: one or more
*/
export const config = {
  matcher:['/'] // here we protect only the homepage
}

```


## Resources
[NextAuth Course - Complete Authentication with Credentials, Goo](https://www.youtube.com/watch?v=t0Fs0NO78X8)

 [Setup Prisma And MongoDB With NextAuth](https://www.youtube.com/watch?v=JYcOAzs_Q4A)
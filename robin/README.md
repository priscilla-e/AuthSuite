# Robin

Robin is a Next.js application that utilizes the NextAuth authentication provider.

Here's a link to the original tutorial on youtube:   
[NextAuth Course - Complete Authentication with Credentials, Goo](https://www.youtube.com/watch?v=t0Fs0NO78X8)

FYI they use the Next.js pages router in their tutorial so might be a bit from what you see on this repo. 
I've also made other changes such as the use of Prisma instead of Mongoose. And configuring adapters to persist signed in user data. 


## Setting of NextAuth v4!

As of February 5 2024, the NextAuth documentation is a hot mess! NextAuth is currently transitioning to Auth.js, so everything about it is a bit disorganized. The most common confusion is deciding whether to stick with the old NextAuth v4 or use the NextAuth v5 beta(or is it Auth.js now?) I'm still confused. So for consistency with the video tutorial, I will be sticking with the version 4.  

**NOTE**: The tutorial uses Next.js Pages router, which has a slightly different setup from the new App router. 
Follow the following steps to set it up for the new App router.


### 1. Install NextAuth

```bash
  npm i next-auth
```

### 2. Set up relevant Environment variables
Assuming your are using Credendials Provider, OAuth Providers (Google and Github), your `.env.local` file should look like this:
```text
// .env.local

NEXTAUTH_SECRET=secret-key
NEXTAUTH_URL=https://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

If you are not sure how to obtain these keys, i've tried my best to document it below:

**NEXTAUTH_SECRET**  
Run the following command on terminal.
```bash
openssl rand -base64 32
```

**NEXTAUTH_SECRET**  
This should be your website URL or `localhost:3000` for development server.

**GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET**  
These are only required if your're using Google Provider (Sign in with Google).  
To get them you need to create and configure a new project on the Google Cloud Platform and configure credentials for it:

https://console.developers.google.com/apis/credentials

Remember to add correct redirect URL in google 
* For production: `https://{YOUR_DOMAIN}/api/auth/callback/google`
* For development: `http://localhost:3000/api/auth/callback/google`


**GITHUB_CLIENT_ID & GITHUB_CLIENT_SECRET**  
Similar to the google OAuth process, Create a new github OAuth app:

https://github.com/settings/apps


For the Authorization callback URL field ente: 
* `http://localhost:3000/api/auth/callback`


### 3. Define AuthOptions config file
```typescript
// app/lib/auth-options.ts

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
    // ...add more providers here
  ],
}
```

### 4. Add API route handler (for Next.js App Router Only)

Add the following code to your route handler
```javascript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import authOptions from "@/auth-options";

const handler =  NextAuth(authOptions);

export { handler as GET, handler as POST };
```

All requests to /api/auth/* (signIn, callback, signOut, etc.) will automatically be handled by this route handler.


### 5. Add Session Provider component

To access the authentication session on the client we need to wrap our entire application with the next-auth SessionProvider component. This component uses React Context to pass the session down to all our components.

We will need a seperate client component to achieve this in Next 13 since we cannot convert the RootLayout into a client comonent. 

Create a wrapper AuthProvider component as follows:

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


### 6. Configure Adapters 

Adapters are essential for persisting OAuth user data and their session details inside your database once they log into your application.

Next auth offers a wide range of adapters depending on your database engine or ORM. 

https://next-auth.js.org/adapters

For this application we will be using MongoDB Adapter together with Prisma ODM (ORM?)





### 7. Protecting Routes using Middleware
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
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, UserButton, auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import CreateProfile from "./comps/CreateProfile";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Muso Muse",
  description: "An album review app",

};

export default async function RootLayout({ children }) {
  const { userId } = auth();

  const profileRes =
    await sql`SELECT * FROM profiles WHERE clerk_user_id = ${userId}`;


  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}> 
      <header><p className="header-title">MUS0 MUSE</p>
      <nav className="nav-link">
           <Link href ="/">HOME</Link> | <Link href ="/about">ABOUT</Link> | <Link href="/profiles">PROFILES</Link> |
           {userId && profileRes.rowCount !== 0 && (<Link href={`/profiles/${profileRes.rows[0].id}/posts`}>MY PROFILE |</Link>)( <Link href="/searchalbums">SEARCH ALBUMS</Link>)}
        </nav>
        {!userId && <div><Link href="/sign-in">SIGN IN</Link>{children}</div>}
        {userId && <UserButton afterSignOutUrl="/" />}
        {userId && profileRes.rowCount === 0 && <CreateProfile />}
        {userId && profileRes.rowCount !== 0 && children}
      </header>
        <footer>Property of Myles &copy;</footer>
        </body>
    </html>
    </ClerkProvider>
  );
}

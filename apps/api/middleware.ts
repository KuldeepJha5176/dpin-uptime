import type { NextFunction , Request, Response } from "express";

export function authMiddleware(req: Request , res: Response, next: NextFunction){
    const authHeader =  req.headers['authorization'];

    req.userId = "5";
    next()
}
// import {clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };
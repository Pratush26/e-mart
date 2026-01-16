import { NextResponse } from 'next/server'
import { auth } from "./auth"

const adminRoutes = ['/manage-users', '/manage-sellers']
const sellerRoutes = ['/add-items']
const clientRoutes = ['/my-carts']

export default auth(async (request) => {
    const { pathname } = request.nextUrl

    const token = request.auth
    if (!token && (pathname === "/login" || pathname === "/register")) return NextResponse.next()
    if (!token) return NextResponse.redirect(new URL('/login', request.url))
    const userRole = token?.user?.role;
    if (token && (pathname === "/login" || pathname === "/register")) return NextResponse.redirect(new URL('/dashboard', request.url))
    if (adminRoutes.includes(pathname) && userRole !== "admin") return NextResponse.redirect(new URL('/dashboard', request.url))
    if (sellerRoutes.includes(pathname) && userRole !== "seller") return NextResponse.redirect(new URL('/dashboard', request.url))
    if (clientRoutes.includes(pathname) && userRole !== "user") return NextResponse.redirect(new URL('/dashboard', request.url))
    return NextResponse.next()
})

export const config = {
    matcher: [
        '/manage-users', '/manage-sellers',
        '/add-items',
        '/my-carts',
        '/profile', '/dashboard',
        '/login',
        '/register'
    ]
};
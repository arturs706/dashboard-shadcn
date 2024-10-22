import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";


export function decodeToken(token: string): Record<string, any> {
    const base64Url = token.split('.')[1]; 
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = Buffer.from(base64, 'base64').toString('utf8');
    return JSON.parse(decodedPayload);
}

async function refreshAccessToken(refreshToken: string): Promise<string> {
    const apiHost = process.env.API_HOST;
    const apiUrl = `${apiHost}/api/v1/users/refresh`;
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
        throw new Error('Failed to refresh token');
    }

    const setCookieHeader = response.headers.get('Set-Cookie');
    const parts = setCookieHeader?.split(';');
    const tokenPart = parts?.find(part => part.trim().startsWith('access_token='));
    if (tokenPart) {
        return tokenPart.split('=')[1];
    }
    throw new Error('No access token found in Set-Cookie header');  
}

// Middleware function
export async function middleware(request: NextRequest) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    const refreshToken = cookieStore.get("refresh_token")?.value;

    const isLoginPage = request.nextUrl.pathname === "/login";

    try {
        if (accessToken) {
            const decodedToken = decodeToken(accessToken);
            const currentTime = Math.floor(Date.now() / 1000);

            if (isLoginPage && decodedToken.exp > currentTime) {
                return NextResponse.redirect(new URL("/", request.url)); // Redirect to home or dashboard
            }

            // If the token is expired
            if (decodedToken.exp < currentTime) {
                console.log("Token has expired.");
                if (isLoginPage) {
                    // Let the user stay on the login page if token expired
                    return NextResponse.next();
                }

                // If refresh token is available, try to refresh the access token
                if (refreshToken) {
                    try {
                        const newAccessToken = await refreshAccessToken(refreshToken);
                        const response = NextResponse.next();
                        response.cookies.set("access_token", newAccessToken, { httpOnly: true, sameSite: 'lax', path: '/' });
                        console.log("Access token refreshed successfully.");
                        return response;
                    } catch (refreshError) {
                        console.error("Error refreshing token:", refreshError);
                        return NextResponse.redirect(new URL("/login", request.url));
                    }
                } else {
                    return NextResponse.redirect(new URL("/login", request.url));
                }
            }

            return NextResponse.next();
        } else {
            if (!isLoginPage) {
                return NextResponse.redirect(new URL("/login", request.url));
            }
        }
    } catch (err) {
        console.error("Token decoding failed or other error:", err);
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/login"], 
};

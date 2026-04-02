import { NextRequest, NextResponse } from 'next/server';

const STUDIO_USER = process.env.STUDIO_BASIC_AUTH_USER;
const STUDIO_PASS = process.env.STUDIO_BASIC_AUTH_PASSWORD;

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (!pathname.startsWith('/studio')) {
		return NextResponse.next();
	}

	if (!STUDIO_USER || !STUDIO_PASS) {
		return NextResponse.next();
	}

	const authHeader = request.headers.get('authorization');

	if (authHeader) {
		const [scheme, encoded] = authHeader.split(' ');

		if (scheme === 'Basic' && encoded) {
			const decoded = atob(encoded);
			const separatorIndex = decoded.indexOf(':');

			if (separatorIndex !== -1) {
				const username = decoded.slice(0, separatorIndex);
				const password = decoded.slice(separatorIndex + 1);

				if (username === STUDIO_USER && password === STUDIO_PASS) {
					return NextResponse.next();
				}
			}
		}
	}

	return new NextResponse('Authentication required', {
		status: 401,
		headers: {
			'WWW-Authenticate': 'Basic realm="Secure Studio"',
		},
	});
}

export const config = {
	matcher: ['/studio/:path*'],
};

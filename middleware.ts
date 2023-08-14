export { default } from 'next-auth/middleware'

export const config = {
	matcher: ['/user', '/settings', '/api/posts', '/api/uploadthing/:path*'],
}

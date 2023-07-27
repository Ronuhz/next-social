export { default } from 'next-auth/middleware'

export const config = {
	matcher: ['/profile', '/api/posts', '/api/uploadthing/:path*'],
}

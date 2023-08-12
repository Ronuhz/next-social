export { default } from 'next-auth/middleware'

export const config = {
	matcher: ['/user', '/api/posts', '/api/uploadthing/:path*'],
}

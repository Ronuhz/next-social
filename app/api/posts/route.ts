import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
// import { getToken } from 'next-auth/jwt'

export async function GET(req: NextRequest) {
	// const token = await getToken({ req })
	const { searchParams } = new URL(req.url)

	const userId = searchParams.get('userId')

	// *Uses not middleware and protects both
	// if user is not logged in && not requesting posts for a specific user
	// if (!token && !userId) {
	// 	return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
	// }

	//otherwise

	const perPage = searchParams.get('perPage')
		? parseInt(searchParams.get('perPage') as string)
		: 20
	const cursor = searchParams.get('cursor')!

	const posts = await prisma.post.findMany({
		take: perPage,
		skip: parseInt(cursor!) === 1 ? 0 : 1,
		cursor: parseInt(cursor!) === 1 ? undefined : { id: cursor },
		include: { user: { select: { name: true, image: true } } },
		where: userId ? { userId } : undefined,
		orderBy: { createdAt: 'desc' },
	})

	return NextResponse.json(
		{ posts, nextCursor: posts[perPage - 1]?.id },
		{ status: 200 }
	)
}

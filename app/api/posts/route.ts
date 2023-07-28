import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)

	const userId = searchParams.get('userId')
	const perPage = searchParams.get('perPage')
		? parseInt(searchParams.get('perPage') as string)
		: 20
	const cursor = searchParams.get('cursor')!

	const posts = await prisma.post.findMany({
		take: perPage,
		skip: parseInt(cursor!) === 1 ? 0 : 1,
		cursor: parseInt(cursor!) === 1 ? undefined : { id: cursor },
		include: {
			user: { select: { username: true, profilePicture: true } },
			likes: { select: { userId: true, postId: true } },
		},
		where: userId ? { userId } : undefined,
		orderBy: { createdAt: 'desc' },
	})

	return NextResponse.json(
		{ posts, nextCursor: posts[perPage - 1]?.id },
		{ status: 200 }
	)
}

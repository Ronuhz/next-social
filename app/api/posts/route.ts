import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const perPage = searchParams.get('perPage')
		? parseInt(searchParams.get('perPage') as string)
		: 2
	const cursor = searchParams.get('cursor')!

	// if (parseInt(cursor!) === 1) {
	// 	const posts = await prisma.post.findMany({
	// 		take: perPage,
	// 		include: { user: { select: { name: true, image: true } } },
	// 		orderBy: { createdAt: 'desc' },
	// 	})
	// 	return NextResponse.json({ posts, nextCursor: posts[perPage - 1].id })
	// }

	const posts = await prisma.post.findMany({
		take: perPage,
		skip: parseInt(cursor!) === 1 ? 0 : 1,
		cursor: parseInt(cursor!) === 1 ? undefined : { id: cursor },
		include: { user: { select: { name: true, image: true } } },
		orderBy: { createdAt: 'desc' },
	})

	return NextResponse.json({ posts, nextCursor: posts[perPage - 1]?.id })
}

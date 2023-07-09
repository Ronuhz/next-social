import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function Home() {
	const users = await prisma.user.findMany()

	return (
		<ul>
			{users.map((user) => (
				<li>
					<Link href={`/profile/${user.id}`}>{user.name}</Link>
				</li>
			))}
		</ul>
	)
}

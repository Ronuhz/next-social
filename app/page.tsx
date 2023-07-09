import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function Home() {
	const users = await prisma.user.findMany({
		select: { id: true, name: true },
	})

	return (
		<ul>
			{users.map((user) => (
				<li key={user.id}>
					<Link href={`/profile/${user.id}`}>{user.name}</Link>
				</li>
			))}
		</ul>
	)
}

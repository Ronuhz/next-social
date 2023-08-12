//* Global loading animation, also used for AuthLoading in app/page.tsx

const Loading = () => {
	return (
		<section className='flex h-[60vh] flex-col items-center justify-center pt-32'>
			<div className='h-fit animate-bounce transition-all'>
				<p className='text-8xl font-bold'>N</p>
			</div>
			<p className='animate-pulse tracking-widest text-muted-foreground transition-all'>
				LOADING
			</p>
		</section>
	)
}

export default Loading

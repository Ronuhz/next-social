import DesktopNav from './desktop-nav'
import MobileNav from './mobile-nav'

const MainNav = () => {
	return (
		<div className='mb-safe-area-inset-top'>
			<DesktopNav />
			<MobileNav />
		</div>
	)
}

export default MainNav

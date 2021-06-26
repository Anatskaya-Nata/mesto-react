import React from 'react'
import HeaderLogo from '../../images/Vector.svg'
function Header() {
	return (
		<header className="header page__header">
			<img src={HeaderLogo} alt="Логотип" className="header__logo" />
		</header>
	)
}

export default Header

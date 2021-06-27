import React from 'react'
import imgOenButton from '../../images/Vector_plus.svg'
import PenItem from '../../images/photem.png'
import api from '../../utils/Api'
import Card from './Card'

function Main(props) {
	const [userName, setUserName] = React.useState('')
	const [userDescription, setUserDescription] = React.useState('')
	const [userAvatar, setUserAvatar] = React.useState('')
	const [cards, setCards] = React.useState([])

	React.useEffect(() => {
		api
			.getFullPageInfo()
			.then(([cardData, userData]) => {
				setCards(cardData)
				setUserName(userData.name)
				setUserDescription(userData.about)
				setUserAvatar(userData.avatar)
			})
			.catch((err) => console.log(err))
	}, [])

	return (
		<main className="content page__content">
			<section className="profile">
				<div className="profile__container">
					<img
						onClick={props.onEditAvatar}
						src={userAvatar}
						alt="фото пользователя"
						//style={{ backgroundImage: `url(${userAvatar})` }}
						className="profile__photo"
					/>
					<div className="profile__overlay ">
						<img src={PenItem} alt="карандаш" className="profile__pencil" />
					</div>
				</div>

				<div className="profile__block">
					<div className="profile__info">
						<h1 className="profile__name">{userName}</h1>

						<button
							onClick={props.onEditProfile}
							id="openIcon"
							className="profile__icon"
							type="button"
						></button>
					</div>
					<p className="profile__job">{userDescription}</p>
				</div>

				<button
					onClick={props.onAddPlace}
					id="openPlus"
					className="profile__plus"
					type="button"
				>
					<img src={imgOenButton} alt="кнопка плюс" />
				</button>
			</section>

			<section className="gallary">
				<ul className="gallary__cards">
					{cards.map((card) => (
						<Card key={card._id} card={card} onCardClick={props.onCardClick} />
					))}
				</ul>
			</section>
		</main>
	)
}

export default Main

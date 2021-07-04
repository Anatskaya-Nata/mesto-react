import React from 'react'
import imgOenButton from '../images/Vector_plus.svg'
import PenItem from '../images/photem.png'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { CardContext } from '../contexts/CardContext'
import Card from './Card'

function Main(props) {
	const cards = React.useContext(CardContext)
	//const [cards, setCards] = React.useState([])

	const currentUser = React.useContext(CurrentUserContext)
	//console.log(cards)
	//console.log(currentUser)

	return (
		<main className="content page__content">
			<section className="profile">
				<div className="profile__container">
					<img
						onClick={props.onEditAvatar}
						src={currentUser.avatar}
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
						<h1 className="profile__name">{currentUser.name}</h1>

						<button
							onClick={props.onEditProfile}
							id="openIcon"
							className="profile__icon"
							type="button"
						></button>
					</div>
					<p className="profile__job">{currentUser.about}</p>
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
						<Card
							key={card._id}
							card={card}
							onCardClick={props.onCardClick}
							onCardLike={props.onCardLike}
							onCardDelete={props.onCardDelete}
						/>
					))}
				</ul>
			</section>
		</main>
	)
}

export default Main

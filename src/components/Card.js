import React from 'react'
import deliteButton from '../images/delete.svg'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card(props) {
	const currentUser = React.useContext(CurrentUserContext)
	// Определяем, являемся ли мы владельцем текущей карточки
	const isOwn = props.card.owner._id === currentUser._id
	// Создаём переменную, которую после зададим в `className` для кнопки удаления
	const cardDeleteButtonClassName = `gallary__delete ${
		isOwn ? '' : 'gallary__delete_hidden'
	}`

	// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
	const isLiked = props.card.likes.some((i) => i._id === currentUser._id)

	// Создаём переменную, которую после зададим в `className` для кнопки лайка
	const cardLikeButtonClassName = `gallary__icon ${
		isLiked ? 'gallary__icon_active ' : ''
	}`

	function handleDeleteClick() {
		props.onCardDelete(props.card)
	}

	function handleCardClick() {
		props.onCardClick(props.card)
		console.log(props.card)
	}
	const handleLikeClick = () => {
		props.onCardLike(props.card)
	}

	return (
		<li className="gallary__card">
			<img
				src={props.card.link}
				className="gallary__item"
				alt={props.card.name}
				onClick={handleCardClick}
			/>
			<button
				className={cardDeleteButtonClassName}
				onClick={handleDeleteClick}
				type="button"
			>
				<img src={deliteButton} alt="корзина" />
			</button>

			<div className="gallary__info">
				<p className="gallary__text">{props.card.name}</p>
				<div className="gallary__counter">
					<button
						className={cardLikeButtonClassName}
						type="button"
						onClick={handleLikeClick}
					></button>
					<p className="gallary__quantity">{props.card.likes.length}</p>
				</div>
			</div>
		</li>
	)
}

export default Card

import React from 'react'
import deliteButton from '../../images/delete.svg'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function Card(props) {
	function handleCardClick() {
		props.onCardClick(props.card)
		console.log(props.card)
	}
	return (
		//<template className="gallary__template">
		<li className="gallary__card">
			<img
				src={props.card.link}
				className="gallary__item"
				alt={props.card.name}
				onClick={handleCardClick}
			/>
			<button className="gallary__delete" type="button">
				<img src={deliteButton} alt="корзина" />
			</button>

			<div className="gallary__info">
				<p className="gallary__text">{props.card.name}</p>
				<div className="gallary__counter">
					<button className="gallary__icon" type="button"></button>
					<p className="gallary__quantity">{props.card.likes.length}</p>
				</div>
			</div>
		</li>
		//</template>
	)
}

export default Card

import DeliteButton from '../../images/delete.svg'

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
				style={{ backgroundImage: `url(${props.card.link})` }}
				onClick={handleCardClick}
			/>
			<button className="gallary__delete" type="button">
				<img src={DeliteButton} alt="корзина" />
			</button>

			<div className="gallary__info">
				<p className="gallary__text">{props.card.name}</p>
				<div className="gallary__counter">
					<button className="gallary__icon" type="button"></button>
					<p className="gallary__quantity">0</p>
				</div>
			</div>
		</li>
		//</template>
	)
}

export default Card

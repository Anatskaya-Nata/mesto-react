import React from 'react'

function ImagePopup(props) {
	return (
		<section className={`popup popup_theme_image ${props.isOpen}`}>
			<div className="popup__container popup__container_theme_image">
				<img
					src={props.card.link}
					className="popup__image"
					alt="виды природы"
				/>
				<p className="popup__text">{props.card.name}</p>
				<button
					className={`popup__close popup__close_icon_image`}
					type="button"
					onClick={props.onClose}
				></button>
			</div>
		</section>
	)
}
export default ImagePopup

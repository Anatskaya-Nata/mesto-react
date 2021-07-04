import React from 'react'
function PopupWithForm(props) {
	return (
		<section
			className={`popup popup_theme_${props.name} ${props.isOpen ? 'popup_active' : ''}`}
		>
			<div className={`popup__container popup__container_theme_${props.name}`}>
				<form
					className={`popup__form popup__form_theme_${props.name}`}
					onSubmit={props.onSubmit}
				>
					<h2 className={`popup__title popup__title_${props.name}`}>{props.title} </h2>
					<div>{props.children}</div>
					<button className={`popup__button popup__button_${props.name}`} type="submit">
						{' '}
						{props.textButton}{' '}
					</button>
					<button
						className={`popup__close popup__close_icon_${props.name}`}
						onClick={props.onClose}
						type="button"
					></button>
				</form>
			</div>
		</section>
	)
}

export default PopupWithForm

import React, { FC, useEffect } from 'react';

//styles
import './spinner-modal.scss';

//img
import spinnerModal from '../../../assets/spinner/spinnerModal.svg';

type PropsSpinnerModal = {
	loading: boolean,
}

export const SpinnerModal: FC<PropsSpinnerModal> = ({ loading }) => {

	useEffect(() => {
		return () => { }
	}, [loading])

	if (loading) {
		return (
			<div className='spinner-modal__wrapper'>
				<img src={spinnerModal} alt="spinner" />
			</div>
		)
	} else {
		return null;
	}
}
import React, { useEffect } from 'react';

//icons
import spinnerPanel from '../../assets/spinner/spinnerPanel.svg';

//styles
import './spinner-panel.scss';

export const SpinnerPanel = ({ loading }) => {

	useEffect(() => {
		return () => {
			return null;
		}
	}, [loading])

	if (loading) {
		return (
			<div className='spinner-panel__wrapper'>
				<img src={spinnerPanel} alt="spinner" />
			</div>
		)
	} else {
		return null;
	}


}
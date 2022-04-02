import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

//icons
import spinnerPanel from '../../../assets/spinner/spinnerPanel.svg';

//styles
import './spinner-panel.scss';

//types
import { R } from '../../../redux/reducers';

export const SpinnerPanel: FC = () => {

	const { loading } = useSelector((state: R) => state.reducerEditor);

	useEffect(() => {
		return () => { }
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
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

//styles
import './spinner-iframe.scss';

//img
import spinnerIframe from '../../../assets/spinner/spinnerIframe.svg';

//types
import { R } from '../../../redux/reducers';

export const SpinnerIframe: FC = () => {

	const { loading } = useSelector((state: R) => state.reducerEditor);

	useEffect(() => {
		return () => { }
	}, [loading]);

	if (loading) {
		return (
			<div className='spinner-iframe__background'>
				<div className='spinner-iframe__wrapper'>
					<img src={spinnerIframe} alt="spinner" />
				</div>
			</div>
		)
	} else {
		return null;
	}
}
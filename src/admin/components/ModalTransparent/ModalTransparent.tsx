import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

//styles
import './modal-transparent.scss';

//types
import { R } from '../../redux/reducers';

export const ModalTransparent: FC = () => {

	const { loading } = useSelector((state: R) => state.reducerEditor);

	useEffect(() => {
		return () => { }
	}, [loading]);

	if (loading) {
		return (
			<div className='modal__transparent'></div>
		)
	} else {
		return null;
	}
}
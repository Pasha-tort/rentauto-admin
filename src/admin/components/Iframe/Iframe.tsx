import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

//types
import { R } from '../../redux/reducers/index';

export const Iframe = ({ refProp, init }) => {

	const { currentPage } = useSelector((state: R) => state.reducerEditor);

	useEffect(() => {
		init(currentPage)
	}, [currentPage]);

	return (
		<iframe ref={refProp} frameBorder="0" className='iframe-main' />
	)
}
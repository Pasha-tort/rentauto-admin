import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { R } from '../../redux/reducers';

//styles
import './panel-edit.scss';

export const PanelEdit: FC = () => {

	const { openPanel } = useSelector((state: R) => state.reducerPanelEditor);

	useEffect(() => {
	}, [openPanel]);

	const classNamePanelEditor = openPanel ? 'panel-edit panel-edit_active' : 'panel-edit';

	return (
		<div className={classNamePanelEditor}>
			{/* <Routes>
				<Route path="/edit-product" element={<div>products</div>} />
				<Route path="/edit-accounts" element={<div>accounts</div>} />
			</Routes> */}
		</div>
	)
}
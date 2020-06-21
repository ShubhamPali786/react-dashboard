import React from 'react';
import Classes from './gridicon.module.css';
import '../../../index.css';

const gridIcon = (props) => {
	let gridIconContainer = null;

	switch (props.name) {
		case 'Confirmed':
			gridIconContainer = (
				<div className={Classes.Confirmed}>
					<i className="fa fa-line-chart icon" aria-hidden="true"></i>
				</div>
			);
			break;
		case 'Active':
			gridIconContainer = (
				<div className={Classes.Active}>
					<i className="fa fa-info icon" aria-hidden="true"></i>
				</div>
			);
			break;
		case 'Recovered':
			gridIconContainer = (
				<div className={Classes.Recovered}>
					<i className="fa fa-check-square-o icon" aria-hidden="true"></i>
				</div>
			);
			break;
		case 'Deceased':
			gridIconContainer = (
				<div className={Classes.Deceased}>
					<i className="fa fa-bed icon" aria-hidden="true"></i>
				</div>
			);
			break;
			default:
				break;
	}

	return gridIconContainer;
};

export default gridIcon;

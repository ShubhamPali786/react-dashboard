import React from 'react';
import Classes from './totalcasesgrid.module.css';
import GridIcon from '../UI/gridicon/gridicon';

const totalCasesGrid = (props) => {
	let multiClass = [Classes.GridContent, Classes[props.name]];

	return (
		<div className={Classes.MultiGrid}>
			<div className={Classes[props.name]}>
				<GridIcon name={props.name} />
			</div>
			<div className={multiClass.join(' ')}>
				<p>{props.name} Cases</p>
				<h1>{props.totalCount}</h1>
			</div>
			{props.newlyAdded > 0 ? (
				<div className={Classes.TodaysCount}>
					<p className={Classes[props.name]}>+[ {props.newlyAdded} Today ]</p>
				</div>
			) : (
				<div className={Classes.TodaysCount} />
			)}
		</div>
	);
};

export default totalCasesGrid;

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
					<p className={Classes[props.name]} >+[ {props.newlyAdded} Today ]</p>
					<p className={Classes[props.name]} style={{textAlign:"end"}}>
					<span style={{fontSize:".6rem"}} className={Classes.lastUpdated}>Updated </span>
					<span style={{fontSize:"1rem"}} className={Classes.lastUpdatedTime}>{props.lastUpdatedDate}</span>
					</p>
				</div>
			) : (
				<div className={Classes.TodaysCount}>
					<p className={Classes[props.name]}  style={{textAlign:"end",width:"100%"}}>
						<span style={{fontSize:".6rem"}} className={Classes.lastUpdated}>Updated </span>
						<span style={{fontSize:"1rem"}} className={Classes.lastUpdatedTime}>{props.lastUpdatedDate}</span>
					</p>
				</div>
			)}
		</div>
	);
};

export default totalCasesGrid;

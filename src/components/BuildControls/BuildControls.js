import React from 'react';
import Classes from './BuildControls.module.css';
import Auxilary from '..//..//hoc/auxilary/auxilary';

const BuildControls = (props) => {

	return (
		<div className={Classes.BuildControls_Container}>
			<div className={Classes.SelectState_Control_Container}>
				<div className={Classes.selectControl}>
					<select onChange={props.selectStateHandler} value={props.stateData.find(item=>item.selected===true).statecode}>
						{props.stateData.map((item) => {
							return (
								<option value={item.statecode} key={item.statecode} >
									{item.state}
								</option>
							);
						})}
					</select>
				</div>
				<div className={Classes.DisplayDensity_Control_Container}>
					<div
						className={[Classes.Density_Control, props.densityClass.cumulative].join(' ')}
						data-density="cumulative"
						onClick={props.onClickHandler}
					>
						<h4>Cumulative</h4>
					</div>
					<div
						className={[Classes.Density_Control, props.densityClass.daily].join(' ')}
						onClick={props.onClickHandler}
						data-density="daily"
					>
						<h4>Daily</h4>
					</div>
				</div>
			</div>
			<div>
				<div>
					{props.buildControlsMeta.map((item) => {
						return (
							<Auxilary key={item.name}>
								<input
									type="checkbox"
									id={item.name}
									key={item.name}
									name={item.name}
									onChange={props.onCheckboxChange}
									checked={item.checked ? true : false}
								/>
								<label htmlFor={item.name}>{item.labeltxt}</label>
							</Auxilary>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default BuildControls;

import React from 'react';
import classes from './drilldowntable.module.css';
import DistrictChart from '../../components/dataVisualization/districtCharts/DistrictChart';

const drilldowntable = (props) => {
	let district_classes = "districtVisible";

	const rowClickHandler = (event) => {
		if (event.currentTarget.dataset.isshow === 'false') {
			event.currentTarget.querySelectorAll('span.arrow')[0].className = 'arrow-rotate';

			let stateCode = event.currentTarget.dataset.statecode;
			let zone_data = props.zone_data.zones.filter(item=>item.statecode === stateCode);
			let districtsObj = props.district_data.find(element=>element.statecode === stateCode).districtData;
			let districtArray = sortArraybyProperty(convertObjToArray(districtsObj,zone_data),"confirmed",false);
			let currentTarget = event.currentTarget;
			let htmlString = '<tr class="district-space" data-district=districtVisible>'
							+'<span data-district=districtVisible class="district-space-container">'
							+'<span data-district=districtVisible class="legends" ><span class="zone zone-red"></span>'
							+'<span class="zone-text">Red Zone</span>'
							+'<span class="zone zone-orange"></span><span class="zone-text">Orange Zone</span>'
							+'<span class="zone zone-green"></span><span class="zone-text">Green Zone</span>'
							+'</span><span class="lastUpdated"><p>Last Updated 7 Hours Ago.</p></span></span></tr>';
			htmlString +=
				'<tr class=' +
				district_classes +
				' data-district=districtVisible ><th>District</th><th>Confirmed</th><th>Active</th><th>Recovered</th><th>Deceased</th></tr>';
				districtArray.forEach(item=>{
					if(item.district === "Other State")
						return;
					htmlString +=
					'<tr data-district=districtVisible class=' +item.zone +
					' ><td class="district">' +
					item.district +
					'</td>' +
					'<td>' +
					item.confirmed +
					'</td>' +
					'<td>' +
					item.active +
					'</td>' +
					'<td>' +
					item.recovered +
					'</td>' +
					'<td>' +
					item.deceased +
					'</td></tr>';

				});		

			currentTarget.insertAdjacentHTML('afterend', htmlString);
			event.currentTarget.dataset.isshow = true;
		} else {
			document.querySelectorAll("[data-district=districtVisible]").forEach((item) => {
				item.outerHTML = '';
			});
			event.currentTarget.dataset.isshow = 'false';
			event.currentTarget.querySelectorAll('span.arrow-rotate')[0].className = 'arrow';
		}
	};

	const convertObjToArray = (obj, zone_data) => {
		let objKeys = Object.keys(obj);
		let districtArray = [];

		objKeys.forEach((ele) => {
			obj[ele].district = ele;
			obj[ele].zone =  zone_data.find(item=>item.district.toLowerCase() === ele.toLowerCase())? zone_data.find(item=>item.district === ele).zone :"";
			districtArray.push(obj[ele]);
		});

		return districtArray;
	};

	const sortArraybyProperty = (array, prop, isasc) => {
		if (isasc) return array.sort((a, b) => (a[prop] > b[prop] ? 1 : -1));
		else return array.sort((a, b) => (a[prop] < b[prop] ? 1 : -1));
	};

	return (
		<div className={classes.statewise_component}>
			<div className={classes.tableContainer}>
				<div>
					<h2>State-wise Cases</h2>
				</div>
				<div>
					<table id="myTable">
						<thead>
							<tr className={classes.tblHeading}>
								<th>State/UT</th>
								<th>Confirmed</th>
								<th>Active</th>
								<th>Recovered</th>
								<th>Deceased</th>
							</tr>
						</thead>
						<tbody className={classes.tableBuilder + ' tableScroll'}>
							{props.statewise_cases.map((item) => {
								if (!['TT','UN','DN'].includes(item.statecode))
									return (
										<tr
											onClick={rowClickHandler}
											data-statecode={item.statecode}
											data-isshow={false}
											onMouseOver={(ev)=>props.onstateHover(ev)}
										>
											<td>
												<div className={classes.collapsableDiv}>
													<span className="arrow">
														<i
															class="fa fa-arrow-circle-o-right arrowicon"
															aria-hidden="true"
														></i>
													</span>
													<span className={classes.heading}>{item.state}</span>
												</div>
											</td>
									<td><span className={classes.deltaconfirmed}></span><span>{item.confirmed}</span></td>
											<td>{item.active}</td>
											<td>{item.recovered}</td>
											<td>{item.deaths}</td>
										</tr>
									);
							})}
						</tbody>
					</table>
				</div>
			</div>
			{props.is_loaded  && 
				<div className="district_state_chart_container">
					<div className={classes.overall_percent_container}>
						<div className={classes.state_title}><p>{props.state_percent.state}</p></div>
						<div className={classes.confirmed_perent}><p>{props.state_percent.confirmedPercent}</p><p style={{"font-size": "small"}}>( Confirmed )</p></div>
						<div className={classes.recovered_perent}><p>{props.state_percent.recoveredPercent}</p><p style={{"font-size": "small"}}>( Recovered )</p></div>
						<div className={classes.active_perent}><p>{props.state_percent.activePercent}</p><p style={{"font-size": "small"}}>( Active )</p></div>
					</div>
					<DistrictChart {...props} />
				</div>
			}		
		</div>
	);
};

export default drilldowntable;

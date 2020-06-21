import React, { Component } from 'react';
import axios from '..//..//api/axios-covid19';
import DistrictChart from '..//..//components/dataVisualization/districtCharts/DistrictChart';
import Auxilary from '..//..//hoc/auxilary/auxilary';
import BuildControls from '../../components/BuildControls/BuildControls';

class StateSpreadBuilder extends Component {
	state = {
		datasets: {},
		is_loaded: false,
		state_code: '',
		state_timeseries_data: [],
		updateChartFunct: function () {},
		densityClass: {
			cumulative: '',
			daily: 'control_active',
		},
		stateDropDownList: [],
		buildControlsMeta: [
			{
				name: 'confirmed',
				checked: true,
				labeltxt: 'Confirmed',
			},
			{
				name: 'recovered',
				checked: true,
				labeltxt: 'Recovered',
			},
			{
				name: 'deceased',
				checked: true,
				labeltxt: 'Deceased',
			},
			{
				name: 'tested',
				checked: false,
				labeltxt: 'Tested',
			},
		],
	};

	componentDidMount() {
		this.setState({ updateChartFunct: (statecode) => this.selectStateHandler(null, statecode) });
		this.startLoader(true);
		axios
			.get('v3/min/timeseries.min.json')
			.then((response) => {
				this.startLoader(false);
				this.setStateTimeSeriesData(response.data);
			})
			.catch((error) => console.log(error));
	}
	startLoader = (isLoaderStart) => {
		isLoaderStart
			? document.querySelector('#loadingDiv').classList.add('loadingDiv')
			: (document.querySelector('#loadingDiv').className = 'loaderHide');
	};
	setStateDropdownList = (stateTimeSeriesData) => {
		let stateData = [...this.props.statewise_cases];
		let dropDownList = [];

		stateData.forEach((item) => {
			if (item.statecode !== 'TT') {
				if (stateTimeSeriesData.findIndex((stateitem) => stateitem.statecode === item.statecode) !== -1) {
					let dropdownObj = {
						state: item.state,
						statecode: item.statecode,
						selected: false,
					};
					dropDownList.push(dropdownObj);
				}
			}
		});
		dropDownList.push({
			state: 'All State',
			statecode: 'TT',
			selected: true,
		});

		this.setState({ stateDropDownList: dropDownList });
	};

	convertObjToArray = (obj, propertyKey) => {
		let objKeys = Object.keys(obj);
		let districtArray = [];

		objKeys.forEach((ele) => {
			if (typeof obj[ele] === 'object') {
				obj[ele][propertyKey] = ele;
				districtArray.push(obj[ele]);
			}
		});

		return districtArray;
	};

	setStateTimeSeriesData = (response_data) => {
		let stateObjArray = this.convertObjToArray(response_data, 'statecode');
		this.setState({ state_timeseries_data: stateObjArray, state_code: 'TT' });
		this.setStateDropdownList(stateObjArray);
		this.updateDataSets('TT');

		this.setState({ is_loaded: true });
	};

	selectStateHandler = (event, statecode) => {
		let stateCode = statecode ? statecode : event.currentTarget.value;

		if (statecode) {
			if (this.state.stateDropDownList.findIndex((item) => item.statecode === statecode) === -1) return;
		}

		let stateDropDownList = [...this.state.stateDropDownList];
		stateDropDownList.forEach((item) => {
			if (item.statecode === stateCode) item.selected = true;
			else item.selected = false;
		});

		this.setState({ state_code: stateCode, stateDropDownList: stateDropDownList });
		this.updateDataSets(stateCode);
	};

	onCheckboxChange = (event) => {
		if (!this.state.state_code) return;
		let checkedName = event.currentTarget.name;
		let activeObj = this.state.buildControlsMeta.find((item) => item.name === checkedName);
		activeObj.checked = event.currentTarget.checked;
		let index = this.state.buildControlsMeta.findIndex((item) => item.name === checkedName);
		let buildControlsMeta = [...this.state.buildControlsMeta];
		buildControlsMeta[index] = activeObj;
		this.setState({ buildControlsMeta: buildControlsMeta }, () => {
			this.updateDataSets(this.state.state_code);
		});
	};
	displayDensityClickHandler = (event) => {
		let densityType = event.currentTarget.dataset.density;
		if (densityType === 'daily') {
			this.setState(
				{
					densityClass: {
						cumulative: '',
						daily: 'control_active',
					},
				},
				() => {
					if (this.state.state_code) this.updateDataSets(this.state.state_code);
				}
			);
		} else {
			this.setState(
				{
					densityClass: {
						cumulative: 'control_active',
						daily: '',
					},
				},
				() => {
					if (this.state.state_code) this.updateDataSets(this.state.state_code);
				}
			);
		}
	};

	changeDropDownList = (statecode) => {};

	updateDataSets = (stateCode) => {
		let displayDensity = this.state.densityClass.daily ? 'daily' : 'cumulative';
		let activeCheckbox = this.state.buildControlsMeta.filter((item) => item.checked); //document.querySelectorAll('input:checked');
		this.prepareDataSet(stateCode, displayDensity, activeCheckbox);
	};

	prepareDataSet = (statecode, displayDensity, filters) => {
		let stateObj = this.prepareData(statecode);
		let stateupdateObj = displayDensity === 'daily' ? stateObj.delta : stateObj;
		let datasets = [];
		let dataObj = {};
		let dataset = {};
		filters.forEach((item) => {
			switch (item.name) {
				case 'confirmed':
					dataObj = {
						label: 'Confirmed Cases',
						backgroundColor: 'white',
						hoverBackgroundColor: 'red',
						hoverBorderColor: 'white',
						borderColor: '#FF073A',
						data: [...stateupdateObj.confirmed],
					};
					dataset = this.createDataSet(dataObj);
					datasets.push(dataset);
					break;
				case 'recovered':
					dataObj = {
						label: 'recoverd Cases',
						backgroundColor: 'white',
						hoverBackgroundColor: 'red',
						hoverBorderColor: 'white',
						borderColor: '#28a745',
						data: [...stateupdateObj.recovered],
					};
					dataset = this.createDataSet(dataObj);
					datasets.push(dataset);
					break;
				case 'deceased':
					dataObj = {
						label: 'Decesed Cases',
						backgroundColor: 'white',
						hoverBackgroundColor: 'red',
						hoverBorderColor: 'white',
						borderColor: '#6c757d',
						data: [...stateupdateObj.deceased],
					};
					dataset = this.createDataSet(dataObj);
					datasets.push(dataset);
					break;
				case 'tested':
					dataObj = {
						label: 'Tested Patients',
						backgroundColor: 'white',
						hoverBackgroundColor: 'red',
						hoverBorderColor: 'white',
						borderColor: '#1CBFD4',
						data: [...stateupdateObj.tested],
					};
					dataset = this.createDataSet(dataObj);
					datasets.push(dataset);
					break;
				default:
					break;
			}
		});
		let state_chart_data = {
			labels: stateupdateObj.labels,
			datasets: datasets,
		};

		this.setState({ datasets: state_chart_data, is_loaded: true });
	};
	createDataSet = (dataObj) => {
		return {
			label: dataObj.label,
			lineTension: 0.5,
			backgroundColor: dataObj.backgroundColor,
			hoverBackgroundColor: dataObj.hoverBackgroundColor,
			hoverBorderColor: dataObj.hoverBorderColor,
			borderColor: dataObj.borderColor,
			borderWidth: 1,
			data: dataObj.data,
			fill: false,
		};
	};
	prepareData = (statecode) => {
		let labels = [];
		let daily_confirmed = [];
		let daily_recover = [];
		let daily_deceased = [];
		let daily_tested = [];
		let confirmed = [];
		let recovered = [];
		let deceased = [];
		let tested = [];

		if (statecode !== 'TT') {
			let state_data = this.state.state_timeseries_data;
			let stateDateObjArr = this.convertObjToArray(
				state_data.find((item) => item.statecode === statecode),
				'recordedDate'
			);

			stateDateObjArr.forEach((item) => {
				var MONTH = item.recordedDate.split('-')[1];
				if (!['01', '02', '03'].includes(MONTH)) {
					labels.push(this.getLabel(item.recordedDate));
					if (item.delta) {
						if (item.delta.confirmed) daily_confirmed.push(parseInt(item.delta.confirmed));
						if (item.delta.recovered) daily_recover.push(parseInt(item.delta.recovered));
						if (item.delta.deceased) daily_deceased.push(parseInt(item.delta.deceased));
						if (item.delta.tested) daily_tested.push(parseInt(item.delta.tested));
					}
					if (item.total) {
						if (item.total.confirmed) confirmed.push(parseInt(item.total.confirmed));
						if (item.total.recovered) recovered.push(parseInt(item.total.recovered));
						if (item.total.deceased) deceased.push(parseInt(item.total.deceased));
						if (item.total.tested) tested.push(parseInt(item.total.tested));
					}
				}
			});
		} else {
			labels = this.props.all_state_time_series.date;
			daily_confirmed = [...this.props.all_state_time_series.dailyConfirmed];
			daily_recover = [...this.props.all_state_time_series.dailyRecovered];
			daily_deceased = [...this.props.all_state_time_series.dailyDeath];
			confirmed = [...this.props.all_state_time_series.totalconfirmed];
			recovered = [...this.props.all_state_time_series.totalrecovered];
			deceased = [...this.props.all_state_time_series.totaldeceased];
		}
		let stateobj = {
			labels: labels,
			delta: {
				labels: labels,
				confirmed: daily_confirmed,
				recovered: daily_recover,
				deceased: daily_deceased,
				tested: daily_tested,
			},
			confirmed: confirmed,
			recovered: recovered,
			deceased: deceased,
			tested: tested,
		};

		return stateobj;
	};

	getLabel = (date_string) => {
		let date_str = date_string.split('-');
		date_str.shift();
		return date_str.join('-');
	};

	GetActiveDataList = (elementsChecked) => {
		let activeFilters = [];
		elementsChecked.forEach((item) => {
			activeFilters.push(item.name);
		});
		return activeFilters;
	};

	render() {
		return (
			<Auxilary>
				{this.state.is_loaded ? (
					<Auxilary>
						<BuildControls
							selectStateHandler={this.selectStateHandler}
							onCheckboxChange={this.onCheckboxChange}
							onClickHandler={this.displayDensityClickHandler}
							densityClass={this.state.densityClass}
							buildControlsMeta={this.state.buildControlsMeta}
							stateData={this.state.stateDropDownList}
						/>{' '}
						<DistrictChart data={this.state.datasets} />{' '}
					</Auxilary>
				) : null}
			</Auxilary>
		);
	}
}

export default StateSpreadBuilder;

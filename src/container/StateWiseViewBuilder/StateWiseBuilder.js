import React, { Component } from 'react';
import Drilldowntable from '../../components/statewise_cases_table/drilldowntable';
import axios from '../../api/axios-covid19';
import Aux from '../../hoc/auxilary/auxilary';
import DistrictChart from '../../components/dataVisualization/districtCharts/DistrictChart';
import classes from './StateWiseBuilder.module.css';

class StateWiseBuilder extends Component {
	state = {
		district_data: [],
		zone_data: [],
		is_loaded: false,
		state_code: '',
		district_Chart_dataset: {},
		state_percentage:{}
	};

	componentDidMount() {
		axios
			.get('state_district_wise.json')
			.then((response) => {
				this.setDistrictWiseDetails(response);
			})
			.catch((error) => console.log(error));
	}

	onStateHover = (event) => {
		 let stateCode = event.currentTarget.dataset.statecode;
		 let dataset = this.getDataSet(stateCode);
		 let state_percentage = this.calculateStatePercent(stateCode);
		 this.setState({district_Chart_dataset:dataset, state_percentage:state_percentage});
	};
	calculateStatePercent = (stateCode)=>{
		const countryData = this.props.statewise_cases.find((item)=>item.statecode === "TT");
		let stateData = this.props.statewise_cases.find((item)=>item.statecode === stateCode);
		let confirmedPercent = this.calculatePercentage(parseInt(stateData.confirmed), parseInt(countryData.confirmed));
		let activePercent = this.calculatePercentage(parseInt(stateData.active), parseInt(countryData.active));
		let recoveredPercent = this.calculatePercentage(parseInt(stateData.recovered), parseInt(countryData.recovered));

		return {
			confirmedPercent:confirmedPercent+"%",
			activePercent:activePercent+"%",
			recoveredPercent:recoveredPercent+"%",
			state:stateData.state
		};
		

	}
	calculatePercentage = (data,overall)=> Math.round(data/overall*100);
	convertObjToArray = (obj) => {
		let objKeys = Object.keys(obj);
		let districtArray = [];

		objKeys.forEach((ele) => {
			obj[ele].district = ele;
			districtArray.push(obj[ele]);
		});

		return districtArray;
	};

	setDistrictWiseDetails(response) {
		const districtArray = Object.values(response.data);
		const countryData = this.props.statewise_cases.find((item)=>item.statecode === "TT");
		let dataset = {
			datasets: [
				{
					data:[parseInt(countryData.confirmed),parseInt(countryData.active),parseInt(countryData.recovered),parseInt(countryData.deaths)],
					backgroundColor: ["#EAA8A8","#90CAF9","#A5D6A7","#77787A"],
					labels:["India (Confirmed)","India (Active)","India (Recovered)","India (Deaths)"],
					label:"TEst"
				}]
			};
		let overall_Status ={
			confirmedPercent:countryData.confirmed,
			activePercent:countryData.active,
			recoveredPercent:countryData.recovered,
			state:"India"
		}
		this.setState({ district_data: districtArray,district_Chart_dataset:dataset, state_percentage:overall_Status });
		axios
			.get('zones.json')
			.then((response) => {
				this.setState({ zone_data: response.data, is_loaded: true });
			})
			.catch((error) => console.log(error));
	}

	setDataSet = (data) => {
		let statecode = 'MH';
		let dataset = this.getDataSet(statecode);
		this.setState({ zone_data: data, is_loaded: true, district_Chart_dataset:dataset });
	};

	getDataSet = (stateCode) =>{
		let districtsObj = this.state.district_data.find((element) => element.statecode === stateCode).districtData;
		let labels = Object.keys(districtsObj);
		let backgroundColors = [];
		let backgroundIndex = 0;
		let colors = [
			'#E25668',
			'#E28956',
			'#E2CF56',
			'#AEE256',
			'#68E256',
			'#56E289',
			'#56E2CF',
			'#56AEE2',
			'#5668E2',
			'#8A56E2',
			'#CF56E2',
			'#E256AE',
		];
		labels.forEach((item) => {
			if (backgroundIndex > colors.length - 1) backgroundIndex = 0;
			backgroundColors.push(colors[backgroundIndex]);
			backgroundIndex += 1;
		});
		let districtArray = this.convertObjToArray(districtsObj);
		let confirmedArr = districtArray.map((item) => {
			return item.confirmed;
		});

		let stateData = this.props.statewise_cases.find((item)=>item.statecode === stateCode);
		const countryData = this.props.statewise_cases.find((item)=>item.statecode === "TT");
		let dataset = {
			datasets: [
				{
					data:[parseInt(countryData.confirmed),parseInt(countryData.active),parseInt(countryData.recovered),parseInt(countryData.deaths)],
					backgroundColor: ["#EAA8A8","#90CAF9","#A5D6A7","#77787A"],
					labels:["India (Confirmed)","India (Active)","India (Recovered)","India (Deaths)"],
					
					label:"country"
				},
				{
					data:[parseInt(stateData.confirmed),parseInt(stateData.active),parseInt(stateData.recovered),parseInt(stateData.deaths)],
					backgroundColor: ["#64B5F6","#5EA3D9","#5891BC","#517E9E"],
					label:"state",
					labels:[stateData.state+" (Confirmed)",stateData.state+" (Active)",stateData.state+" (Recovered)",stateData.state+" (Deaths)"]
					
				},
				{
					data: confirmedArr, // Specify the data values array
					backgroundColor: backgroundColors, // Add custom color background (Points and Fill)
					label:"district",
					labels: labels
				}
			   
			],
			labels: labels
		};

		return dataset;
	}

	render() {
		return (
			<div className={classes.stateContainer}>
				<Drilldowntable
					{...this.props}
					district_data={this.state.district_data}
					zone_data={this.state.zone_data}
					is_loaded={this.state.is_loaded}
					onstateHover={this.onStateHover}
					state_code={this.state.state_code}
					district_Chart_dataset={this.state.district_Chart_dataset}
					state_percent = {this.state.state_percentage}
				/>
			</div>
		);
	}
}

export default StateWiseBuilder;

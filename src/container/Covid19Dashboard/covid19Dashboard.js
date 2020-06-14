import React, { Component } from 'react';
import Auxilary from '../../hoc/auxilary/auxilary';
import TotalGridCases from '../../components/totalcasesgrid/totalcasesgrid';
import axios from '../../api/axios-covid19';
import DataSpreadChart from '../../components/dataVisualization/dataSpreadCharts';
import Classes from './covid19Dashboard.module.css';
import StateWiseBuilder from '../StateWiseTableViewBuilder/StateWiseBuilder';

class Covid19Dashboard extends Component {
	state = {
		daily_overall_cases: {},
		isLoaded: false,
		monthly_overall_cases: {},
		statewise_cases:[]
	};

	componentDidMount() {
		axios
			.get('data.json')
			.then((response) => {
				this.setTotalCasesDetail(response.data);
			})
			.catch((error) => console.log(error));

		
	}

	setTotalCasesDetail(data) {
		const todayCasesCount = data.statewise.find((item) => item.statecode === 'TT');
		const todayCount = [
			{
				name: 'Confirmed',
				newlyAdded: todayCasesCount.deltaconfirmed,
				totalCount: todayCasesCount.confirmed,
			},
			{
				name: 'Active',
				newlyAdded: 0,
				totalCount: todayCasesCount.confirmed - todayCasesCount.recovered - todayCasesCount.deaths,
			},
			{
				name: 'Recovered',
				newlyAdded: todayCasesCount.deltarecovered,
				totalCount: todayCasesCount.recovered,
			},
			{
				name: 'Deceased',
				newlyAdded: todayCasesCount.deltadeaths,
				totalCount: todayCasesCount.deaths,
			},
		];

		let daily_overall_cases = {
			todayCases: [],
			dailyConfirmed: [],
			dailyDeath: [],
			dailyRecovered: [],
			totaldeceased:[],
			totalconfirmed:[],
			totalrecovered:[],
			date: []
		};
		let monthlyCases = [];

		daily_overall_cases.todayCases = todayCount;
		data.cases_time_series.forEach(function (data, index) {
			let MONTH = data.date.trim().split(' ')[1];
			if (!['January', 'February', 'March'].includes(MONTH)) {
				daily_overall_cases.dailyConfirmed.push(parseInt(data.dailyconfirmed));
				daily_overall_cases.dailyDeath.push(parseInt(data.dailydeceased));
				daily_overall_cases.dailyRecovered.push(parseInt(data.dailyrecovered));
				daily_overall_cases.totalconfirmed.push(parseInt(data.totalconfirmed));
				daily_overall_cases.totaldeceased.push(parseInt(data.totaldeceased));
				daily_overall_cases.totalrecovered.push(parseInt(data.totalrecovered));
				
				daily_overall_cases.date.push(data.date.trim());

				if (monthlyCases.length > 0) {
					let objectIndex = monthlyCases.findIndex((item) => item.month === MONTH);
					if (objectIndex !== -1) {
						monthlyCases[objectIndex]['monthlyConfirmed'] += parseInt(data.dailyconfirmed);
						monthlyCases[objectIndex]['monthlyDeaths'] += parseInt(data.dailydeceased);
						monthlyCases[objectIndex]['monthlyRecovered'] += parseInt(data.dailyrecovered);
					} else {
						monthlyCases.push({
							month: MONTH,
							monthlyConfirmed: parseInt(data.dailyconfirmed),
							monthlyDeaths: parseInt(data.dailydeceased),
							monthlyRecovered: parseInt(data.dailyrecovered),
						});
					}
				} else {
					monthlyCases.push({
						month: MONTH,
						monthlyConfirmed: parseInt(data.dailyconfirmed),
						monthlyDeaths: parseInt(data.dailydeceased),
						monthlyRecovered: parseInt(data.totalrecovered),
					});
				}
			}
		});
		let monthlyCasesObj = {
			months: [],
			confirmed: [],
			recovered: [],
			deaths: [],
		};
		monthlyCases.forEach(function (item, index) {
			if (!monthlyCasesObj.months.includes(item.month)) monthlyCasesObj.months.push(item.month);
			monthlyCasesObj.confirmed.push(item.monthlyConfirmed);
			monthlyCasesObj.deaths.push(item.monthlyDeaths);
			monthlyCasesObj.recovered.push(item.monthlyRecovered);
		});

		this.setState({
			daily_overall_cases: daily_overall_cases,
			isLoaded: true,
			monthly_overall_cases: monthlyCasesObj,
			statewise_cases:data.statewise
		});
	}

	render() {
		let totalgridcase = null;
		if (this.state.isLoaded) {
			totalgridcase = this.state.daily_overall_cases.todayCases.map((item) => {
				return (
					<TotalGridCases
						name={item.name}
						newlyAdded={item.newlyAdded}
						totalCount={item.totalCount}
						key={item.name}
					/>
				);
			});
		}

		return (
			<Auxilary>
				<div className={Classes.DashboardContent}>{totalgridcase}</div>

				{this.state.isLoaded ? 
				(
					<Auxilary>
					<DataSpreadChart
						daily_cases={this.state.daily_overall_cases}
						monthly_Cases={this.state.monthly_overall_cases}
					/>
					<StateWiseBuilder statewise_cases ={this.state.statewise_cases} all_state_time_series={this.state.daily_overall_cases} />
					</Auxilary>
				) : null}
			</Auxilary>
		);
	}
}

export default Covid19Dashboard;

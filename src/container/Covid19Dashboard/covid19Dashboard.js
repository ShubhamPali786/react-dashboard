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
		statewise_cases:[],
		weeklyData:{}
	};

	componentDidMount() {
		this.startLoader(true);
		axios
			.get('data.json')
			.then((response) => {
				this.startLoader(false);
				this.setTotalCasesDetail(response.data);
			})
			.catch((error) => console.log(error));

		
	}
	startLoader=(isLoaderStart)=>{
		isLoaderStart?document.querySelector("#loaderContainer").classList.add('loaderContainer'):document.querySelector("#loaderContainer").className="loaderHide";
	}
   getLastUpdateTime = (lastUpdateTime) =>{
		let date_time = lastUpdateTime.split(" ");
		let date_arr= date_time[0].split("/");
		let time_arr = date_time[1].split(":");

		let lastUpdatedDate = new Date(parseInt(date_arr[2]),parseInt(date_arr[1])-1,parseInt(date_arr[0]),parseInt(time_arr[0]),parseInt(time_arr[1]));

		let currentDateTime = new Date();

		let lastUpdatedMsg="";

		if(currentDateTime.getMonth()-lastUpdatedDate.getMonth()>0)
		{
			let timeDiff = currentDateTime.getMonth() - lastUpdatedDate.getMonth();
			let timeUnit = timeDiff===1 ?"month" :"months";
			lastUpdatedMsg= `${currentDateTime.getMonth()-lastUpdatedDate.getMonth()} ${timeUnit} ago`;
			return lastUpdatedMsg;
		}
		if(currentDateTime.getDate() - lastUpdatedDate.getDate()>0)
		{
			let timeDiff = currentDateTime.getDate() - lastUpdatedDate.getDate();
			let timeUnit = timeDiff===1 ?"day" :"days";
			lastUpdatedMsg = `${currentDateTime.getDate() - lastUpdatedDate.getDate()} ${timeUnit} ago`;
			return lastUpdatedMsg;
		}
		if(currentDateTime.getHours() - lastUpdatedDate.getHours()>0)
		{
			let timeDiff = currentDateTime.getHours() - lastUpdatedDate.getHours();
			let timeUnit = timeDiff===1 ?"hour" :"hours";
			lastUpdatedMsg = `${currentDateTime.getHours() - lastUpdatedDate.getHours()} ${timeUnit} ago`;
			return lastUpdatedMsg;
		}
		if(currentDateTime.getMinutes() - lastUpdatedDate.getMinutes()>0)
		{
			let timeDiff = currentDateTime.getMinutes() - lastUpdatedDate.getMinutes();
			let timeUnit = timeDiff===1 ?"min" :"min";
			lastUpdatedMsg = `${currentDateTime.getMinutes() - lastUpdatedDate.getMinutes()} ${timeUnit} ago`;
			return lastUpdatedMsg;
		}
		return lastUpdatedMsg;
	}

	setTotalCasesDetail(data) {
		const todayCasesCount = data.statewise.find((item) => item.statecode === 'TT');
		let lastUpdatedMsg = this.getLastUpdateTime(todayCasesCount.lastupdatedtime);
		const todayCount = [
			{
				name: 'Confirmed',
				newlyAdded: todayCasesCount.deltaconfirmed,
				totalCount: todayCasesCount.confirmed,
				lastUpdatedDate:lastUpdatedMsg
			},
			{
				name: 'Active',
				newlyAdded: 0,
				totalCount: todayCasesCount.confirmed - todayCasesCount.recovered - todayCasesCount.deaths,
				lastUpdatedDate:lastUpdatedMsg
			},
			{
				name: 'Recovered',
				newlyAdded: todayCasesCount.deltarecovered,
				totalCount: todayCasesCount.recovered,
				lastUpdatedDate:lastUpdatedMsg
			},
			{
				name: 'Deceased',
				newlyAdded: todayCasesCount.deltadeaths,
				totalCount: todayCasesCount.deaths,
				lastUpdatedDate:lastUpdatedMsg
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
		let weeklyData =  this.prepareWeeklyDataset(data);
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
			statewise_cases:data.statewise,
			weeklyData:weeklyData
		});
	}

	prepareWeeklyDataset=(data)=>{
		
		let timeseriesdata = [...data.cases_time_series]
		let currentWeek = timeseriesdata.slice((timeseriesdata.length-1)-7,(timeseriesdata.length-1));
		let previousWeek = timeseriesdata.slice((timeseriesdata.length-1)-14,(timeseriesdata.length-1)-7);

		let currentWeekConfirmedTotal =currentWeek.reduce(function(acc, obj) { return acc + parseInt(obj.dailyconfirmed); },0);
		let previousWeekConfirmedTotal = previousWeek.reduce(function(acc, obj) { return acc + parseInt(obj.dailyconfirmed); },0);
		
		let currentWeekRecoveredTotal = currentWeek.reduce(function(acc, obj) { return acc + parseInt(obj.dailyrecovered); },0);
		let previousWeekRecoveredTotal = previousWeek.reduce(function(acc, obj) { return acc + parseInt(obj.dailyrecovered); },0);

		let currentWeekDeathsTotal = currentWeek.reduce(function(acc, obj) { return acc + parseInt(obj.dailydeceased); },0);
		let previousWeekDeathsTotal = previousWeek.reduce(function(acc, obj) { return acc + parseInt(obj.dailydeceased); },0);

		
		
		
		let currentWeekLabel = "[ "+currentWeek[0].date.trim() + " - " + currentWeek[currentWeek.length-1].date.trim()+" ]";
		let previousWeekLabel ="[ "+previousWeek[0].date.trim() + " - " + previousWeek[previousWeek.length-1].date.trim()+" ]";

		return {
			label:[previousWeekLabel,currentWeekLabel],
			data:{
			weeklyConfirmed:[previousWeekConfirmedTotal,currentWeekConfirmedTotal],
			weeklyRecovered:[previousWeekRecoveredTotal,currentWeekRecoveredTotal],
			weeklyDeaths:[previousWeekDeathsTotal,currentWeekDeathsTotal]
		},
			name:"weeklyDataset"
		}
	}
	


	render() {
		let totalgridcase = null;
		if (this.state.isLoaded) {
			totalgridcase = this.state.daily_overall_cases.todayCases.map((item) => {
				return (
					<TotalGridCases
						name={item.name}
						newlyAdded={item.newlyAdded}
						lastUpdatedDate = {item.lastUpdatedDate}
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
						weeklyData={this.state.weeklyData}
					/>
					<StateWiseBuilder statewise_cases ={this.state.statewise_cases} all_state_time_series={this.state.daily_overall_cases} />
					</Auxilary>
				) : null}
			</Auxilary>
		);
	}
}

export default Covid19Dashboard;

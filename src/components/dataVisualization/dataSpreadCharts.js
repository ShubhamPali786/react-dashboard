import React from 'react';
import Classes from './dataSpreadCharts.module.css';
import DataSpreadChart from './DataSpreadChart/dataSpreadChart';

const dataSpreadCharts = (props) => {
	const lineChartClass = [Classes.Chart, Classes.LineChart];
	const barChartClass = [Classes.Chart, Classes.BarChart];
	const recoverdChartClasses = [Classes.Chart, Classes.RecoverdChart];
	const dailyConfirmed_dataset = {
		labels: props.daily_cases.date,
		datasets: [
			{
				label: 'Confirmed Cases',
				hoverBackgroundColor: 'red', // on hover change color
				hoverBorderColor: 'white', // hover point border color
				borderColor: '#FF5E7F',
				borderWidth: 1,
				data: props.daily_cases.dailyConfirmed,
				fill: true,
				backgroundColor:'#FFE0E6',
				pointRadius:0,
				pointBackgroundColor: '#FF073A',
				pointBorderColor:'white',
				steppedLine:true
			},
		],
	};
	const dailyRecovered_dataset = {
		labels: props.daily_cases.date,
		datasets: [
			{
				label: 'Recovered Cases',
				hoverBackgroundColor: 'green', // on hover change color
				hoverBorderColor: 'white', // hover point border color
				borderColor: '#73C686',
				borderWidth: 1,
				data: props.daily_cases.dailyRecovered,
				fill: true,
				backgroundColor:'#E4F4E8',
				pointRadius:0,
				pointBackgroundColor: '#28A745',
				pointBorderColor:'white',
				steppedLine:true
			},
		],
	};

	const monthyconfirmed_dataset = {
		labels: props.monthly_Cases.months,
		datasets: [
			{
				label: 'Confirmed Cases',
				fill: false,
				lineTension: 0.5,
				backgroundColor: '#2E9BC6',
				hoverBorderColor: 'black',
				fillColor: 'blue',
				borderColor: 'rgb(255,255,255)',
				borderWidth: 0,
				data: props.monthly_Cases.confirmed,
			},
			{
				label: 'Recovered Cases',
				fill: false,
				lineTension: 0.5,
				backgroundColor: '#2DC6EA',
				
				hoverBorderColor: 'black',
				fillColor: 'blue',
				borderColor: 'rgb(255,255,255)',
				borderWidth: 0,
				data: props.monthly_Cases.recovered,
			},{
				label: 'deceased Cases',
				fill: false,
				lineTension: 0.5,
				backgroundColor: '#2EE3E3',
				
				hoverBorderColor: 'black',
				fillColor: 'blue',
				borderColor: 'rgb(255,255,255)',
				borderWidth: 0,
				data: props.monthly_Cases.deaths,
			},
		],
	};
	const weekly_dataset = {
		labels: props.weeklyData.label,
		datasets: [
			{
				label: 'Confirmed Cases',
				fill: false,
				lineTension: 0.5,
				backgroundColor: '#ef4648',
				hoverBorderColor: 'black',
				fillColor: 'blue',
				borderColor: 'rgb(255,255,255)',
				borderWidth: 0,
				data: props.weeklyData.data.weeklyConfirmed
			},
			{
				label: 'Recovered Cases',
				fill: false,
				lineTension: 0.5,
				backgroundColor: '#f99e4c',
				hoverBorderColor: 'black',
				fillColor: 'blue',
				borderColor: 'rgb(255,255,255)',
				borderWidth: 0,
				data: props.weeklyData.data.weeklyRecovered
			},
			{
				label: 'Deceased Cases',
				fill: false,
				lineTension: 0.5,
				backgroundColor: '#f36f38',
				hoverBorderColor: 'black',
				fillColor: 'blue',
				borderColor: 'rgb(255,255,255)',
				borderWidth: 0,
				data: props.weeklyData.data.weeklyDeaths
			},
		],
	};

	let spreadChart_data = [
		{
			chartType: 'line',
			dataset: dailyConfirmed_dataset,
			chartName: 'dailyConfirmed',
			classes: lineChartClass.join(' '),
		},
		{
			chartType: 'bar',
			dataset: monthyconfirmed_dataset,
			chartName: 'monthyconfirmed',
			classes: barChartClass.join(' '),
			increasedRate:
				props.monthly_Cases.confirmed[props.monthly_Cases.confirmed.length - 1] -
				props.monthly_Cases.confirmed[props.monthly_Cases.confirmed.length - 2],
		},
		{
			chartType: 'bar',
			dataset: weekly_dataset,
			chartName: 'weeklyconfirmed',
			classes: barChartClass.join(' '),
		},
		{
			chartType: 'line',
			dataset: dailyRecovered_dataset,
			chartName: 'dailyRecovered',
			classes: recoverdChartClasses.join(' '),
		}
	];

	return (
		<div className={Classes.LineCharts}>
			{spreadChart_data.map((item) => {
				return (
					<DataSpreadChart {...item} key={item.chartName}
						daily_cases={props.daily_cases}/>
				);
			})}
			</div>
	);
};

export default dataSpreadCharts;

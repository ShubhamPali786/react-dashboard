import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
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
				lineTension: 0.5,
				backgroundColor: 'white',
				hoverBackgroundColor: 'red',
				hoverBorderColor: 'black',
				fillColor: 'blue',
				borderColor: 'rgb(255,255,255)',
				borderWidth: 1,
				data: props.daily_cases.dailyConfirmed,
				fill: false,
			},
		],
	};
	const dailyRecovered_dataset = {
		labels: props.daily_cases.date,
		datasets: [
			{
				label: 'Recovered Cases',
				lineTension: 0.5,
				backgroundColor: 'white',
				hoverBackgroundColor: 'red',
				hoverBorderColor: 'black',
				fillColor: 'blue',
				borderColor: 'rgb(255,255,255)',
				borderWidth: 0,
				data: props.daily_cases.dailyRecovered,
				fill: false,
			},
		],
	};

	const monthyconfirmed_dataset = {
		labels: props.monthly_Cases.months,
		datasets: [
			{
				label: 'Monthly Spread',
				fill: false,
				lineTension: 0.5,
				backgroundColor: 'white',
				hoverBackgroundColor: 'red',
				hoverBorderColor: 'black',
				fillColor: 'blue',
				borderColor: 'rgb(255,255,255)',
				borderWidth: 0,
				data: props.monthly_Cases.confirmed,
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
			chartType: 'line',
			dataset: dailyRecovered_dataset,
			chartName: 'dailyRecovered',
			classes: recoverdChartClasses.join(' '),
		},
	];

	return (
		<div className={Classes.LineCharts}>
			{spreadChart_data.map((item) => {
				return (
					<DataSpreadChart {...item}
						daily_cases={props.daily_cases}/>
				);
			})}
			</div>
	);
};

export default dataSpreadCharts;

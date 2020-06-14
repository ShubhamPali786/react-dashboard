import React from 'react';
import { Line, Bar } from 'react-chartjs-2';

const DistrictChart = (props) => {
	var options = {
		
		key: 'dailyConfirmed',
		labels: {
			fontColor: 'rgb(255,255,255)',
		},
		title: {
			display: true,
			text: 'Confirmed Cases Spread',
			fontSize: 20,
			fontColor: 'rgb(255,255,255)',
		},
		legend: {
			display: false,
			position: 'right',
		},
		maintainAspectRatio: false,
		scales: {
			yAxes: [
				{
					ticks: {
						fontColor: 'black',
						stepSize: 1000,
						beginAtZero: true,
					},
				},
			],
			xAxes: [
				{
					ticks: {
						fontColor: 'black',
						stepSize: 2,
						beginAtZero: true,
					},
				},
			],
		},
	};

	return (
		<div className="test">
			<Line data={props.data} options={options} />
		</div>
	);
};

export default DistrictChart;

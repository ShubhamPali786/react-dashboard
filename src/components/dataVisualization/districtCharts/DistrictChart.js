import React from 'react';
import { Line } from 'react-chartjs-2';

const DistrictChart = (props) => {
	var options = {
		
		key: 'dailyConfirmed',
		labels: {
			fontColor: 'rgb(255,255,255)',
		},
		title: {
			display: true,
			text: '',
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
						stepSize: 100,
						beginAtZero: true,
					},
				},
			],
			xAxes: [
				{
					ticks: {
						fontColor: 'black',
						stepSize:10,
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

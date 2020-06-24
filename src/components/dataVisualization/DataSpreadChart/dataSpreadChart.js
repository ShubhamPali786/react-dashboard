import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import Classes from './dataSpreadChart.module.css';

const dataSpreadChart = (props) => {
	let dailyConfirm_ChartOptions = {
		
		key: 'dailyConfirmed',
		labels: {
			fontColor: 'white',
		},
		title: {
			display: true,
			text: 'Confirmed Cases',
			fontSize: 20,
			fontColor: '#FF073A',
			fontFamily:"Source Sans Pro, sans-serif"
		},
		legend: {
			display: false
		},
		maintainAspectRatio: false,
		scales: {
			yAxes: [
				{
					ticks: {
						fontColor: '#003f5c',
						stepSize: 500,
						beginAtZero: true,
						fontFamily:"Source Sans Pro, sans-serif"
					},
				},
			],
			xAxes: [
				{
					ticks: {
						fontColor: '#003f5c',
						stepSize: 500,
						beginAtZero: true,
						fontFamily:"Source Sans Pro, sans-serif"
					},
				},
			],
		},
	};

	let monthyconfirmed_ChartOptions = {
		
        key:'monthyconfirmed',
		labels: {
			fontColor: 'rgb(255,255,255)',
		},
		title: {
			display: true,
			text: 'Monthly Spread',
			fontSize: 20,
			fontColor: '#2E9BC6',
			fontFamily:"'Source Sans Pro', sans-serif"
		},
		legend: {
			display: false,
			position: 'top',
		},
		maintainAspectRatio: false,
		scales: {
			yAxes: [
				{
					ticks: {
						fontColor: '#003f5c',
						stepSize: 30000,
						beginAtZero: true,
						fontFamily:"Source Sans Pro, sans-serif"
					},
				},
			],
			xAxes: [
				{
					ticks: {
						fontColor: '#003f5c',
						stepSize: 500,
						beginAtZero: true,
						fontFamily:"Source Sans Pro, sans-serif"
					},
				},
			],
		},
	};
	let weeklyconfirmed_ChartOptions = {
		
        key:'weeklyconfirmed',
		labels: {
			fontColor: 'rgb(255,255,255)',
		},
		title: {
			display: true,
			text: 'Weekly Spread',
			fontSize: 20,
			fontColor: '#ef4648',
			fontFamily:"Source Sans Pro, sans-serif"
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
						fontColor: '#003f5c',
						stepSize: 5000,
						beginAtZero: true,
						fontFamily:"Source Sans Pro, sans-serif"
					},
				},
			],
			xAxes: [
				{
					ticks: {
						fontColor: '#003f5c',
						stepSize: 500,
						beginAtZero: true,
						fontFamily:"Source Sans Pro, sans-serif"
					},
				},
			],
		},
	};


	let dailyRecovered_ChartOptions = {
        key:'dailyRecovered',
		labels: {
			fontColor: 'rgb(255,255,255)',
		},
		title: {
			display: true,
			text: 'Recovered Cases',
			fontSize: 20,
			fontColor: '#28A745',
			fontFamily:"Source Sans Pro, sans-serif"
			
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
						fontColor: '#003f5c',
						stepSize: 500,
						beginAtZero: true,
						fontFamily:"Source Sans Pro, sans-serif"
					},
				},
			],
			xAxes: [
				{
					ticks: {
						fontColor: '#003f5c',
						stepSize: 5000,
						beginAtZero: true,
						fontFamily:"Source Sans Pro, sans-serif"
					},
				},
			],
		},
	};

	let chart_options = [dailyConfirm_ChartOptions, dailyRecovered_ChartOptions, monthyconfirmed_ChartOptions,weeklyconfirmed_ChartOptions];
    let chartContent = null;
    let index = chart_options.findIndex((item) => item.key === props.chartName);;

	switch (props.chartName) {
		case 'dailyConfirmed':
			chartContent = (
				<div className={Classes.ChartGrid}>
					<div className={props.classes}>
						<Line data={props.dataset} options={chart_options[index]} />
					</div>
					<div className={Classes.ChartDetails}>
						<div className={Classes.Detail}>
							<i className="fa fa-arrow-up upwardIcon" aria-hidden="true"></i>
							<p>
								<span className={Classes.newCasestxt+ ' red'}>
									+{props.daily_cases.todayCases[0].newlyAdded}
								</span>{' '}
								new Cases Today
							</p>
						</div>
					</div>
				</div>
			);
            break;
        case 'monthyconfirmed':
            chartContent = (<div className={Classes.ChartGrid}>
                <div className={props.classes}>
                    <Bar data={props.dataset} options={chart_options[index]} />
                </div>
                <div className={Classes.ChartDetails}>
                    <div className={Classes.Detail}>
                        {(props.increasedRate >0) ? (
                        <i className="fa fa-arrow-up upwardIcon red" aria-hidden="true"></i>):
                        (<i className="fa fa-arrow-down upwardIcon green" aria-hidden="true"></i>)}
                        <p>
                        {props.increasedRate>0 ?(  <span className={Classes.newCasestxt+ ' red'}>
                                +{props.increasedRate}
                            </span>):(<span className={Classes.newCasestxt+' green'}>
                                {props.increasedRate}
                            </span>)}{' '}
                             cases than last month
                        </p>
                    </div>
                </div>
            </div>)
            break;
        case 'dailyRecovered':
            chartContent = (<div className={Classes.ChartGrid}>
                <div className={props.classes}>
                    <Line data={props.dataset} options={chart_options[index]} />
                </div>
                <div className={Classes.ChartDetails}>
                    <div className={Classes.Detail}>
                        <i className="fa fa-arrow-up upwardIcon green" aria-hidden="true"></i>
                        <p>
                            <span className={Classes.newCasestxt+ ' green'}>
                                +{props.daily_cases.todayCases[2].newlyAdded}
                            </span>{' '}
                            new Cases Today
                        </p>
                    </div>
                </div>
            </div>)
			break;
		   case 'weeklyconfirmed':
            chartContent = (<div className={Classes.ChartGrid}>
                <div className={props.classes} style={{boxShadow: "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px #ef4648"}}>
                    <Bar data={props.dataset} options={chart_options[index]} />
                </div>
                <div className={Classes.ChartDetails}>
                    <div className={Classes.Detail}>
              
                        <p>
                             cases than last month
                        </p>
                    </div>
                </div>
			</div>)
			break;
		default:

			break;
	}

	return (chartContent);
};

export default dataSpreadChart;

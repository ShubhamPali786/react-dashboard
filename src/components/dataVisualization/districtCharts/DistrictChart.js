import React from 'react';
import Pie from 'react-chartjs-2';

const DistrictChart = (props) => {
	const convertObjToArray = (obj) => {
		let objKeys = Object.keys(obj);
		let districtArray = [];

		objKeys.forEach((ele) => {
			obj[ele].district = ele;
			districtArray.push(obj[ele]);
		});

		return districtArray;
	};
	let statecode = !props.state_code?"MH":props.state_code;
	let districtsObj = props.district_data.find((element) => element.statecode === statecode).districtData;
	let labels = Object.keys(districtsObj);
	let backgroundColors = [];
	let backgroundIndex = 0;
    let colors = ['#E25668', '#E28956', '#E2CF56', '#AEE256', 
                '#68E256',"#56E289","#56E2CF","#56AEE2",
                "#5668E2","#8A56E2","#CF56E2","#E256AE"];
	labels.forEach((item) => {
		if (backgroundIndex > colors.length-1) backgroundIndex = 0;
		backgroundColors.push(colors[backgroundIndex]);
		backgroundIndex += 1;
	});
	let districtArray = convertObjToArray(districtsObj);
	let confirmedArr = districtArray.map((item) => {
		return item.confirmed;
	});

	var options = {
		responsive: true, // Instruct chart js to respond nicely.
		maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
		legend: {
			display: false,
        },
		cutoutPercentage:50,
		tooltips: {
			callbacks: {
			  label: function(tooltipItem, data) {
				var dataset = data.datasets[tooltipItem.datasetIndex];
			  var index = tooltipItem.index;
			  return dataset.labels[index] + ': ' + dataset.data[index];
			}
		  }
		}
	};

	return (<div className="test">
			<Pie data={props.district_Chart_dataset} options={options} />
			</div>
		
	);
};

export default DistrictChart;

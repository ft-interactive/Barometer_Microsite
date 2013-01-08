/**
 * Grid theme for Highcharts JS
 * @author Torstein Hønsi
 */

Highcharts.theme = {
	colors: ['#9e2f50', '#4781aa', '#eda45e', '#a6a471', '#736e7e', '#94826b', '#936971', '#c36256', '#8ab5cd'],
	chart: {
		backgroundColor: '#fff1e0',
		borderWidth: 0,
		plotBackgroundColor: '#fff1e0',
		plotShadow: false,
		plotBorderWidth: 0,
		spacingRight: 20
		},
		
	title: {
			align : 'left',
			y: 5,
			style: { 
			color: '#333',
			font: 'bold 12px Arial, Helvetica, sans-serif'
			}
	},
	subtitle: {
		align: 'left',
		y: 20,
		style: { 
			color: '#333333',
			font: '12px Arial, Helvetica, sans-serif'
		}
	},
	xAxis: {
		lineColor: '#333',
        lineWidth: 2,
		tickColor: '#333',
        tickWidth: 1,
		tickPosition: 'outside',
		labels: {
           style: {
			color: '#333',
			font: '12px Arial, Helvetica, sans-serif',
			}
        }
	},
	yAxis: {
		gridLineColor: '#999',
		labels: {
		 style: {
			color: '#333',
			font: '12px Arial, Helvetica, sans-serif'
			}
		},
		title: {
			text: null
		}
	},
	plotOptions: {
		column: {
			borderWidth: 1,
			borderColor: '#000',
			shadow: false
		},	
		bar: {
			borderWidth: 1,
			borderColor: '#000',
			shadow: false
		},
		line: {
			shadow: false
		},
		pie: {
			lineWidth:1,
			slicedOffset:15,
			shadow:false,
			showInLegend:true,
			center: ["50%", "45%"],
			size: "85%",
			series: {
         	   showCheckbox: true,
        	},
			dataLabels: {
				enabled: false,
				color: '#333',		
				softConnector: false,					
				connectorColor: '#333',
				style: {
					font: '12px Arial, Helvetica, sans-serif',
				},	
			}
		}
	},
	legend: {
		layout: 'vertical',
		backgroundColor: '#FFFFFF',
		align: 'left',
		verticalAlign: 'top',
		floating: true,
		shadow: false,
		borderRadius: 0,
		itemStyle: {	
			font: '10pt Arial, Helvetica, sans-serif',
			color: '#333'
		},
		itemHiddenStyle: {
			color: 'gray'
		},
		
		itemHoverStyle: {
			color: '#4781aa'
		}
		},
	labels: {
		style: {
			color: '#333'
		}
	},
	 tooltip: {
		 style: {
			color: '#333',
			font: '12px Arial, Helvetica, sans-serif'
		},
			borderRadius: 0,
			shadow:false
    }
};

// Apply the theme
var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
	

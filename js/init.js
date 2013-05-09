/*
fighne 
*/

var FT = FT || {};
FT.Interactive = {
	appBuild: true,
	dataset: {
		cData:[]
	},
	tPointer:0,
	globalPieColours: ['#7FB4DB', '#9571A3', '#AE4C77','#7FB4DB', '#9571A3', '#AE4C77','#7FB4DB', '#9571A3', '#AE4C77'],
	pieColoursTopical: [],
	pieColoursTopicalFirst:["#7c0d00", "#a22519","#b1493f","#c36256","#d17c70","#df9c92","#ebbcb3","#ffe6dd"],
	pieColoursTopicalSecond:["#004e77", "#276997","#598caf","#75a5c2","#8ab5cd","#a9cadc","#bcd7e5","#e1eff8"],
	pieColoursTopicalThird:["#4e4c00","#655f23","#848243","#a19e68","#b9b886","#d0cfb1","#e1e1cd","#f2f2e9"],
	pieColours: ['#4781aa', '#4A3253', '#660E36','#4781aa', '#4A3253', '#660E36','#4781aa', '#4A3253', '#660E36'],
	topicBarColours: ['#4781aa', '#9e2f50', '#A7A59B'],
	dataSource: 'http://interactive.ftdata.co.uk/data/ft.interactive.data_v2.php?_cf=219&id=36&y=2012&q=3',
	dataSourceBase: 'http://interactive.ftdata.co.uk/data/ft.interactive.data_v2.php?_cf=241&id=36',
	dataSourceFilter: 'http://interactive.ftdata.co.uk/data/ft.interactive.data_v2.php?_cf=242&id=36',
	chkDataObj: function(obj,i,arr){
		if(typeof obj[arr[i]] === "undefined"){ obj[arr[i]] = {} };
		if(i<arr.length){
			var t = obj[arr[i]];
			i++;
			FT.Interactive.chkDataObj(t, i, arr);
		} else {
			return true;
		}
	},
	wrBlurb: function(pointer){
		var blurb = FT.Interactive.dataset[FT.Interactive.dataset.cData[0]][FT.Interactive.dataset.cData[1]].all.barometerConfig;
		
		//console.log(blurb.tab[pointer].questionDetail);
		$('#blurbTitle').html(blurb.tab[pointer].questionHeading);
		$('#blurbText').html(blurb.tab[pointer].questionDetail);
		return true;
	},
	yesNoBars: function(chartWidth, firstQ, lastQ, firstText, secondText, container) {
		var topicQ = FT.Interactive.dataset[FT.Interactive.dataset.cData[0]][FT.Interactive.dataset.cData[1]][FT.Interactive.dataset.cData[2]].topicalQuestions.question;
		var scaleFactor = Number(chartWidth / 100);
		for (i = firstQ; i < lastQ + 1; i++) {
			var o = '';
			o += '<div class="topicalQuestion">';
			o += '<div id="yesNo_' + Number(i - 2) + '"><b>' + topicQ[i].qtext + '</b></div>';
			o += '<div id="no_' + Number(i - 2) + '" class="noBar"></div>';
			o += '<div id="yes_' + Number(i - 2) + '" class="yesBar"></div>';
			o += '<div class="answers">';
			o += '<div style="float:left" id="yesTxt_' + Number(i - 2) + '"></div>';
			o += '<div style="float:right" id="noTxt_' + Number(i - 2) + '"></div>';
			o += '</div></div>';
			container.append(o);
			$('#noTxt_' + Number(i - 2)).empty();
			$('#yesTxt_' + Number(i - 2)).empty();
			$('#noTxt_' + Number(i - 2)).append(firstText + ': ' + Number(topicQ[i].option[1].content).toFixed(1) + "%");
			$('#yesTxt_' + Number(i - 2)).append(secondText + ': ' + Number(topicQ[i].option[0].content).toFixed(1) + "%");
			$('#no_' + Number(i - 2)).stop().animate({
				width: Number(Math.round(topicQ[i].option[0].content)) + "%"
			}, {
				duration: 1500,
				easing: 'easeOutExpo'
			});
		}
	},
	 yesNoMaybeBars: function(chartWidth, firstQ, lastQ, firstText, secondText, thirdText, container) {
		//console.log('func:yesNoMaybeBars');
		var topicQ = FT.Interactive.dataset[FT.Interactive.dataset.cData[0]][FT.Interactive.dataset.cData[1]][FT.Interactive.dataset.cData[2]].topicalQuestions.question;
		var scaleFactor = Number(chartWidth / 100);
		for (i = firstQ; i < lastQ + 1; i++) {
			var o = '';
			o += '<div class="topicalQuestion">';
			o += '<div id="yesNo_' + Number(i - 2) + '"><b>' + topicQ[i].qtext + '</b></div>';
			o += '<div id="first_' + Number(i - 2) + '" class="noBar"></div>';
			o += '<div id="second_' + Number(i - 2) + '" class="sameBar"></div>';
			o += '<div id="third_' + Number(i - 2) + '" class="yesBar"></div>';
			o += '<div class="answers">';
			o += '<div style="float:left; width: 150px;" id="firstTxt_' + Number(i - 2) + '"></div>';
			o += '<div style="float:left" id="secondTxt_' + Number(i - 2) + '"></div>';
			o += '<div style="float:right" id="thirdTxt_' + Number(i - 2) + '"></div>';
			o += '</div></div>';
			container.append(o);
			var noDivTest = Number(Math.round(topicQ[i].option[0].content * scaleFactor) + (Math.round(topicQ[i].option[2].content * scaleFactor) / 2) - $('.sameBar').width());
			//console.log($('.sameBar').width())
			$('#firstTxt_' + Number(i - 2)).empty();
			$('#secondTxt_' + Number(i - 2)).empty();
			$('#thirdTxt_' + Number(i - 2)).empty();
			$('#firstTxt_' + Number(i - 2)).append(firstText + ': ' + Number(topicQ[i].option[0].content).toFixed(1) + "%");
			$('#secondTxt_' + Number(i - 2)).append(secondText + ': ' + Number(topicQ[i].option[2].content).toFixed(1) + "%");
			$('#thirdTxt_' + Number(i - 2)).append(thirdText + ': ' + Number(topicQ[i].option[1].content).toFixed(1) + "%");
			$('#first_' + Number(i - 2)).stop().animate({
				width: Number(Math.round(topicQ[i].option[0].content)) + "%"
			}, {
				duration: 1500,
				easing: 'easeOutExpo'
			});
			$('#second_' + Number(i - 2)).stop().animate({
				width: Number(Math.round(topicQ[i].option[2].content)) + "%"
			}, {
				duration: 1500,
				easing: 'easeOutExpo'
			});
			$('#firstTxt_' + Number(i - 2)).stop().animate({
				width: noDivTest + "px"
			}, {
				duration: 1500,
				easing: 'easeOutExpo'
			});
			if (noDivTest < 80) {
				$('#firstTxt_' + Number(i - 2)).stop();
				$('#firstTxt_' + Number(i - 2)).css('width', 80 + "px");
			} else if (noDivTest > Number(chartWidth-80)) {
				$('#firstTxt_' + Number(i - 2)).stop();
				$('#firstTxt_' + Number(i - 2)).css({
					width: Number(chartWidth-160) + "px"
				});
			}
		}
	},
	topical: {
		pageHtml: function(html){
			$('#tab_3').html('');
			$('#tab_3').html(html);
		},
		pageData: function(){
			//console.log('func:pageData');
			var infoArr = FT.Interactive.topical.dataSources
			FT.Interactive.chkDataObj(FT.Interactive.dataset,0,[FT.Interactive.dataset.cData[0], FT.Interactive.dataset.cData[1], FT.Interactive.dataset.cData[2], 'topicalQuestions']);
			if(FT.Interactive.dataset.cData[2] === 'all'){
				$.getJSON(yqlUrl(infoArr[0]), pageBuild);
			} else {
				$.getJSON(yqlUrl(infoArr[1] + FT.Interactive.dataset.cData[2]),function(ds){}).success(pageReBuild);
			}
		}
	}
};

var  chart_0,chart_1,chart_2,chart_3,chart_4,chart_5;
FT.Interactive.options_0 = {
	chart: {
		defaultSeriesType: 'pie',
		plotBackgroundColor: null,
		plotBorderWidth: null,
		plotShadow: false,
		renderTo:'container_globalPie'
	},
	title: {
		text: ''
	},
	credits: {
		enabled:false
	},
	tooltip: {
		enabled:false
	},
	plotOptions: {
		pie: {
			allowPointSelect: false,
			cursor: 'default',
			dataLabels: {
				enabled: true,
				distance: -28,
				color: 'white',
				formatter: function() {
					return Math.round(this.y * 10) / 10;
				},
				style: {
					font:'normal 22px Georgia, sans-serif',
				}
				
			}
		}
	},
	legend: {
		enabled: false
	},
	series: []
};
			
FT.Interactive.options_1 = {
	chart: {
		defaultSeriesType: 'pie',
		plotBackgroundColor: null,
		backgroundColor: null,
		plotBorderWidth: null,
		plotShadow: false,
		renderTo:'container_pie',
	},
	title: {
		text: ''
	},
	credits: {
		enabled:false
	},
	tooltip: {
		formatter: function () {
			return '<b>' + this.point.name + '</b>: ' + Math.round(this.y * 10)/10 + '%';
		}
	},
	plotOptions: {
		pie: {
			borderWidth:2,
			allowPointSelect: false,
			shadow:true,
			cursor: 'pointer',
			dataLabels: {
				enabled: false,
			}
		}
	},
	legend: {
		enabled: false
	},
	series: []
};
			
FT.Interactive.options_2 = {
	chart: {
		renderTo: 'container_friendliness',
		defaultSeriesType: 'column',
		height:175,
		width:970
	},
	title: {
		text: ''
	},
	subtitle: {
		style: {
			font:'normal 12px Georgia, sans-serif',
		},
		text: '',
		floating: true,
		y:2					
	},
	tooltip: {
		formatter: function () {
			return '<b>' + this.x + '</b><br>' + this.series.name + ': ' + this.y  + '%';
		}
	},
	xAxis: {
		categories: [],
		tickPosition: 'outside' ,
		labels: {
			y:18	
		}
	
	},
	
	credits: {
		enabled:false
	},
	
	yAxis: {
		labels: {
			align: 'left',
			x: 0,
			y: -2
		},
		offset:5,
		min: 0,
		max: 80,
		title: {
			text:''					}
	},
	plotOptions: {
		 series: {
			pointPadding: -0.06,
			groupPadding: 0.2,
		 }
	},
	legend: {
		itemStyle: {
			color: '#333',
			font: '11px Arial, Helvetica, sans-serif',
		},
		enabled:true,
		layout: 'horizontal',
		borderWidth: 0,
		backgroundColor: '#fff1e0',
		x: 400,
		y: -18
		
	},
						
	series: [],
	exporting: {
		enabled: false
	}
};
			
FT.Interactive.options_3 = {
	chart: {
		renderTo: 'container_barRisks',
		defaultSeriesType: 'bar',
		 width: 960,
		 height:500
	},
	title: {
		text: ''
	},
	tooltip: {
		formatter: function () {
			return '<b>' + this.x + '</b>: ' + this.y  + '%';
		}
	},
	xAxis: {
		categories: [],
		tickPosition: 'outside' ,
	
	},
	
	credits: {
		enabled:false
	},
	
	yAxis: {
		labels: {
			align: 'center',
			x: 0,
			y: 12
		},
		min: 0,
		max: 100,
		title: {
			text:''	,
			y:30
		}
	},
	plotOptions: {
		 series: {
			pointPadding: -0.128,
			groupPadding: 0.2,
		 }
	},
	legend: {
		enabled:false
	},
						
	series: [],
	exporting: {
		enabled: false
	}
};
FT.Interactive.options_4single = {
	chart: {
		defaultSeriesType: 'pie',
		plotBackgroundColor: null,
		backgroundColor: null,
		plotBorderWidth: null,
		plotShadow: false,
		renderTo:'container_pieTopical',
		spacingLeft: 75
	},
	title: {
		text: ''
	},
	credits: {
		enabled:false
	},
	tooltip: {
		formatter: function () {
			return '<b>' + this.point.name + '</b>: ' + Math.round(this.y * 10)/10 + '%';
		}
	},
	plotOptions: {
		pie: {
			borderWidth:2,
			allowPointSelect: false,
			shadow:false,
			cursor: 'pointer',
			dataLabels: {
				enabled: false,
			}
		}
	},
	legend: {
		enabled: false
	},
	series: []
};
FT.Interactive.options_4double = {
	chart: {
		defaultSeriesType: 'pie',
		plotBackgroundColor: null,
		backgroundColor: null,
		plotBorderWidth: null,
		plotShadow: false,
		renderTo:'container_pieTopical',
		spacingLeft: 75
	},
	title: {
		text: ''
	},
	credits: {
		enabled:false
	},
	tooltip: {
		formatter: function () {
			return '<b>' + this.point.name + '</b>: ' + Math.round(this.y * 10)/10 + '%';
		}
	},
	plotOptions: {
		pie: {
			borderWidth:2,
			allowPointSelect: false,
			shadow:false,
			cursor: 'pointer',
			dataLabels: {
				enabled: false,
			}
		}
	},
	legend: {
		enabled: false
	},
	series: []
};
FT.Interactive.options_4triple = {
	chart: {
		defaultSeriesType: 'pie',
		plotBackgroundColor: null,
		backgroundColor: null,
		plotBorderWidth: null,
		plotShadow: false,
		renderTo:'container_pieTopical',
		spacingLeft: 75
	},
	title: {
		text: ''
	},
	credits: {
		enabled:false
	},
	tooltip: {
		formatter: function () {
			return '<b>' + this.point.name + '</b>: ' + Math.round(this.y * 10)/10 + '%';
		}
	},
	plotOptions: {
		pie: {
			borderWidth:2,
			allowPointSelect: false,
			shadow:false,
			cursor: 'pointer',
			dataLabels: {
				enabled: false,
			}
		}
	},
	legend: {
		enabled: false
	},
	series: []
};
FT.Interactive.options_5 = {
	colors:['#b1493f','#89865F','#598caf',"#ccc"],
	chart: {
		renderTo: 'container_countryBars',
		defaultSeriesType: 'column',
	},
	title: {
		text: ' ',
		margin:40 
	},
	tooltip: {
		formatter: function () {
			return '<b>' + this.x + '</b>: ' + this.y  + '%';
		}
	},
	xAxis: {
		categories: [],
		tickPosition: 'outside',
			labels: {
			rotation: -45,
			align: 'right',
			style: {
				fontSize: '13px',
				fontFamily: 'Verdana, sans-serif'
			}
		}
		
	},
	
	credits: {
		enabled:false
	},
	
	yAxis: {
		min:0,
		max:75,
		labels: {
			align: 'center',
			x: 0,
			y: 12
		},
		tickInterval: 20,
		title: {
			text:'Percentage %'	,
			y:0,
			x:-5
		}
	},
	plotOptions: {
		 series: {
			stacking: 'normal',
			pointPadding: -0.128,
			groupPadding: 0.2,
		 }
	},
	legend: {
		enabled:true,
		x:110,
		y:16,
		itemStyle: {
			color: '#333',
			font: '11px Arial, Helvetica, sans-serif',
		},
		enabled:true,
		layout: 'horizontal',
		borderWidth: 0,
		backgroundColor: '#fff1e0'
	},
						
	series: [],
	exporting: {
		enabled: false
	}
};
// chart for 2012_q2
FT.Interactive.options_6 = {
	colors:['#b1493f','#89865F','#598caf',"#ccc"],
	chart: {
		renderTo: 'container_countryBars',
		defaultSeriesType: 'column',
	},
	title: {
		text: ' ',
		margin:40 
	},
	tooltip: {
		formatter: function () {
			return '<b>' + this.x + '</b>: ' + this.y  + '%';
		}
	},
	xAxis: {
		categories: [],
		tickPosition: 'outside',
			labels: {
			rotation: -45,
			align: 'right',
			style: {
				fontSize: '13px',
				fontFamily: 'Verdana, sans-serif'
			}
		}
		
	},
	
	credits: {
		enabled:false
	},
	
	yAxis: {
		min:0,
		max:100,
		labels: {
			align: 'center',
			x: 0,
			y: 12
		},
		tickInterval: 20,
		title: {
			text:'Percentage %'	,
			y:0,
			x:-5
		}
	},
	plotOptions: {
		 series: {
			stacking: 'normal',
			pointPadding: -0.128,
			groupPadding: 0.2,
		 }
	},
	legend: {
		enabled:true,
		x:110,
		y:16,
		itemStyle: {
			color: '#333',
			font: '11px Arial, Helvetica, sans-serif',
		},
		enabled:true,
		layout: 'horizontal',
		borderWidth: 0,
		backgroundColor: '#fff1e0'
	},
						
	series: [],
	exporting: {
		enabled: false
	}
};

			//
function getPieDataSeries(dataset, flag){
	var series = [];
	$(dataset)
	.each( function(i){
		var _d={
			name: '',
			data: [],
			type:'pie',
			center:[],
			};
		var item;
		_d.name = $(this).attr('question');
		if(flag){
			// small
			_d.center.push([((i+1) * 35) - 19 + "%"]);
		} else {
			//large
			_d.center.push([((i+1) * 35) - 20 + "%"]);
		}
		var _n, _v, _c
		for(item in this.option){	
				_n = this.option[item].name
				_v = Number(this.option[item].content); 
				_d.data.push([_n,_v]);
		}
		series.push(_d);
	});
	return series;
};
			
function showHidePanel(id){
	for(var i=0; i < $("#divNav ul li a").length; i++) {
		//visibility:hidden||visible;
		//display:none||block
		var panel_off = {
			'display':'none'
		};
		
		var panel_on = {
			'display':'block'
		};
		
		i == id?$("#tab_" + id).css(panel_on):$("#tab_" + i).css(panel_off);
	}
	return true;
};
			
function showHideNav(id){
	$("#divNav ul li a").removeClass('current');
	$('#panel_' + id).addClass('current');
	return true;
};

function yqlUrl(url){
	//console.log('func:yqlUrl');
	return 'http://query.yahooapis.com/v1/public/yql?q='+encodeURIComponent("select * from xml where url='" + url + "'")+'&format=json&diagnostics=true&callback=?';
};			
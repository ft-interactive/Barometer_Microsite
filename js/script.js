/*
script file for Business Barometer - Peter Feeney 30th November 2012
*/
var FT = FT || {};
FT.Interactive = {
	appBuild: true,
	
	dataset: {},
	globalPieColours: ['#7FB4DB', '#9571A3', '#AE4C77','#7FB4DB', '#9571A3', '#AE4C77','#7FB4DB', '#9571A3', '#AE4C77'],
	pieColoursTopical: ['#676547','#89865F','#a6a471','#D1CC90','#ebe7b7','#426781','#598caf','#8ab5cd','#a9cadc','#d6e9f3'],
	pieColours: ['#4781aa', '#4A3253', '#660E36','#4781aa', '#4A3253', '#660E36','#4781aa', '#4A3253', '#660E36'],
	topicBarColours: ['#4781aa', '#9e2f50', '#A7A59B'],
	dataSource: 'http://interactive.ftdata.co.uk/data/ft.interactive.data_v2.php?_cf=219&id=36&y=2012&q=3',
	dataSourceBase: 'http://interactive.ftdata.co.uk/data/ft.interactive.data_v2.php?_cf=219&id=36',
	dataSourceFilter: 'http://interactive.ftdata.co.uk/data/ft.interactive.data_v2.php?_cf=220&id=36&y=2012&q=3&filter=',
	wrBlurb: function(pointer){
		var blurb = FT.Interactive.dataset[FT.Interactive.dataset.cData[0]][FT.Interactive.dataset.cData[1]].all.barometerConfig;
		$('#blurbTitle').html(blurb.tab[pointer].questionHeading);
		$('#blurbText').html(blurb.tab[pointer].questionDetail);
		return true;
	},
	yesNoBars: function(chartWidth, firstQ, lastQ, firstText, secondText, container) {
		//console.log('func:yesNoBars');
		var topicQ = FT.Interactive.dataset[FT.Interactive.dataset.cData[0]][FT.Interactive.dataset.cData[1]][FT.Interactive.dataset.cData[2]].topicalQuestions.question;
		var scaleFactor = Number(chartWidth / 100);
		for (i = firstQ; i < lastQ + 1; i++) {
			if (container.html() === '') {
				var o = '';
				o += '<div class="topicalQuestion">';
				o += '<div id="yesNo_' + Number(i - 2) + '"><b>' + topicQ[i].qtext + '</b></div>';
				o += '<div id="no_' + Number(i - 2) + '" class="noBar"></div>';
				o += '<div id="yes_' + Number(i - 2) + '" class="yesBar"></div>';
				o += '<div class="answers">';
				o += '<div style="float:left" id="yesTxt_' + Number(i - 2) + '"></div>';
				o += '<div style="float:right" id="noTxt_' + Number(i - 2) + '"></div>';
				o += '</div></div>';
				container.html(o);
			}
			$('#noTxt_' + Number(i - 2)).empty();
			$('#yesTxt_' + Number(i - 2)).empty();
			$('#noTxt_' + Number(i - 2)).append(firstText + ': ' + Number(topicQ[i].option[1].content).toFixed(1) + "%");
			$('#yesTxt_' + Number(i - 2)).append(secondText + ': ' + Number(topicQ[i].option[0].content).toFixed(1) + "%");
			$('#no_' + Number(i - 2)).stop().animate({
				width: Number(Math.round(topicQ[i].option[0].content * scaleFactor)) + "px"
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
			var noDivTest = Number(Math.round(topicQ[i].option[0].content * scaleFactor) + (Math.round(topicQ[i].option[2].content * scaleFactor) / 2) - $('#secondTxt_' + Number(i - 2)).width() / 2)
			$('#firstTxt_' + Number(i - 2)).empty();
			$('#secondTxt_' + Number(i - 2)).empty();
			$('#thirdTxt_' + Number(i - 2)).empty();
			$('#firstTxt_' + Number(i - 2)).append(firstText + ': ' + Number(topicQ[i].option[0].content).toFixed(1) + "%");
			$('#secondTxt_' + Number(i - 2)).append(secondText + ': ' + Number(topicQ[i].option[2].content).toFixed(1) + "%");
			$('#thirdTxt_' + Number(i - 2)).append(thirdText + ': ' + Number(topicQ[i].option[1].content).toFixed(1) + "%");
			$('#first_' + Number(i - 2)).stop().animate({
				width: Number(Math.round(topicQ[i].option[0].content * scaleFactor)) + "px"
			}, {
				duration: 1500,
				easing: 'easeOutExpo'
			});
			$('#second_' + Number(i - 2)).stop().animate({
				width: Number(Math.round(topicQ[i].option[2].content * scaleFactor)) + "px"
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
			if (noDivTest < 120) {
				$('#firstTxt_' + Number(i - 2)).stop();
				$('#firstTxt_' + Number(i - 2)).css('width', 120 + "px");
			} else if (noDivTest > 200) {
				$('#firstTxt_' + Number(i - 2)).stop();
				$('#firstTxt_' + Number(i - 2)).css({
					width: 200 + "px"
				});
			}
		}
	}
};
FT.Interactive.topical = {};
//FT.Interactive.dataFriendliness = [];
//FT.Interactive.dataThreat = [];
//FT.Interactive.ddArray = [];
//FT.Interactive.ddMenu = [];		
//FT.Interactive.catTitles = ["REGION","INDUSTRY","JOB","TURNOVER","ALL"];						   

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
					width:900
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
					 width: 900,
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
			FT.Interactive.options_4 = {
				chart: {
					defaultSeriesType: 'pie',
					plotBackgroundColor: null,
					backgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false,
					renderTo:'container_pieTopical',
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



$(document).ready(function() {
	
	
	function initGraphic(f){
		$("#sourcesCredits").html();
		$("#sourcesCredits").html(f.source + "<br/> " + f.byline);
		return true;
	};
	function yqlUrl(url){
		//console.log('func:yqlUrl');
		var rVal = 'http://query.yahooapis.com/v1/public/yql?q=';
		rVal += encodeURIComponent("select * from xml where url='" + url + "'");
		rVal += '&format=json&diagnostics=true&callback=?';
		return rVal;
	};
	
	function wrTab4(ds){
		var docfrag = document.createDocumentFragment();
		docfrag.innerHTML = ds.query.results.dataset.content;
		//$(docfrag).find();
		
	};
	
	function getSourcesList(){
		$.getJSON(yqlUrl('http://interactive.ftdata.co.uk/data/ft.interactive.data_v2.php?_cf=233'), function(ds){}).success(wrDateSelector);
	};
	
	function wrDateSelector(ds){
		FT.Interactive.conf = {sourcesList: ds.query.results.dataset.dateMenu.survey};
		for(var i=0; i<FT.Interactive.conf.sourcesList.length; i++){
			var q = FT.Interactive.conf.sourcesList[i];
			$('#yrList').append('<li data-value="' + q.year + '_' + q.quarter + '"><a href="#">' + q.yearLabel + '&nbsp;' + q.monthLabel +'</a></li>');
			if(i == 0){
				//console.log(FT.Interactive.dataset);
				FT.Interactive.dataset.cData = [q.year, q.quarter, 'all'];
			}
		}
		
		$('div#selectYr ul#yrList.the_menu li').bind("click", function(event){
			//console.log('select bis data');
			$('#selectYrStart').html($('div#selectYr ul#yrList.the_menu li:nth-child(' + ( $(this).index() +1) + ') a ').html());
			// from here we load the first 'All' dataset
			var dTmp = $(this).attr("data-value").split('_');
			loadDataset(dTmp[0], dTmp[1], 'all');
			
		});
		// always get the most current dataset
		$('#selectYrStart').html($('div#selectYr ul#yrList.the_menu li:nth-child(1) a ').html());
		loadDataset(FT.Interactive.dataset.cData[0], FT.Interactive.dataset.cData[1], FT.Interactive.dataset.cData[2]);
	};
	
	
	function crTabs(){
		//console.log('func:crTabs');
		$(FT.Interactive.dataset.barometerConfig.tab)
			.each( function(k){
				var tStr = '';
				if(k==0) {
					var tStr=' class="current" ';
					$("#tab_" + k).css('display', 'block');
				}else{
					$("#tab_" + k).css('display', 'none');
				}
				$('#divNav ul').append("<li><a href='#' " + tStr + "id='" + this.id +"' >" + this.name + "</a></li>");
			});
		// functionality which adds the event which change the css on tabs and the blurb text
		$("#divNav ul li a").bind("click", function(event){ 
			$("#divNav ul li a").removeClass('current');
			$(this).addClass('current');
			FT.Interactive.wrBlurb(this.id);
			if(this.id === '3'){
				// here's were we load the html for the final tab //*[@id="tab_3"] //*[@id="countryBarsTitle"]
				/*
				var fUrl = "http://interactive.ftdata.co.uk/data/ePoint/index.php?";
				fUrl += 'xPath=' + encodeURIComponent('//*[@id="tab_3"]');
				fUrl += '&';
				fUrl += 'url=' + encodeURIComponent('http://interactive.ftdata.co.uk/Barometer_Microsite/ci_' + FT.Interactive.dataset.cData[0] + '_q' + FT.Interactive.dataset.cData[1] + '.html');
				fUrl += '&';
				fUrl += 'callback=?';
				$.getJSON(fUrl,wrTab4);
				*/
				$.getScript('http://interactive.ftdata.co.uk/Barometer_Microsite/js/ci_' + FT.Interactive.dataset.cData[0] + '_q' + FT.Interactive.dataset.cData[1] + '.js')
			}
			for(var i=0; i < $("#divNav ul li a").length; i++) {
				i == this.id?$("#tab_" + this.id).css('display', 'block'):$("#tab_" + i).css('display', 'none');
			}
		});
		return true;
	};
	function crTab_0_Content(){
		var FTi = FT.Interactive.dataset[FT.Interactive.dataset.cData[0]][FT.Interactive.dataset.cData[1]]['all'];
		$(FTi.standardQuestions.pies.pie)
		.each( function(i){
			var _d={
				name: '',
				data: [],
				type:'pie',
				center:[],
				};
			var item;
			_d.name = $(this).attr('question');
			_d.center.push([((i+1) * 35) - 20 + "%"])
			var _n, _v, _c
			for(item in this.option){	
					_n = this.option[item].name
					_v = Number(this.option[item].content); 
					_d.data.push([_n,_v]);
			}
			FT.Interactive.options_0.colors = FT.Interactive.globalPieColours;
			FT.Interactive.options_0.series.push(_d);
		})
		chart_0 = new Highcharts.Chart(FT.Interactive.options_0);
		return true;
	};
	function crTab_0_ContentPlus(){
		var FTi = 	FT.Interactive.dataset[FT.Interactive.dataset.cData[0]][FT.Interactive.dataset.cData[1]][FT.Interactive.dataset.cData[2]];
		$(FTi.standardQuestions.pies.pie)
		.each( function(i){
			var _d={
				name: '',
				data: [],
				type:'pie',
				center:[],
				};
			var item;
			_d.name = $(this).attr('question');
			_d.center.push([((i+1) * 35) - 20 + "%"])
			var _n, _v, _c
			for(item in this.option){	
					_n = this.option[item].name
					_v = Number(this.option[item].content); 
					_d.data.push([_n,_v]);
			}
			FT.Interactive.options_1.colors = FT.Interactive.globalPieColours;
			FT.Interactive.options_1.series.push(_d);
		})
		chart_1 = new Highcharts.Chart(FT.Interactive.options_1);
		return true;
	};
	function crTab_1_Content(){
		var FTi = 	FT.Interactive.dataset[FT.Interactive.dataset.cData[0]][FT.Interactive.dataset.cData[1]][FT.Interactive.dataset.cData[2]];
		var fTable = FTi.standardQuestions.countryFriendliness.country;
		var fTableStr = '<table id ="friendlyTable" class="tablesorter" cellspacing="0">';
		fTableStr += '<thead>';
		fTableStr += '<tr>';
		fTableStr += '<th class="header">COUNTRY</th>';
		fTableStr += '<th class="header">VERY FRIENDLY</th>';
		fTableStr += '<th class="header">FRIENDLY</th>';
		fTableStr += '<th class="header">NEUTRAL</th>';
		fTableStr += '<th class="header">UNFRIENDLY</th>';
		fTableStr += '<th class="header">VERY UNFRIENDLY</th>';
		fTableStr += '</tr>';
		fTableStr += '</thead>';
		fTableStr += '<tbody>';
		
		for(var i=0; i<fTable.length; i++){
			fTableStr += '<tr>';
			fTableStr += '<td>' + fTable[i].name + '</td>';
			for(var j=0; j<5; j++){
				fTableStr += '<td>' + Number(fTable[i].option[j].content).toFixed(1) + '</td>';
			}
			fTableStr += '</tr>';
		};
		
		fTableStr += '</tbody>';
		fTableStr += '</table>';
		$('#container_friendliness_table').html(fTableStr);
		$("#friendlyTable").tablesorter( {	 widgets: ['zebra'], sortList:[[1,1]] });
		
		var _d0={
				name: "'Friendly' or 'very friendly' to business'",
				data: []
			};
		var _d1={
				name: "'Unfriendly' or 'very unfriendly to business'",
				data: []
			};
		var _sFriendly=[];
		$(FTi.standardQuestions.countryFriendliness.country)
			.each( function(i){
				_sFriendly.push($(this).attr('name'));
					
				_d0.data.push({
					y: Math.round(Number(this.friendly)),
				});
				_d1.data.push({
					y: Math.round(Number(this.unfriendly)),
				});
			});
			
		FT.Interactive.options_2.xAxis.categories = _sFriendly;
		FT.Interactive.options_2.title.text = '<br>';
		FT.Interactive.options_2.subtitle.text = '<b>How businesses see governments</b> (% of respondents)<br><br>';
		FT.Interactive.options_2.series = [];
		FT.Interactive.options_2.series.push(_d0);
		FT.Interactive.options_2.series.push(_d1);
		//FT.Interactive.options_2.series = FT.Interactive.dataFriendliness;
		$("#container_friendliness").empty();
		chart_2 && chart_2.destroy();
		chart_2 = null;
		chart_2 = new Highcharts.Chart(FT.Interactive.options_2);
		return true; 
	};
	
	function crTab_2_Content(){
		var FTi = 	FT.Interactive.dataset[FT.Interactive.dataset.cData[0]][FT.Interactive.dataset.cData[1]][FT.Interactive.dataset.cData[2]];
		//FT.Interactive.dataThreat = [];
		//FT.Interactive.categoriesThreat = [];
		FT.Interactive.options_3.xAxis.categories = [];
		FT.Interactive.options_3.series = [];
		$(FTi.standardQuestions.threats)
			.each( function(i){
				var _d={
						name: '',
						data: []
						};
				var _s=[];
				var item;
				for(item in this.dataItem){
					if(item == 'name'){
						_d.name = this.dataItem[item].name;
						
					} else {
						_s.push(this.dataItem[item].name);
						_d.data.push({
							y: Math.round(Number(this.dataItem[item].content)),
						});
					}
				}
				//FT.Interactive.categoriesThreat = _s;
				FT.Interactive.options_3.xAxis.categories = _s;
				//FT.Interactive.dataThreat.push(_d);
				FT.Interactive.options_3.series.push(_d);
			});
		//FT.Interactive.options_3.xAxis.categories = FT.Interactive.categoriesThreat;
		//FT.Interactive.options_3.series = FT.Interactive.dataThreat;
		$("#container_barRisks").empty();
		chart_3 && chart_3.destroy();
		chart_3 = null;
		chart_3 = new Highcharts.Chart(FT.Interactive.options_3);
		return true;
	};
	
	
	
	function loadDataset(yr, qtr, filter){
		console.log('yr=' + yr + '|qtr=' + qtr + '|filter=' + filter); 
		if(FT.Interactive.dataset[yr]){
			if(FT.Interactive.dataset[yr][qtr]){
				if(FT.Interactive.dataset[yr][qtr][filter]){
					//
				} else {
					FT.Interactive.dataset[yr][qtr][filter] = {};
				}
			} else {
				FT.Interactive.dataset[yr][qtr] = {};
				FT.Interactive.dataset[yr][qtr][filter] = {};
			}
		} else {
			FT.Interactive.dataset[yr] = {}
			FT.Interactive.dataset[yr][qtr] = {};
			FT.Interactive.dataset[yr][qtr][filter] = {};
		}
		FT.Interactive.dataset.cData = [yr, qtr, filter];
		var tUrl = '';
		if(filter == 'all'){
			tUrl = FT.Interactive.dataSourceBase + '&y=' + yr + '&q=' + qtr;
		} else {
			tUrl = FT.Interactive.dataSourceFilter + '&y=' + yr + '&q=' + qtr + '&filter=' + filter;
		}
		$.getJSON(yqlUrl(tUrl), function(ds){
			FT.Interactive.dataset[yr][qtr][filter] = ds.query.results.dataset;
			// closing loop here
			if(FT.Interactive.appBuild){
				FT.Interactive.dataset.pagefurniture = ds.query.results.dataset.pagefurniture;
				FT.Interactive.dataset.barometerConfig = ds.query.results.dataset.barometerConfig;
				FT.Interactive.dataset.filtermenus = ds.query.results.dataset.filtermenus;
				FT.Interactive.dataset.standardQuestions = ds.query.results.dataset.standardQuestions;
				initGraphic(FT.Interactive.dataset.pagefurniture);
				FT.Interactive.appBuild = false;
				crTabs();
				FT.Interactive.wrBlurb(0);
			} else {
				// process here after loading the first dataset
				$("#container_pie").empty();
				chart_0.destroy();
				chart_0 = null;
				FT.Interactive.options_0.series = [];
				chart_1 && chart_1.destroy();
				chart_1 = null;
				FT.Interactive.options_1.series = [];
				chart_2.destroy();
				chart_2 = null;
				FT.Interactive.options_2.series = [];
				chart_3 && chart_3.destroy();
				chart_3 = null;
				FT.Interactive.options_3.series = [];
			}
			crTab_0_Content();
			if(FT.Interactive.dataset.cData[2] != 'all'){ 
				crTab_0_ContentPlus();
			} else {
				$("#dropDown_1").css('display', 'none');
				$('#ddList_0 li::last-child').html('<a href="#">All (' + ds.query.results.dataset.standardQuestions.n + ')</a>');
				$('#dd_title_0').html('All (' + ds.query.results.dataset.standardQuestions.n + ')');
			}
			crTab_1_Content();
			crTab_2_Content();
			createEvents();
			if(FT.Interactive.topical[yr][qtr][filter]){FT.Interactive.topical[yr][qtr][filter]();}
		});
	};
	
	function createEvents(){
		$("#ddList_0 li").bind("click", function() {
			$("#dd_title_0").empty();
			$("#dd_title_0").append($(this).text());
			if(this.id == 4){
				// hide second drop down
				$("#dropDown_1").css('display', 'none');
				chart_1 && chart_1.destroy();
				chart_1 = null;
				FT.Interactive.options_1.series = [];
			} else {
				var FTi = FT.Interactive.dataset;
				$("#dd_title_1").html("All");
				$("#ddList_1").html("");
				for(var i=0; i< FTi.filtermenus.item.length; i++){
					if(this.id == 0 && FTi.filtermenus.item[i].menu == 'region'){
						$("#ddList_1").append("<li id= " + $("#ddList_1 li").length + "><a data-menu='" + FTi.filtermenus.item[i].code + "'>" +  FTi.filtermenus.item[i].label + "<span style='font-size:11px'><i> (" + FTi.filtermenus.item[i].n + ")</i></span></a></li>");
					} else if(this.id == 1 && FTi.filtermenus.item[i].menu == 'sector'){
						$("#ddList_1").append("<li id= " + $("#ddList_1 li").length + "><a data-menu='" + FTi.filtermenus.item[i].code + "'>" +  FTi.filtermenus.item[i].label + "<span style='font-size:11px'><i> (" + FTi.filtermenus.item[i].n + ")</i></span></a></li>");
					} else if(this.id == 2 && FTi.filtermenus.item[i].menu == 'job'){
						$("#ddList_1").append("<li id= " + $("#ddList_1 li").length + "><a data-menu='" + FTi.filtermenus.item[i].code + "'>" +  FTi.filtermenus.item[i].label + "<span style='font-size:11px'><i> (" + FTi.filtermenus.item[i].n + ")</i></span></a></li>");
					} else if(this.id == 3 && FTi.filtermenus.item[i].menu == 'size'){
						$("#ddList_1").append("<li id= " + $("#ddList_1 li").length + "><a data-menu='" + FTi.filtermenus.item[i].code + "'>" +  FTi.filtermenus.item[i].label + "<span style='font-size:11px'><i> (" + FTi.filtermenus.item[i].n + ")</i></span></a></li>");
					} else {
						// nothing selected
					}
				}
				$("#dropDown_1").css('display', 'block');
				$("#ddList_1 li").unbind();
				$("#ddList_1 li").bind("click", function() {
					$("#dd_title_1").empty();
					$("#dd_title_1").append($(this).text());
					loadDataset(FTi.cData[0],FTi.cData[1],$(this).find('a').attr('data-menu'));
				});
			};
			
		});
	};

	getSourcesList();
	
	$("#dropDown_1").css('display', 'none');
	
	$('#selectYr').click(function () {
		$('#yrList').slideToggle('fast');
	});
	$('#dropDown_0').click(function () {
		$('#ddList_0').slideToggle('fast');
	});
	$('#dropDown_1').click(function () {
		$('#ddList_1').slideToggle('fast');
	});
});
/*
script file for Business Barometer - Peter Feeney 30th November 2012
*/
console.log(':');
var FT = FT || {};
FT.Interactive = FT.Interactive || {};
FT.Interactive.dataFriendliness = [];
FT.Interactive.dataThreat = [];
FT.Interactive.ddArray = [];
FT.Interactive.ddMenu = [];
FT.Interactive.globalPieColours = ['#7FB4DB', '#9571A3', '#AE4C77','#7FB4DB', '#9571A3', '#AE4C77','#7FB4DB', '#9571A3', '#AE4C77'];
FT.Interactive.pieColoursTopical = ['#676547','#89865F','#a6a471','#D1CC90','#ebe7b7','#426781','#598caf','#8ab5cd','#a9cadc','#d6e9f3'];
FT.Interactive.pieColours = ['#4781aa', '#4A3253', '#660E36','#4781aa', '#4A3253', '#660E36','#4781aa', '#4A3253', '#660E36'];
FT.Interactive.topicBarColours = ['#4781aa', '#9e2f50', '#A7A59B'];
FT.Interactive.tmpCatArray = [];			
FT.Interactive.catsArray = ["By region", 
						   "By industry", 
						   "By job title", 
						   "By turnover", 
						   "All (1,740)"
						   ];
FT.Interactive.catTitles = ["REGION", 
						   "INDUSTRY", 
						   "JOB", 
						   "TURNOVER", 
						   "ALL"
						   ];						   

FT.Interactive.ddFlag = false;
FT.Interactive.dataPointer_0 = 4;
FT.Interactive.dataPointer_1 = 0;
var tabLength = 0;
var chart_1;
var chart_2;
var chart_3;
var chart_4;
var chart_5;
var mArr = {
			Jan: 0,
			Feb: 1,
			Mar: 2,
			Apr: 3,
			May: 4,
			Jun: 5,
			Jul: 6,
			Aug: 7,
			Sep: 8,
			Oct: 9,
			Nov: 10,
			Dec: 11
			};
// add data source URL here
FT.Interactive.dataSource = 'http://interactive.ftdata.co.uk/data/ft.interactive.data_v2.php?_cf=219&id=36&y=2012&q=3';

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
function initGraphic(f){
	//console.log('func:initGraphic');
	$(".title")
		.empty()
		.append(f.graphic_title);
	//$("#source").append("<i>" + f.source + "</i>");
	//$("#credits").append(" • Edited by " + f.edit_credits + " • Developed by " + f.design_credits);
	//$(".footer").css( "height", $("#credits").height() +5+"px" );
	$("#sourcesCredits").html();
	$("#sourcesCredits").html(f.source + "<br/> " + f.byline);
	
};

function yqlUrl(url){
	//console.log('func:yqlUrl');
	var rVal = 'http://query.yahooapis.com/v1/public/yql?q=';
	rVal += encodeURIComponent("select * from xml where url='" + url + "'");
	rVal += '&format=json&diagnostics=true&callback=?';
	return rVal;
};
$(document).ready(function() {
	console.log(':');
				$("#dropDown_1").css('display', 'none');
				function ucfirst(str) {
					var firstLetter = str.slice(0,1);
					return firstLetter.toUpperCase() + str.substring(1);
				}
				$('#dropDown_0').click(function () {
					$('#ddList_0').slideToggle('fast');
				});
				$('#dropDown_1').click(function () {
					$('#ddList_1').slideToggle('fast');
				});

				$.getJSON(yqlUrl(FT.Interactive.dataSource), function(ds){}).success(createOptions);
				
				function createOptions(ds){
					//console.log('func:createOptions');
					FT.Interactive.dataset = ds.query.results.dataset;
					//console.log(FT.interactive.dataset)
					FT.Interactive.ddArray = [];
					FT.Interactive.dataFriendliness = [];
					FT.Interactive.dataThreat = [];
					FT.Interactive.dataCountries = [];
					//$('#preloader').css('display','none');
					FT.Interactive.catsArray[(FT.Interactive.catsArray.length-1)] = 'All (' + ds.query.results.dataset.standardQuestions.n + ')';
					if (FT.Interactive.ddFlag == false) {
						initGraphic(ds.query.results.dataset.pagefurniture);
						$("#dd_title_0").empty();
						$("#dd_title_0").append(FT.Interactive.catsArray[4]);
						//$("#sectionBlurb").empty();
						var sectionBlurb = "<span style='font-size:20px; line-height: 18px'>";
						sectionBlurb += "<b>" + ds.query.results.dataset.barometerConfig.tab[0].questionHeading + "</b>";
						sectionBlurb += "<br>";
						sectionBlurb += "<span style='font-size:13px'>" + ds.query.results.dataset.barometerConfig.tab[0].questionDetail;
						$("#sectionBlurb").html(sectionBlurb);
						//for(j=0; j<FT.Interactive.catsArray.length; j++) {
//							$("#ddList_0").append("<li id= "+j+"><a>" + FT.Interactive.catsArray[j] + "</a></li>");
//						}
						$(ds.query.results.dataset.filtermenus.item)
						.each( function(k){
							FT.Interactive.ddMenu.push({
								type:$(this).attr('menu'),
								label:$(this).attr('label'),
								urlCode:$(this).attr('code'),
								menuNum:$(this).attr('n')
							})
						})
						
						//*************create tabs****************
						$(ds.query.results.dataset.barometerConfig.tab)
						.each( function(k){
							var tStr = '';
							if(k==0) {
								var tStr=' class="current" ';
								$("#tab_" + k).css('display', 'block');
							}else{
								$("#tab_" + k).css('display', 'none');
							}
							$('#divNav ul').append("<li><a href='#' " + tStr + "id='" + this.id +"' >" + this.name + "</a></li>");
							tabLength++;
						})
						
						$("#divNav ul li a").bind("click", function(event){ 
							$("#divNav ul li a").removeClass('current');
							$(this).addClass('current');
							//$("#sectionBlurb").empty();
							var sectionBlurb = "<span style='font-size:20px; line-height: 18px'>";
							sectionBlurb += "<b>" +ds.query.results.dataset.barometerConfig.tab[this.id].questionHeading + "</b>";
							sectionBlurb += "<br>";
							sectionBlurb += "<span style='font-size:13px'>" + ds.query.results.dataset.barometerConfig.tab[this.id].questionDetail;
							$("#sectionBlurb").html(sectionBlurb);
							for(i=0; i < tabLength; i++) {
								$("#tab_" + i).css('display', 'none');
								$("#tab_" + this.id).css('display', 'block');
							}
						});
						
						/**********Create global pie charts************/
						$(ds.query.results.dataset.standardQuestions.pies.pie)
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
						var chart_0 = new Highcharts.Chart(FT.Interactive.options_0);
					}
					/**********End global pie charts************/
					
					if (FT.Interactive.ddFlag == true) {
						/**********Create pie charts************/
						$(ds.query.results.dataset.standardQuestions.pies.pie)
						.each( function(i){
							var _d={
								name: '',
								data: [],
								type:'pie',
								center:[],
								};
							var item;
							_d.name = $(this).attr('question');
							_d.center.push([((i+1) * 35) - 19 + "%"])
							var _n, _v, _c
							for(item in this.option){	
									_n = this.option[item].name
									_v = Number(this.option[item].content); 
									_d.data.push([_n,_v]);
							}
							FT.Interactive.options_1.colors = FT.Interactive.pieColours;
							FT.Interactive.options_1.plotOptions.series = {
								animation: false
							}
							FT.Interactive.options_1.series.push(_d);
						})
						$("#container_pie").empty();
						chart_1 && chart_1.destroy();
						chart_1 = null;
						chart_1 = new Highcharts.Chart(FT.Interactive.options_1);
					}
					/**********End pie charts************/
					
					/**********Create friendliness datagrid************/
						var fTable = FT.Interactive.dataset.standardQuestions.countryFriendliness.country;
						var fTableStr = '<table id ="friendlyTable" class="tablesorter" cellspacing="0">';
						for(var i=0; i<fTable.length; i++){
							if(i==0){
								fTableStr += '<thead>';
								fTableStr += '<tr><th class="header">COUNTRY</th><th class="header">VERY FRIENDLY</th><th class="header">FRIENDLY</th><th class="header">NEUTRAL</th><th class="header">UNFRIENDLY</th><th class="header">VERY UNFRIENDLY</th></tr>';
								fTableStr += '</thead>';
								fTableStr += '<tbody>';
							}
							fTableStr += '<tr>';
							fTableStr += '<td>' + fTable[i].name + '</td>';
							for(var j=0; j<5; j++){
								fTableStr += '<td>' + Number(fTable[i].option[j].content).toFixed(1) + '</td>';
							}
							fTableStr += '</tr>';
						};
						fTableStr += '</tbody>';
						fTableStr += '</table>';
						//console.log('fTable:' + fTableStr);
						$('#container_friendliness_table').html(fTableStr);
						$("#friendlyTable")
						.tablesorter(
						{	
							widgets: ['zebra'],
							sortList:[[1,1]]
						}); 
						/**********End friendliness datagrid************/
						
						/**********Create friendliness bar charts************/
						var _d0={
							name: "'Friendly' or 'very friendly' to business'",
							data: []
							};
						var _d1={
							name: "'Unfriendly' or 'very unfriendly to business'",
							data: []
							};
							var _sFriendly=[];
					$(ds.query.results.dataset.standardQuestions.countryFriendliness.country)
					.each( function(i){
							_sFriendly.push($(this).attr('name'));
								
							_d0.data.push({
								y: Math.round(Number(this.friendly)),
							});
							_d1.data.push({
								y: Math.round(Number(this.unfriendly)),
							});
						});
					
					FT.Interactive.categoriesFriendliness = _sFriendly;
					FT.Interactive.dataFriendliness.push(_d0);
					FT.Interactive.dataFriendliness.push(_d1);
					FT.Interactive.options_2.xAxis.categories = FT.Interactive.categoriesFriendliness;
					FT.Interactive.options_2.title.text = '<br>';
					FT.Interactive.options_2.subtitle.text = '<b>How businesses see governments</b> (% of respondents)<br><br>';
					FT.Interactive.options_2.series = FT.Interactive.dataFriendliness;
					$("#container_friendliness").empty();
					chart_2 && chart_2.destroy();
					chart_2 = null;
					chart_2 = new Highcharts.Chart(FT.Interactive.options_2);
					
					/**********End friendliness bar charts************/
					
					
					/**********Create threats bar charts************/
					$(ds.query.results.dataset.standardQuestions.threats)
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
						FT.Interactive.categoriesThreat = _s;
						FT.Interactive.dataThreat.push(_d);
					});
					FT.Interactive.options_3.xAxis.categories = FT.Interactive.categoriesThreat;
					FT.Interactive.options_3.series = FT.Interactive.dataThreat;
					$("#container_barRisks").empty();
					chart_3 && chart_3.destroy();
					chart_3 = null;
					chart_3 = new Highcharts.Chart(FT.Interactive.options_3);
					
					/**********End threats bar charts************/
					
					
					
					/**********End topical questions************/
					$("#ddList_0 li").unbind();
					$("#ddList_0 li").bind("click", function() {
						var countDD = 0;
						var text = $(this).text();
						$("#dd_title_0").empty();
						$("#dd_title_0").append(text);
						FT.Interactive.dataPointer_0 = this.id;
						$("#ddList_1").empty();
						$("#dropDown_1").css('display', 'block');
						$("#ddSection").empty();
						$("#ddSection").append("2. " + FT.Interactive.catTitles[FT.Interactive.dataPointer_0] + " (NO. OF RESPONDENTS)");
						FT.Interactive.tmpCatArray = []
						if (FT.Interactive.dataPointer_0 == 4) {
							$("#dropDown_1").css('display', 'none');
							$("#container_pie").empty();
							chart_1 && chart_1.destroy();
							chart_1 = null;
							//http://interactive.ftdata.co.uk/data/ft.interactive.data_v2.php?_cf=166&id=36&y=2012&q=2
							// http://interactive.ftdata.co.uk/data/ft.interactive.data_v2.php?_cf=219&id=36&y=2012&q=3
							FT.Interactive.dataSource = 'http://interactive.ftdata.co.uk/data/ft.interactive.data_v2.php?_cf=219&id=36&y=2012&q=3'
							//console.log(FT.interactive.dataSource)
							$.getJSON(yqlUrl(FT.Interactive.dataSource), function(ds){}).success(createOptions);
							$("#chartLabel").empty();
							$("#chartLabel").append("<b>All respondents</b>");
						}
						for(k=0; k<FT.Interactive.ddMenu.length; k++) {
							
							switch(Number(FT.Interactive.dataPointer_0)) {
								case 0:
									if(FT.Interactive.ddMenu[k].type == 'region') {
										$("#ddList_1").append("<li id= "+countDD+"><a>" + FT.Interactive.ddMenu[k].label + "<span style='font-size:11px'><i> (" + FT.interactive.ddMenu[k].menuNum + ")</i></span></a></li>");
										FT.Interactive.tmpCatArray.push(FT.Interactive.ddMenu[k].urlCode);
										countDD++
									}
								break;
								case 1:
									if(FT.Interactive.ddMenu[k].type == 'sector') {
										$("#ddList_1").append("<li id= "+countDD+"><a>" + FT.Interactive.ddMenu[k].label + "<span style='font-size:11px'><i> (" + FT.Interactive.ddMenu[k].menuNum + ")</i></span></a></li>");
										FT.Interactive.tmpCatArray.push(FT.Interactive.ddMenu[k].urlCode);
										countDD++
									}
								break;
								case 2:
									if(FT.Interactive.ddMenu[k].type == 'job') {
										$("#ddList_1").append("<li id= "+countDD+"><a>" + FT.Interactive.ddMenu[k].label + "<span style='font-size:11px'><i> (" + FT.interactive.ddMenu[k].menuNum + ")</i></span></a></li>");
										FT.Interactive.tmpCatArray.push(FT.Interactive.ddMenu[k].urlCode);
										countDD++
									}
								break;	
								case 3:
									if(FT.Interactive.ddMenu[k].type == 'size') {
										$("#ddList_1").append("<li id= "+countDD+"><a>" + FT.Interactive.ddMenu[k].label + "<span style='font-size:11px'><i> (" + FT.interactive.ddMenu[k].menuNum + ")</i></span></a></li>");
										FT.Interactive.tmpCatArray.push(FT.interactive.ddMenu[k].urlCode);
										countDD++
									}
								break;	
							}
						}
						$("#dd_title_1").empty();
						$("#dd_title_1").append("Choose option");
						$("#ddList_1 li").unbind();
						$("#ddList_1 li").bind("click", function() {
							FT.Interactive.ddFlag = true;
							var textdd_1 = String($(this).text());
							$("#dd_title_1").empty();
							$("#dd_title_1").append(textdd_1);
							var chartLabelTxt = textdd_1.substr(0, textdd_1.length-5)
							$("#chartLabel").empty();
							$("#chartLabel").append("<b>" + chartLabelTxt + "</b>");
							FT.Interactive.dataPointer_1 = this.id;
							// http://interactive.ftdata.co.uk/data/ft.interactive.data_v2.php?_cf=167&y=2012&q=2&filter=
							// http://interactive.ftdata.co.uk/data/ft.interactive.data_v2.php?_cf=220&id=36&y=2012&q=3&filter=
							FT.Interactive.dataSource = 'http://interactive.ftdata.co.uk/data/ft.interactive.data_v2.php?_cf=220&id=36&y=2012&q=3&filter=' + FT.interactive.tmpCatArray[FT.interactive.dataPointer_1]
							$.getJSON(yqlUrl(FT.Interactive.dataSource), function(ds){}).success(createOptions);
							
						});

					});
				}
			
			});
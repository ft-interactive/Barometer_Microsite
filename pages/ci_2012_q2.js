// JavaScript Document ci_2012_q2.js
$('div#dropDown_0').css("visibility", "visible");
$('#sectionBlurb').css("visibility", "visible");
var htmlElements = '';
FT.Interactive.topical.pageHtml(htmlElements);
htmlElements += '<div style="width: 960px; height: 500px; position: absolute; top: 180px; left: 20px; z-index:600">';
htmlElements += '<div id="pieTopicalTitle_0" class="pieTopical" style="width:450px;padding-right:20px;"></div>';
htmlElements += '<div id="pieTopicalTitle_1" class="pieTopical" style="width:450px;padding-right:20px;"></div>';
//htmlElements += '<div id="pieTopicalTitle_2" class="pieTopical"></div>';
htmlElements += '</div>';
htmlElements += '<div id="countryBarsTitle" class="pieTopical" style="width: 420px; height: 550px; position: absolute; top: 444px; left: 10px; z-index:601; font-weight:bold;"></div>';
htmlElements += '<div id="container_countryBars" style="width: 420px; height: 290px; position: absolute; top: 447px; left: 1px; z-index:600" ></div>';
htmlElements += '<div id="container_topicalBars" style="width: 420px; height: 550px; position: absolute; top: 444px; left: 450px; z-index:600" ></div>';
htmlElements += '<div id="container_pieTopical" style="width: 800px; height: 240px; position: absolute; top: 230px; left: 50px; z-index:600" ></div>';
FT.Interactive.topical.pageHtml(htmlElements);
FT.Interactive.topical.dataSources = [
	'http://interactive.ftdata.co.uk/data/ft.interactive.data_v2.php?_cf=166&id=36&y=2012&q=2',
	'http://interactive.ftdata.co.uk/data/ft.interactive.data_v2.php?_cf=167&id=36&y=2012&q=2&filter='
];

FTi.chart_4 && FTi.chart_4.destroy();
FTi.chart_4 = null;
FTi.chart_5 && FTi.chart_5.destroy();
FTi.chart_5 = null;

FT.Interactive.topical.pageData();
FT.Interactive.dataCountries = [];
$('#FTi .content').css('height','760px');
function pageBuild(ds){ 
	var FTi = FT.Interactive;
	//FTi.wrBlurb(3);
	if(FT.Interactive.tPointer == 3){
		$('#blurbText').text(ds.query.results.dataset.pagefurniture.tab[3].questionDetail);
	}
	var topicQ = ds.query.results.dataset.topicalQuestions.question;
	FT.Interactive.chkDataObj(FT.Interactive.dataset,0,[FT.Interactive.dataset.cData[0], FT.Interactive.dataset.cData[1], FT.Interactive.dataset.cData[2], 'topicalQuestions']);
	FT.Interactive.dataset[FT.Interactive.dataset.cData[0]][FT.Interactive.dataset.cData[1]][FT.Interactive.dataset.cData[2]].topicalQuestions.question = topicQ;
	
	FTi.yesNoMaybeBars(420,3,4, topicQ[3].option[0].qlabel,topicQ[3].option[2].qlabel, topicQ[3].option[1].qlabel, $('#container_topicalBars'));
	FTi.yesNoMaybeBars(420,2,2, topicQ[2].option[0].qlabel,topicQ[2].option[2].qlabel, topicQ[2].option[1].qlabel, $('#container_topicalBars'));
	FTi.pieColoursTopical = [];
	for(i=0; i<topicQ.length; i++){
		if(topicQ[i].type == "pie"){
			for(j=0; j<topicQ[i].option.length; j++){
				switch(i){
					case 0:
					FTi.pieColoursTopical.push(FTi.pieColoursTopicalFirst[j]);
					break;
					
					case 1:
					FTi.pieColoursTopical.push(FTi.pieColoursTopicalSecond[j]);
					break;
					
					case 2:
					FTi.pieColoursTopical.push(FTi.pieColoursTopicalThird[j]);
					break;
				}
			}
		}
	}
	FTi.options_4double.colors = FTi.pieColoursTopical;
	FTi.options_4double.plotOptions.series = {
		animation: false
	}
	
	$(topicQ).each(function(i) {
		if(i<2) {
			//console.log(i)
			var _d={
				name: '',
				data: [],
				type:'pie',
				center:[],
				};
			var item;
			_d.name = $(this).attr('qtext');
			_d.center.push([((i+1) * 50) - 25 + "%"])
			var _n, _v, _c
			for(item in this.option){	
					_n = this.option[item].qlabel
					_v = Number(this.option[item].content); 
					_d.data.push([_n,_v]);
			}
			
			FTi.options_4double.series.data = [];
			FTi.options_4double.series.push(_d);
			$("#pieTopicalTitle_" + i).empty();
			$("#pieTopicalTitle_" + i).append('<b>' + topicQ[i].qtext + '</b>');
		}
	})
	$("#container_pieTopical").empty();
	FTi.chart_4 && FTi.chart_4.destroy();
	FTi.chart_4 = null;
	FTi.chart_4 = new Highcharts.Chart(FTi.options_4double);
	
	FT.Interactive.categories = [];
	FT.Interactive.dataCountries = [];
	FT.Interactive.options_6.series.data = [];
	$('#countryBarsTitle').html(ds.query.results.dataset.topicalQuestions.conditions.qtext);
	$(ds.query.results.dataset.topicalQuestions.conditions.dataItem)
	.each( function(i){
		var _d={
			name: '',
			data: []
			};
		_d.name = $(this).attr('name');
		var _s=[];
		var item;
		for(item in this.countryData){
				_s.push(this.countryData[item].name);
				_d.data.push(Number(this.countryData[item].content));
		}
		FT.Interactive.categories = _s;
		FT.Interactive.dataCountries.push(_d);
		//console.log(_d)
	})
	
	FT.Interactive.options_6.xAxis.categories = FT.Interactive.categories;
	FT.Interactive.options_6.series=FT.Interactive.dataCountries;
	FT.Interactive.options_6.yAxis.max = 100;
	$("#container_countryBars").empty();
	FTi.chart_6 && FTi.chart_6.destroy();
	FTi.chart_6 = null;
	FTi.chart_6 = new Highcharts.Chart(FT.Interactive.options_6);
};
function pageReBuild(ds){
	var FTi = FT.Interactive;
	var topicQ = ds.query.results.dataset.topicalQuestions.question;
	FT.Interactive.chkDataObj(FT.Interactive.dataset,0,[FT.Interactive.dataset.cData[0], FT.Interactive.dataset.cData[1], FT.Interactive.dataset.cData[2], 'topicalQuestions']);
	FT.Interactive.dataset[FT.Interactive.dataset.cData[0]][FT.Interactive.dataset.cData[1]][FT.Interactive.dataset.cData[2]].topicalQuestions.question = topicQ;
	$('#container_topicalBars').html('');
	FTi.yesNoMaybeBars(420,2,2, topicQ[2].option[0].qlabel,topicQ[2].option[2].qlabel, topicQ[2].option[1].qlabel, $('#container_topicalBars'));
	FTi.yesNoMaybeBars(420,3,3, topicQ[3].option[0].qlabel,topicQ[3].option[2].qlabel, topicQ[3].option[1].qlabel, $('#container_topicalBars'));
	FTi.yesNoMaybeBars(420,4,4, topicQ[2].option[0].qlabel,topicQ[4].option[2].qlabel, topicQ[4].option[1].qlabel, $('#container_topicalBars'));
	FTi.pieColoursTopical = [];
	for(i=0; i<topicQ.length; i++){
		if(topicQ[i].type == "pie"){
			for(j=0; j<topicQ[i].option.length; j++){
				switch(i){
					case 0:
					FTi.pieColoursTopical.push(FTi.pieColoursTopicalFirst[j]);
					break;
					
					case 1:
					FTi.pieColoursTopical.push(FTi.pieColoursTopicalSecond[j]);
					break;
					
					case 2:
					FTi.pieColoursTopical.push(FTi.pieColoursTopicalThird[j]);
					break;
				}
			}
		}
	}
	FTi.options_4double.colors = FTi.pieColoursTopical;
	FTi.options_4double.plotOptions.series = {
		animation: false
	}
	
	$(topicQ).each(function(i) {
		if(i<2) {
			//console.log(i)
			var _d={
				name: '',
				data: [],
				type:'pie',
				center:[],
				};
			var item;
			_d.name = $(this).attr('qtext');
			_d.center.push([((i+1) * 50) - 25 + "%"])
			var _n, _v, _c
			for(item in this.option){	
					_n = this.option[item].qlabel
					_v = Number(this.option[item].content); 
					_d.data.push([_n,_v]);
			}
			
			FTi.options_4double.series.data = [];
			FTi.options_4double.series.push(_d);
			$("#pieTopicalTitle_" + i).empty();
			$("#pieTopicalTitle_" + i).append('<b>' + topicQ[i].qtext + '</b>');
		}
	})
	$("#container_pieTopical").empty();
	FTi.chart_4 && FTi.chart_4.destroy();
	FTi.chart_4 = null;
	FTi.chart_4 = new Highcharts.Chart(FTi.options_4double);
	
	FT.Interactive.categories = [];
	FT.Interactive.dataCountries = [];
	FT.Interactive.options_6.series.data = [];
	$('#countryBarsTitle').html(ds.query.results.dataset.topicalQuestions.conditions.qtext);
	$(ds.query.results.dataset.topicalQuestions.conditions.dataItem)
	.each( function(i){
		var _d={
			name: '',
			data: []
			};
		_d.name = $(this).attr('name');
		var _s=[];
		var item;
		for(item in this.countryData){
				_s.push(this.countryData[item].name);
				_d.data.push(Number(this.countryData[item].content));
		}
		FT.Interactive.categories = _s;
		FT.Interactive.dataCountries.push(_d);
		//console.log(_d)
	})
	
	FT.Interactive.options_6.xAxis.categories = FT.Interactive.categories;
	FT.Interactive.options_6.series=FT.Interactive.dataCountries;
	FT.Interactive.options_6.yAxis.max = 100;
	$("#container_countryBars").empty();
	FTi.chart_6 && FTi.chart_6.destroy();
	FTi.chart_6 = null;
	FTi.chart_6 = new Highcharts.Chart(FT.Interactive.options_6);
}
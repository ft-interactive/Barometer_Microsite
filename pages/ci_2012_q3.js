// JavaScript Document ci_2012_q3.js
$('div#dropDown_0').css("visibility", "visible");
$('#sectionBlurb').css("visibility", "visible");
var htmlElements = '';
FT.Interactive.topical.pageHtml(htmlElements);

htmlElements += '<div style="width:610px;height:50px;position:absolute;top:180px;left:150px;z-index:600">';
htmlElements += '<div id="pieTopicalTitle_0" class="pieTopical" style="position:absolute;top:210px;left:-60px;"></div>';
htmlElements += '<div id="pieTopicalTitle_1" class="pieTopical"></div>';
htmlElements += '<div id="pieTopicalTitle_2" class="pieTopical"></div>';
htmlElements += '</div>';
htmlElements += '<div id="countryBarsTitle" class="pieTopical" style="width:850px;height:240px;position:absolute;top:180px;left:64px;z-index:601; font-weight:bold;"></div>';
htmlElements += '<div id="container_countryBars" style="width:850px;height:240px;position:absolute;top:150px;left:51px;z-index:600"></div>';
htmlElements += '<div id="container_topicalBars" style="width:420px;height:550px;position:absolute;top:390px;left:460px;z-index:600"></div>';
htmlElements += '<div id="container_pieTopical" style="padding-left:10px;width:420px;height:290px;position:absolute;top:440px;left:50px;z-index:600;"></div>';
FT.Interactive.topical.pageHtml(htmlElements);
FT.Interactive.topical.dataSources = [
	'http://interactive.ftdata.co.uk/data/ft.interactive.data_v2.php?_cf=219&id=36&y=2012&q=3',
	'http://interactive.ftdata.co.uk/data/ft.interactive.data_v2.php?_cf=220&id=36&y=2012&q=3&filter='
	];
	
FTi.chart_4 && FTi.chart_4.destroy();
FTi.chart_4 = null;
FTi.chart_5 && FTi.chart_5.destroy();
FTi.chart_5 = null;

FT.Interactive.topical.pageData();		
	
function pageBuild(ds){
	//console.log('func:pageBuild');
	var FTi = FT.Interactive;
	//FTi.wrBlurb(3);
	if(FT.Interactive.tPointer == 3){
		// difference of dataset as t'tab is not in pagefurniture..... !
		$('#blurbText').text(ds.query.results.dataset.barometerConfig.tab[3].questionDetail);
	}
	var topicQ = ds.query.results.dataset.topicalQuestions.question;
	FT.Interactive.chkDataObj(FT.Interactive.dataset,0,[FT.Interactive.dataset.cData[0], FT.Interactive.dataset.cData[1], FT.Interactive.dataset.cData[2], 'topicalQuestions']);
	FT.Interactive.dataset[FT.Interactive.dataset.cData[0]][FT.Interactive.dataset.cData[1]][FT.Interactive.dataset.cData[2]].topicalQuestions.question = topicQ;
	FTi.yesNoMaybeBars(420, 1, 3, topicQ[1].option[0].qlabel, topicQ[1].option[2].qlabel, topicQ[1].option[1].qlabel, $('#container_topicalBars'));
	FTi.pieColoursTopical = [];
	for(i=0; i<topicQ.length; i++){
		if(topicQ[i].type == "pie"){
			for(j=0; j<topicQ[i].option.length; j++){
				switch(i){
					case 0:
					FTi.pieColoursTopical.push(FTi.pieColoursTopicalFirst[j]);
					console.log("1 pies");
					break;
					
					case 1:
					FTi.pieColoursTopical.push(FTi.pieColoursTopicalSecond[j]);
					console.log("2 pies");
					break;
					
					case 2:
					FTi.pieColoursTopical.push(FTi.pieColoursTopicalThird[j]);
					break;
				}
			}
		}
	}
	console.log(FTi.pieColoursTopical);
	FTi.options_4single.colors = FTi.pieColoursTopical;
	FTi.options_4single.plotOptions.series = {
		animation: false
	}
	FTi.options_4single.series.data = [];
	$(topicQ).each(function(i) {
		if (i < 1) {
			//console.log(i)
			var _d = {
				name: '',
				data: [],
				type: 'pie',
				center: [],
			};
			var item;
			_d.name = $(this).attr('qtext');
			_d.center.push([((i + 1) * 50) - 25 + "%"])
			var _n, _v, _c
			for (item in this.option) {
				_n = this.option[item].qlabel
	 			_v = Number(this.option[item].content);
				_d.data.push([_n, _v]);
			}
			
			FTi.options_4single.series.push(_d);
			$("#pieTopicalTitle_" + i).empty();
			$("#pieTopicalTitle_" + i).append('<b>' + topicQ[i].qtext + '</b>');
		}
	});
	$("#container_pieTopical").empty();
	FTi.chart_4 && FTi.chart_4.destroy();
	FTi.chart_4 = null;
	FTi.chart_4 = new Highcharts.Chart(FTi.options_4single);
	
	FTi.options_5.xAxis.categories = [];
	FTi.options_5.series = [];
	$('#countryBarsTitle').html(ds.query.results.dataset.topicalQuestions.question[0].qtext);
	$(FTi.dataset[FTi.dataset.cData[0]][FTi.dataset.cData[1]][FTi.dataset.cData[2]].topicalQuestions.question).each(function(i) {
		if (i == 4) {
			var _d = {
				name: '',
				data: []
			};
			_d.name = $(this).attr('name');
			var _s = [];
			var item;
			for (item in this.option) {
				_s.push(this.option[item].qlabel);
				_d.data.push(Number(this.option[item].content));
			}
			FTi.options_5.xAxis.categories = _s;
			FTi.options_5.series.push(_d);
		}
	});
	$("#container_countryBars").empty();
	FTi.chart_5 && FTi.chart_5.destroy();
	FTi.chart_5 = null;
	FTi.options_5.chart.defaultSeriesType = 'column';
	FTi.options_5.legend.enabled = false;
	FTi.chart_5 = new Highcharts.Chart(FTi.options_5);
	
}
function pageReBuild(ds){
	//console.log('func:pageReBuild');
	var FTi = FT.Interactive;
	var topicQ = ds.query.results.dataset.topicalQuestions.question;
	FT.Interactive.chkDataObj(FT.Interactive.dataset,0,[FT.Interactive.dataset.cData[0], FT.Interactive.dataset.cData[1], FT.Interactive.dataset.cData[2], 'topicalQuestions']);
	FT.Interactive.dataset[FT.Interactive.dataset.cData[0]][FT.Interactive.dataset.cData[1]][FT.Interactive.dataset.cData[2]].topicalQuestions.question = topicQ;
	$('#container_topicalBars').html('');
	FTi.yesNoMaybeBars(420, 1, 3, topicQ[1].option[0].qlabel, topicQ[1].option[2].qlabel, topicQ[1].option[1].qlabel, $('#container_topicalBars'));
	FTi.pieColoursTopical = [];
	for(i=0; i<topicQ.length; i++){
		if(topicQ[i].type == "pie"){
			for(j=0; j<topicQ[i].option.length; j++){
				var pieID = i;
				switch(pieID){
					case 0:
					FTi.pieColoursTopical.push(FTi.pieColoursTopicalFirst[j]);
					console.log("1 pie");
					break;
					
					case 1:
					FTi.pieColoursTopical.push(FTi.pieColoursTopicalSecond[j]);
					console.log("2 pies");
					break;
					
					case 2:
					FTi.pieColoursTopical.push(FTi.pieColoursTopicalThird[j]);
					break;
				}
			}
		}
	}
	console.log(FTi.pieColoursTopical);
	FTi.options_4single.colors = FTi.pieColoursTopical;
	FTi.options_4single.plotOptions.series = {
		animation: false
	}
	FTi.options_4single.series.data = [];
	$(topicQ).each(function(i) {
		if (i < 1) {
			//console.log(i)
			var _d = {
				name: '',
				data: [],
				type: 'pie',
				center: [],
			};
			var item;
			_d.name = $(this).attr('qtext');
			_d.center.push([((i + 1) * 50) - 25 + "%"])
			var _n, _v, _c
			for (item in this.option) {
				_n = this.option[item].qlabel
				_v = Number(this.option[item].content);
				_d.data.push([_n, _v]);
			}
			
			FTi.options_4single.series.push(_d);
			$("#pieTopicalTitle_" + i).empty();
			$("#pieTopicalTitle_" + i).append('<b>' + topicQ[i].qtext + '</b>');
		}
	});
	$("#container_pieTopical").empty();
	FTi.chart_4 && FTi.chart_4.destroy();
	FTi.chart_4 = null;
	FTi.chart_4 = new Highcharts.Chart(FTi.options_4single);
	
	FTi.options_5.xAxis.categories = [];
	FTi.options_5.series = [];
	$(FTi.dataset[FTi.dataset.cData[0]][FTi.dataset.cData[1]][FTi.dataset.cData[2]].topicalQuestions.question).each(function(i) {
		if (i == 4) {
			var _d = {
				name: '',
				data: []
			};
			_d.name = $(this).attr('name');
			var _s = [];
			var item;
			for (item in this.option) {
				_s.push(this.option[item].qlabel);
				_d.data.push(Number(this.option[item].content));
			}
			FTi.options_5.xAxis.categories = _s;
			FTi.options_5.series.push(_d);
		}
	});
	$("#container_countryBars").empty();
	FTi.chart_5 && FTi.chart_5.destroy();
	FTi.chart_5 = null;
	FTi.options_5.chart.defaultSeriesType = 'column';
	FTi.options_5.legend.enabled = false;
	FTi.chart_5 = new Highcharts.Chart(FTi.options_5);
}
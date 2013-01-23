// JavaScript Document
	
var htmlElements = '';
htmlElements += '<div style="width: 910px; height: 50px; position: absolute; top: 180px; left: 14px; z-index:600">';
htmlElements += '<div id="pieTopicalTitle_0" class="pieTopical"></div>';
htmlElements += '<div id="pieTopicalTitle_1" class="pieTopical"></div>';
htmlElements += '<div id="pieTopicalTitle_2" class="pieTopical"></div>';
htmlElements += '</div>';
htmlElements += '<div id="countryBarsTitle"></div>';
htmlElements += '<div id="container_topicalBars" style="width: 420px; height: 550px; position: absolute; top: 540px; left: 14px; z-index:600" ></div>';
htmlElements += '<div id="container_topicalBars2" style="width: 420px; height: 550px; position: absolute; top: 540px; left: 450px; z-index:600" ></div>';
htmlElements += '<div id="container_pieTopical" style="width: 580px; height: 240px; position: absolute; top: 230px; left: 144px; z-index:600" ></div>';
FT.Interactive.topical.pageHtml(htmlElements);
FT.Interactive.topical.dataSources = [
	'http://interactive.ftdata.co.uk/data/ft.interactive.data_v2.php?_cf=116&id=36&y=2012&q=1',
	'http://interactive.ftdata.co.uk/data/ft.interactive.data_v2.php?_cf=117&id=36&y=2012&q=1&filter='
	];
FT.Interactive.topical.pageData();

function pageBuild(ds){ 
	var FTi = FT.Interactive;
	FTi.wrBlurb(3);
	var topicQ = ds.query.results.dataset.topicalQuestions.question;
	FT.Interactive.chkDataObj(FT.Interactive.dataset,0,[FT.Interactive.dataset.cData[0], FT.Interactive.dataset.cData[1], FT.Interactive.dataset.cData[2], 'topicalQuestions']);
	FT.Interactive.dataset[FT.Interactive.dataset.cData[0]][FT.Interactive.dataset.cData[1]][FT.Interactive.dataset.cData[2]].topicalQuestions.question = topicQ;
	FTi.yesNoBars(420,3,4,topicQ[3].option[0].qlabel,topicQ[3].option[1].qlabel,$('#container_topicalBars'));
	FTi.yesNoBars(420,5,5,topicQ[3].option[0].qlabel,topicQ[3].option[1].qlabel,$('#container_topicalBars2'));
	FTi.yesNoMaybeBars(420,6,6, topicQ[6].option[0].qlabel,topicQ[6].option[2].qlabel, topicQ[6].option[1].qlabel, $('#container_topicalBars2'));

	$(topicQ)
		.each( function(i){
			if(i<3) {
				//console.log(i)
				var _d={
					name: '',
					data: [],
					type:'pie',
					center:[],
					};
				var item;
				_d.name = $(this).attr('qtext');
				_d.center.push([((i+1) * 35) - 19 + "%"])
				var _n, _v, _c
				for(item in this.option){	
						_n = this.option[item].qlabel
						_v = Number(this.option[item].content); 
						_d.data.push([_n,_v]);
				}
				
				FT.interactive.options_4.colors = FT.interactive.pieColoursTopical;
				FT.interactive.options_4.plotOptions.series = {
					animation: false
				}
			FTi.options_4.colors = FTi.pieColoursTopical;
			FTi.options_4.plotOptions.series = {
				animation: false
			}
			FTi.options_4.series.push(_d);
			$("#pieTopicalTitle_" + i).empty();
			$("#pieTopicalTitle_" + i).append('<b>' + topicQ[i].qtext + '</b>');
		}
	})
	$("#container_pieTopical").empty();
	FTi.chart_4 && FTi.chart_4.destroy();
	FTi.chart_4 = null;
	FTi.chart_4 = new Highcharts.Chart(FTi.options_4);
	$(topicQ).each(function(i) {
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
	FTi.options_5.legend.enabled = false, FTi.chart_5 = new Highcharts.Chart(FTi.options_5);
}
function pageReBuild(ds){
	var FTi = FT.Interactive;
	var topicQ = ds.query.results.dataset.topicalQuestions.question;
	FT.Interactive.chkDataObj(FT.Interactive.dataset,0,[FT.Interactive.dataset.cData[0], FT.Interactive.dataset.cData[1], FT.Interactive.dataset.cData[2], 'topicalQuestions']);
	FT.Interactive.dataset[FT.Interactive.dataset.cData[0]][FT.Interactive.dataset.cData[1]][FT.Interactive.dataset.cData[2]].topicalQuestions.question = topicQ;
	
	FTi.yesNoBars(420,3,4,topicQ[3].option[0].qlabel,topicQ[3].option[1].qlabel,$('#container_topicalBars'));
	FTi.yesNoBars(420,5,5,topicQ[3].option[0].qlabel,topicQ[3].option[1].qlabel,$('#container_topicalBars2'));
	FTi.yesNoMaybeBars(420,6,6, topicQ[6].option[0].qlabel,topicQ[6].option[2].qlabel, topicQ[6].option[1].qlabel, $('#container_topicalBars2'));
	
	$(topicQ)
		.each( function(i){
			if(i<3) {
				//console.log(i)
				var _d={
					name: '',
					data: [],
					type:'pie',
					center:[],
					};
				var item;
				_d.name = $(this).attr('qtext');
				_d.center.push([((i+1) * 35) - 19 + "%"])
				var _n, _v, _c
				for(item in this.option){	
						_n = this.option[item].qlabel
						_v = Number(this.option[item].content); 
						_d.data.push([_n,_v]);
				}
				
				FT.interactive.options_4.colors = FT.interactive.pieColoursTopical;
				FT.interactive.options_4.plotOptions.series = {
					animation: false
				}
			FTi.options_4.colors = FTi.pieColoursTopical;
			FTi.options_4.plotOptions.series = {
				animation: false
			}
			FTi.chart_4.series[0].setData(_d.data);
			$("#pieTopicalTitle_" + i).empty();
			$("#pieTopicalTitle_" + i).append('<b>' + topicQ[i].qtext + '</b>');
		}
	})
	
	$(topicQ).each(function(i) {
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
			FTi.chart_5.series[0].setData(_d.data);
		}
	});
}
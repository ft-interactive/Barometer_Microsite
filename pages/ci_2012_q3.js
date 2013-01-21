// JavaScript Document
(function(FTi) {
	// create environment
	var htmlElements = '<div style="width: 610px; height: 50px; position: absolute; top: 180px; left: 150px; z-index:600">';
	htmlElements += '<div id="pieTopicalTitle_0" class="pieTopical" style="position:absolute;top:210px;left:-60px;"></div>';
	htmlElements += '<div id="pieTopicalTitle_1" class="pieTopical"></div>';
	htmlElements += '<div id="pieTopicalTitle_2" class="pieTopical"></div>';
	htmlElements += '</div>';
	htmlElements += '<div id="countryBarsTitle"></div>';
	htmlElements += '<div id="container_countryBars" style="width: 850px; height: 240px; position: absolute; top: 150px; left: 51px; z-index:600" ></div>';
	htmlElements += '<div id="container_topicalBars" style="width: 420px; height: 550px; position: absolute; top: 390px; left: 460px; z-index:600" ></div>';
	htmlElements += '<div id="container_pieTopical" style="padding-left:20px; width: 420px; height: 290px; position: absolute; top: 440px; left: 50px; z-index:600;" ></div>';
	$('#tab_3').html(htmlElements);
	FTi.wrBlurb(3);
	//FTi.topical[FTi.dataset.cData[0]][FTi.dataset.cData[1]][FTi.dataset.cData[2]] = function(){console.log('2012 q3')};
	
	var topicQ = FTi.dataset[FTi.dataset.cData[0]][FTi.dataset.cData[1]][FTi.dataset.cData[2]].topicalQuestions.question;
	FTi.yesNoMaybeBars(420, 1, 3, topicQ[1].option[0].qlabel, topicQ[1].option[2].qlabel, topicQ[1].option[1].qlabel, $('#container_topicalBars'));
	$(FTi.dataset[FTi.dataset.cData[0]][FTi.dataset.cData[1]][FTi.dataset.cData[2]].topicalQuestions.question).each(function(i) {
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
	FTi.options_5.legend.enabled = false, FTi.chart_5 = new Highcharts.Chart(FTi.options_5);
}(FT.Interactive));
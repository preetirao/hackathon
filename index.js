$(document).ready(function() {

var url= window.location.href;
console.log(url)
    var Pie =  {
        chart: {
            renderTo: 'container2',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Title'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'answer',
            colorByPoint: true,
            data: [{
                name: 'Yes',
                y: 50
            }, {
                name: 'No',
                y: 20,
            },{
                name: 'Maybe',
                y: 10,
                sliced: true,
                selected: true
            }]
        }]
    };
    //////////////////////////////////////////////////////////////
    var Line = {
        chart: {
            renderTo: 'container1',
            zoomType: 'x'
        },
        title: {
            text: 'USD to EUR exchange rate over time'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
            // x-axis label
            type: 'datetime'
        },
        yAxis: {
            title: {
                // y-axis label
                text: 'Exchange rate'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },
        series: [{
            type: 'area',
            // name of pop-up boxs
            name: 'USD to EUR',
            // first element is in Date Object and second is the value
            data: [[Date.UTC(1970, 9, 21),10],[Date.UTC(1970, 9, 22),20],[Date.UTC(1970, 9, 23),50],[Date.UTC(1970, 9, 24),70],
            [Date.UTC(1970, 9, 25),40],[Date.UTC(1970, 9, 26),50]]
        }]
    }
    ///////////////////////////////////////////////////////////////
    var Bar =  {
        chart: {
            renderTo: 'container3',
            type: 'column'
        },
        title: {
            text: 'food'
        },
        subtitle: {
            text: 'egg'
        },
        xAxis: {
            categories: [
              'obj1',
              'obj2',
              'obj3'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: '# of people'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'egg',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        }]
    }
    ///////////////////////////////////////////////////////
    var Histogram = function(name, list) {
        this. chart: {
            renderTo: name,
            type: 'column'
	        },
	        title: {
	            text: 'Highcharts Histogram'
	        },
	        xAxis: {
	            gridLineWidth: 1
	        },
	        yAxis: [{
	            title: {
	                text: 'Histogram Count'
	            }
	        }, {
	            opposite: true,
	            title: {
	                text: 'Y value'
	            }
	        }],
	        series: [{
	            name: 'Amount',
	            type: 'column',
	            data: histogram(list, 10),
	            pointPadding: 0,
	            groupPadding: 0,
	            pointPlacement: 'between'
	        }]
    }
    /////////////////////required function//////////////////////////////
    function histogram(data, step) {
        var histo = {},
            x,
            i,
            arr = [];
        // Group down
        for (i = 0; i < data.length; i++) {
            x = Math.floor(data[i][0] / step) * step;
            if (!histo[x]) {
                histo[x] = 0;
            }
            histo[x]++;
        }
        // Make the histo group into an array
        for (x in histo) {
            if (histo.hasOwnProperty((x))) {
                arr.push([parseFloat(x), histo[x]]);
            }
        }
        // Finally, sort the array
        arr.sort(function (a, b) {
            return a[0] - b[0];
        });
        return arr;
    }

    var ynmcount = [0, 0, 0]

    $.ajax({
        url: "http://h4h-api.48yn9m8g4b.us-east-1.elasticbeanstalk.com/api/questionlabel",
        success: function(labeldata) {
            var questList = [];
            for (var item in labeldata) {
                if (labeldata[item].label.label == "market") {
                    questList.push(labeldata[item].question);
                }
            }

            $.ajax({
                url: "http://h4h-api.48yn9m8g4b.us-east-1.elasticbeanstalk.com/api/questionmetric",
                success: function(metricdata) {
                    var metricList = []
                    for (qlitem in questList) {
                        for (metricitem in metricdata) {
                            if (questList[qlitem].id == metricdata[metricitem].question) {
                                metricList.push(metricdata[metricitem].metric.metric_type)
                            }
                        }
                    }
                    console.log("hello");
                    $.ajax({
                        url: "http://h4h-api.48yn9m8g4b.us-east-1.elasticbeanstalk.com/api/metricresponse",
                        success: function(mrdata) {
                            for (metricitem in metricList) {
                                if (metricList[metricitem].type == "yesNoMaybe") {
                                    for (mritem in mrdata) {
                                        if (mrdata[mritem].metric == metricList[metricitem].id) {
                                            if (mrdata[mritem].text_value == "yes")
                                                ynmcount[0]++
                                                else if (mrdata[mritem].text_value == "no")
                                                    ynmcount[1]++
                                                    else
                                                        ynmcount[2]++
                                        }
                                    }

                                    Pie.series[0].data[0].y = ynmcount[0];
                            		Pie.series[0].data[1].y = ynmcount[1];
                            		Pie.series[0].data[2].y = ynmcount[2];
                            		var chart1 = new Highcharts.chart(Pie);

                                }
                            }
                           
                            
                        },
                        failure: function(er) {
                            console.log(er)
                        }
                    })
                },

                failure: function(er) {
                    console.log(er)
                }
            })
        },

        failure: function(er) {
            console.log(er)
        }

    })

});

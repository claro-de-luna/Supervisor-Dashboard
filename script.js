function company(name, ticker) {
    this.name = name;
    this.ticker = ticker;
    this.revenue = [];
    this.profit = []; //per month, for 4 years
    this.profitPerYear = [];
    this.sharePrice = [];
    this.roi = [];
    this.roe = [];
    this.engineeringPerformance = 0;
    this.marketingPerformance = 0;
    this.supportPerformance = 0;
    this.engineeringTarget = 0;
    this.marketingTarget = 0;
    this.supportTarget = 0;
    this.marketCap = 0;
    this.earningsPerShare = 0;
    this.ranking = 0;
}

const palantir = new company("Palantir Technologies", "PLTR");
const tesla = new company("Tesla Incorporation", "TSLA");
const apple = new company("Apple Incorporation", "AAPL");

function randomNumbers(metric, iteration, max){
    //For single numbers
    if (iteration == 1){
        metric = Math.round(Math.random() * max);
    }
    //For arrays
    else if (iteration > 1){
        for(i = 1; i <= iteration; i++){
            metric.push(Math.round(Math.random() * max));
        }
    }
    return metric;
}

function generateData(company){
    company.revenue = randomNumbers(company.revenue, 4, 100); //the value max = 100 makes sure the revenue is always bigger than the profits
    company.profit = randomNumbers(company.profit, 16, 5); // 16 values are generated for the profits, so the maximun value for profits is max = 100 / 16 = 6 (rounded up)
    company.sharePrice = randomNumbers(company.sharePrice, 12, 100);

    company.roi = randomNumbers(company.roi, 4, 100);
    company.roe = randomNumbers(company.roe, 4, 100);

    company.engineeringPerformance = randomNumbers(company.engineeringPerformance, 1, 7);
    company.marketingPerformance = randomNumbers(company.marketingPerformance, 1, 7);
    company.supportPerformance = randomNumbers(company.supportPerformance, 1, 7);

    company.engineeringTarget = randomNumbers(company.engineeringTarget, 1, 10);
    company.marketingTarget = randomNumbers(company.marketingTarget, 1, 10);
    company.supportTarget = randomNumbers(company.supportTarget, 1, 10);

    company.marketCap = randomNumbers(company.marketCap, 1, 100);
    company.earningsPerShare = randomNumbers(company.earningsPerShare, 1, 100);

    company.ranking = randomNumbers(company.ranking, 1, 10);

    //slices the profit array to return the profits per year separately, then sum the profits per year together in the profitPerYear array
    var index = 0;
    var array = [];
    var sum = 0;
    for (i=1; i<=4; i++){
        array = company.profit.slice(index, index + 4);
        index += 4;
        array.forEach(element => {
            sum += element;
        });
        company.profitPerYear.push(sum);
        sum = 0;
    }
    return company.profitPerYear;
}

generateData(palantir);
generateData(tesla);
generateData(apple);

function createTable(){
    $("#table").html(`<table id="table-overview">
            <thead>
                <tr>
                    <th>Ticker</th>
                    <th>Company Name</th>
                    <th>Market Cap</th>
                    <th>Revenue</th>
                    <th>ROE</th>
                    <th>ROE per quarter</th>
                    <th>ROI</th>
                    <th>ROI per quarter</th>
                </tr>
            </thead>
            <tbody id="table-overview-body">
                <tr id="palantir">
                    <th >PLTR</th>
                    <td>Palantir Technologies</td>
                    <td id="row1-col1"> </td>
                    <td id="row1-col2"> </td>
                    <td id="row1-col3"> </td>
                    <td id="row1-col4" data-sparkline="${palantir.roe.join(', ')}"> </td>
                    <td id="row1-col5"> </td>
                    <td id="row1-col6" data-sparkline="${palantir.roi.join(', ')}"> </td>
        
                </tr>
                <tr id="tesla">
                    <th>TSLA</th>
                    <td>Tesla Incorporation</td>
                    <td id="row2-col1"> </td>
                    <td id="row2-col2"> </td>
                    <td id="row2-col3"> </td>
                    <td id="row2-col4" data-sparkline="${tesla.roe.join(', ')}"> </td>
                    <td id="row2-col5"> </td>
                    <td id="row2-col6" data-sparkline="${tesla.roi.join(', ')}"> </td>
        
                </tr>
                <tr id="apple">
                    <th>AAPL</th>
                    <td>Apple Incorporation</td>
                    <td id="row3-col1"> </td>
                    <td id="row3-col2"> </td>
                    <td id="row3-col3"> </td>
                    <td id="row3-col4" data-sparkline="${apple.roe.join(', ')}"> </td>
                    <td id="row3-col5"> </td>
                    <td id="row3-col6" data-sparkline="${apple.roi.join(', ')}"> </td>
                </tr>
            </tbody>
        </table>`);
}

function populateTable(){
    $('#row1-col1').text(`$ ${palantir.marketCap}B`);
    $('#row1-col2').text(`$ ${palantir.revenue[palantir.revenue.length - 1]}B`);
    $('#row1-col3').text(`$ ${palantir.roe[palantir.roe.length - 1]}`);
    $('#row1-col5').text(`$ ${palantir.roi[palantir.roi.length - 1]}`);


    $('#row2-col1').text(`$ ${tesla.marketCap}B`);
    $('#row2-col2').text(`$ ${tesla.revenue[tesla.revenue.length - 1]}B`);
    $('#row2-col3').text(`$ ${tesla.roe[tesla.roe.length -1]}`);
    $('#row2-col5').text(`$ ${tesla.roi[tesla.roi.length - 1]}`);


    $('#row3-col1').text(`$ ${apple.marketCap}B`);
    $('#row3-col2').text(`$ ${apple.revenue[apple.revenue.length - 1]}B`);
    $('#row3-col3').text(`$ ${apple.roe[apple.roe.length - 1]}`);
    $('#row3-col5').text(`$ ${apple.roi[apple.roi.length - 1]}`);

}

function changeLabels(company){
    $("#company-name").text(company.name);
    $("#share-price").html(`Share Price  <span style="font-weight: bold">$${company.sharePrice[company.sharePrice.length - 1]}</span>`);
    $("#market-cap").html(`Market Cap  <span style="font-weight: bold">$${company.marketCap} B</span>`);
    $("#earnings-per-share").html(`EPS  <span style="font-weight: bold">$${company.earningsPerShare}</span>`);
    $("#rank").html(`Rank  #<span style="font-weight: bold">${company.ranking}</span>`);

}

$(document).ready(()=>{
    createTable();
    populateTable();

    loadSparklines();
    loadBarChart(palantir);
    loadLineChart(palantir);
    loadBulletChart(palantir);
    changeLabels(palantir);

    function loadCompany(company){
        changeLabels(company);
        drilldownChart = loadDrilldownChart(company);
    }

    $('#table-overview #palantir').click(()=>{
        loadCompany(palantir);
    });
    $('#table-overview #tesla').click(()=>{
        loadCompany(tesla);
    });
    $('#table-overview #apple').click(()=>{
        loadCompany(apple);
    }); 

    function rowSelection(){

    }
    $("#table-overview-body #palantir").click(function(){

        $(this).css(
            'background-color','rgb(202, 255, 202)'
        );
        $("#table-overview-body #tesla").css(
            'background-color','white'
        );
        $("#table-overview-body #apple").css(
            'background-color','white'
        );
    });

    $("#table-overview-body #tesla").click(function(){

        $(this).css(
            'background-color','rgb(202, 255, 202)'
        );
        $("#table-overview-body #palantir").css(
            'background-color','white'
        );
        $("#table-overview-body #apple").css(
            'background-color','white'
        );
    });

    $("#table-overview-body #apple").click(function(){

        $(this).css(
            'background-color','rgb(202, 255, 202)'
        );
        $("#table-overview-body #palantir").css(
            'background-color','white'
        );
        $("#table-overview-body #tesla").css(
            'background-color','white'
        );
    });
})

//BAR CHART - REVENUE VS PROFIT
function loadBarChart(company, clear){
    var chart;
    var options = {
        chart: {
            type: 'column',
        },
        title:{
            text: `${company.name} Annual Revenue vs Profit`,
            align: 'center',
        },
        xAxis: {
            categories: ['2020', '2021', '2022', '2023'],
        },
        yAxis: {
            min: 0,
            title: {
                text: 'in billions',
            },
        },
        exporting: {
            enabled: false,
        },
        credits: {
            enabled: false
        },
        tooltip: {
            valueSuffix: ' billions',
        },
        series: [
            {
                name: 'Revenue',
                data: company.revenue,
            },
            {
                name: 'Net Profit',
                data: company.profitPerYear,
            },
        ],
        
    };
    chart = Highcharts.chart('bar-chart-area', options);
    return chart;
}
//LINE CHART - STOCK PRICE
function loadLineChart(company){
    var chart;
    var options = { 
        title: {
            text: `${company.name} Historical Stock Price`,
            align: 'center',
        },
        tooltip: {
            valueSuffix: ' $',
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        exporting: {
            enabled: false,
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Share price',
            data: company.sharePrice,
        }],
    };

    chart = Highcharts.chart('line-chart-area', options);
    return chart; 
}

//DRILLDOWN CHART - PROFIT
function loadDrilldownChart(company){
    var chart;
    var options = {
        chart: {
            type: 'column'
        },
        title: {
            text: `${company.name}'s Profit`
        },
        xAxis: {
            type: 'category'// or quarter
        },
    
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        credits: {
            enabled: false
        },    
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true
                }
            }
        },
    
        series: [{
            name: 'Profit',
            colorByPoint: true,
            data: [{
                name: '2020',
                y: company.profitPerYear[0],
                drilldown: 'year1'
            }, {
                name: '2021',
                y: company.profitPerYear[1],
                drilldown: 'year2'
            }, {
                name: '2022',
                y: company.profitPerYear[2],
                drilldown: 'year3'
            }, {
                name: '2023',
                y: company.profitPerYear[3],
                drilldown: 'year4'
            }]
        }],
        drilldown: {
            series: [{
                id: 'year1',
                data: [
                    ['Q1', company.profit[0]],
                    ['Q2', company.profit[1]],
                    ['Q3', company.profit[2]],
                    ['Q4', company.profit[3]]
                ]
            }, {
                id: 'year2',
                data: [
                    ['Q1', company.profit[4]],
                    ['Q2', company.profit[5]],
                    ['Q3', company.profit[6]],
                    ['Q4', company.profit[7]]
                ]
            }, {
                id: 'year3',
                data: [
                    ['Q1', company.profit[8]],
                    ['Q2', company.profit[9]],
                    ['Q3', company.profit[10]],
                    ['Q4', company.profit[11]]
                ]
            }, {
                id: 'year4',
                data: [
                    ['Q1', company.profit[12]],
                    ['Q2', company.profit[13]],
                    ['Q3', company.profit[14]],
                    ['Q4', company.profit[15]]
                ]
            }]
        }
    };

    chart = Highcharts.chart('drilldown-chart-area', options);
    return chart;
}

//BULLET CHART - PERFORMANCE
function loadBulletChart(company){
    Highcharts.setOptions({
chart: {
    inverted: true,
    type: 'bullet',
    marginLeft: 75,
},
title: {
    text: null
},
legend: {
    enabled: false,
},
exporting: {
    enabled: false,
},
credits: {
    enabled: false
    },
yAxis: {
    gridLineWidth: 0, //removes vertical lines along the plots
    title: null, 
},
plotOptions: {
    series: {
        pointPadding: 0.40, //changes the tickness of the solid plot
        borderWidth: 0,
        color: '#190000',
        targetOptions: {
            width: '600%', //sets the width of the target based on the width of the solid plot
            color: '#E50000',
        },
    },
},
});
var chart1;
var chart2;
var chart3;
var options1;
var options2;
var options3;

options1 = {
    title: {
        text: `${company.name} Performance`,
    },
    xAxis: {
        categories: ['Engineering']
    },
    yAxis: {
        plotBands: [{
            from: 0,
            to: 4,
            color: '#FFE0E3',
        }, {
            from: 4,
            to: 7,
            color: '#FFFFCE',
        }, {
            from: 7,
            to: 10,
            color: '#E3FFE9',
        }],
    },
    series: [{
        data: [{
            y: company.engineeringPerformance,
            target: company.engineeringTarget
        }],
    }],
    tooltip: {
        pointFormat: '{point.y} (with target at {point.target})'
    },
};
chart1 = Highcharts.chart('container1', options1);

options2 = {
    xAxis: {
        categories: ['Marketing']
    },
    yAxis: {
        plotBands: [{
            from: 0,
            to: 4,
            color: '#FFE0E3',
        }, {
            from: 4,
            to: 7,
            color: '#FFFFCE',
        }, {
            from: 7,
            to: 10,
            color: '#E3FFE9',
        }],
    },
    series: [{
        data: [{
            y: company.marketingPerformance,
            target: company.marketingTarget
        }],
    }],
    tooltip: {
        pointFormat: '{point.y} (with target at {point.target})'
    },

};
chart2 = Highcharts.chart('container2', options2);

options3 = {
    xAxis: {
        categories: ['Support']
    },
    yAxis: {
        plotBands: [{
            from: 0,
            to: 5,
            color: '#FFE0E3',
        }, {
            from: 5,
            to: 8,
            color: '#FFFFCE',
        }, {
            from: 8,
            to: 10,
            color: '#E3FFE9',
        }],
    },
    series: [{
        data: [{
            y: company.supportPerformance,
            target: company.supportTarget,
        }],
    }],
    tooltip: {
        pointFormat: '{point.y} (with target at {point.target})'
    },

};
chart3 = Highcharts.chart('container3', options3);
}

//SPARKLINES - ROI & ROE
//Code borrowed from HighCharts and modified for this use case
function loadSparklines(){
    Highcharts.SparkLine = function (a, b, c) {
    const hasRenderToArg = typeof a === 'string' || a.nodeName;
    let options = arguments[hasRenderToArg ? 1 : 0];
    const defaultOptions = {
    chart: {
        renderTo: (
            (options.chart && options.chart.renderTo) ||
            (hasRenderToArg && a)
        ),
        backgroundColor: null,
        borderWidth: 0,
        type: 'area',
        margin: [2, 0, 2, 0],
        width: 120,
        height: 20,
        style: {
            overflow: 'visible'
        },
        // small optimalization, saves 1-2 ms each sparkline
        skipClone: true
    },
    title: {
        text: ''
    },
    credits: {
        enabled: false
    },
    exporting: {
            enabled: false,
    },
    xAxis: {
        labels: {
            enabled: false
        },
        title: {
            text: null
        },
        startOnTick: false,
        endOnTick: false,
        tickPositions: []
    },
    yAxis: {
        endOnTick: false,
        startOnTick: false,
        labels: {
            enabled: false
        },
        title: {
            text: null
        },
        tickPositions: [0]
    },
    legend: {
        enabled: false
    },
    tooltip: {
        hideDelay: 0,
        outside: true,
        shared: true
    },
    plotOptions: {
        series: {
            animation: false,
            lineWidth: 1,
            shadow: false,
            states: {
                hover: {
                    lineWidth: 1
                }
            },
            marker: {
                radius: 1,
                states: {
                    hover: {
                        radius: 2
                    }
                }
            },
            fillOpacity: 0.25
        },
        column: {
            negativeColor: '#910000',
            borderColor: 'silver'
        }
    }
    };

    options = Highcharts.merge(defaultOptions, options);

    return hasRenderToArg ?
    new Highcharts.Chart(a, options, c) :
    new Highcharts.Chart(options, b);
    };

    const start = +new Date(),
    tds = Array.from(document.querySelectorAll('td[data-sparkline]')),
    fullLen = tds.length;

    let n = 0;

    // Creating 153 sparkline charts is quite fast in modern browsers, but mobile
    // can take some seconds, so we split the input into chunks and
    // apply them in timeouts in order avoid locking up the browser process
    // and allow interaction.
    function doChunk() {
    const time = +new Date(),
    len = tds.length;

    for (let i = 0; i < len; i += 1) {
    const td = tds[i];
    const stringdata = td.dataset.sparkline;
    const arr = stringdata.split('; ');
    const data = arr[0].split(', ').map(parseFloat);
    const chart = {};

    if (arr[1]) {
        chart.type = arr[1];
    }

    Highcharts.SparkLine(td, {
        series: [{
            data: data,
            pointStart: 1
        }],
        tooltip: {
            headerFormat: '<span style="font-size: 10px">' +
                td.parentElement.querySelector('th').innerText +
                ', Q{point.x}:</span><br/>',
            pointFormat: '<b>{point.y}.000</b> USD'
        },
        chart: chart
    });

    n += 1;

    // If the process takes too much time, run a timeout
    // to allow interaction with the browser
    if (new Date() - time > 500) {
        tds.splice(0, i + 1);
        setTimeout(doChunk, 0);
        break;
    }
    }
    }
    doChunk();
}



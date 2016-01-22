// function to load static resources with Promise
function loadResourcesDynamically(id, url, success, failure) {
       var scriptPromise = new Promise(function(resolve, reject) {
         // Create a new script tag
         var script = document.createElement('script');
         // Use the url argument as source attribute
         script.src = url;
         script.id = id;

         // Call resolve when it’s loaded
         script.addEventListener('load', function() {
           resolve(url);
         }, false);

         // Reject the promise if there’s an error
         script.addEventListener('error', function() {
           reject(url);
         }, false);

         // Add it to the body
         document.head.appendChild(script);
       });

       return scriptPromise;
}
//function to define Chart
function createChart(chartsType, JSONData, valueField, categoryField, divId) {
          switch (chartsType) {
            case 'bar':
            var chart = AmCharts.makeChart(divId, {
                "type": "serial",
                "theme": "light",
                "dataProvider": JSONData,
                "valueAxes": [{
                    "gridColor": "#FFFFFF",
                    "gridAlpha": 0.2,
                    "dashLength": 0
                }],
                "gridAboveGraphs": true,
                "startDuration": 1,
                "graphs": [{
                    "balloonText": "[[category]]: <b>[[value]]</b>",
                    "fillAlphas": 0.8,
                    "lineAlpha": 0.2,
                    "type": "column",
                    "valueField": valueField
                }],
                "chartCursor": {
                    "categoryBalloonEnabled": false,
                    "cursorAlpha": 0,
                    "zoomable": false
                },
                "categoryField": categoryField,
                "categoryAxis": {
                    "gridPosition": "start",
                    "gridAlpha": 0,
                    "tickPosition": "start",
                    "tickLength": 20
                },
                "export": {
                    "enabled": true
                }
            });
            break;
            case 'bar3D':
            var chart = AmCharts.makeChart(divId, {
                "theme": "light",
                "type": "serial",
                "startDuration": 2,
                "dataProvider": JSONData,
                "graphs": [{
                    "balloonText": "[[category]]: <b>[[value]]</b>",
                    "fillColorsField": "color",
                    "fillAlphas": 1,
                    "lineAlpha": 0.1,
                    "type": "column",
                    "valueField": valueField
                }],
                "depth3D": 20,
                "angle": 30,
                "chartCursor": {
                    "categoryBalloonEnabled": false,
                    "cursorAlpha": 0,
                    "zoomable": false
                },    
                "categoryField": categoryField,
                "categoryAxis": {
                    "gridPosition": "start",
                    "labelRotation": 90
                },
                "export": {
                    "enabled": true
                }
            });
            jQuery('.chart-input').off().on('input change',function() {
              var property  = jQuery(this).data('property');
              var target    = chart;
              chart.startDuration = 0;
              
              if ( property == 'topRadius') {
                target = chart.graphs[0];
                if ( this.value == 0 ) {
                  this.value = undefined;
                }
              }
              target[property] = this.value;
              chart.validateNow();
            });
            break; 
            case 'pie' :
            var chart = AmCharts.makeChart( divId, {
                "type": "pie",
                "theme": "light",
                "dataProvider": JSONData,
                "valueField": valueField,
                "titleField": categoryField,
                "balloon":{
                    "fixedPosition":true
                },
                "export": {
                    "enabled": true
                }
            } );
            break;
            case 'pie3D' :
            var chart = AmCharts.makeChart( divId, {
                "type": "pie",
                "theme": "light",
                "dataProvider": JSONData,
                "valueField": valueField,
                "titleField": categoryField,
                "outlineAlpha": 0.4,
                "depth3D": 15,
                "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
                "angle": 30,
                "export": {
                    "enabled": true
                }
            });
            jQuery( '.chart-input' ).off().on( 'input change', function() {
              var property = jQuery( this ).data( 'property' );
              var target = chart;
              var value = Number( this.value );
              chart.startDuration = 0;
              if ( property == 'innerRadius' ) {
                value += "%";
              }
              target[ property ] = value;
              chart.validateNow();
            });
            break;
            case 'donut' :
            var chart = AmCharts.makeChart( divId, {
                "type": "pie",
                "theme": "light",
                "dataProvider": JSONData,
                "valueField": valueField,
                "titleField": categoryField,
                "balloon":{
                    "fixedPosition":true
                },
                "export": {
                    "enabled": true
                }
            });
            break;
            case 'donut3D' :
            var chart = AmCharts.makeChart( divId, {
                "type": "pie",
                "theme": "light",
                "titles": JSONData,
                "valueField": valueField,
                "titleField": categoryField,
                "startEffect": "elastic",
                "startDuration": 2,
                "labelRadius": 15,
                "innerRadius": "50%",
                "depth3D": 10,
                "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
                "angle": 15,
                "export": {
                    "enabled": true
                }
            });
            jQuery( '.chart-input' ).off().on( 'input change', function() {
              var property = jQuery( this ).data( 'property' );
              var target = chart;
              var value = Number( this.value );
              chart.startDuration = 0;
              if ( property == 'innerRadius' ) {
                value += "%";
              }
              target[ property ] = value;
              chart.validateNow();
            });
            break;
            case 'pieLegend' :
            var chart = AmCharts.makeChart(divId, {
                "type": "pie",
                "startDuration": 0,
                "theme": "light",
                "addClassNames": true,
                "legend":{
                    "position":"right",
                    "marginRight":100,
                    "autoMargins":false
                },
                "innerRadius": "30%",
                "defs": {
                    "filter": [{
                        "id": "shadow",
                        "width": "200%",
                        "height": "200%",
                        "feOffset": {
                            "result": "offOut",
                            "in": "SourceAlpha",
                            "dx": 0,
                            "dy": 0
                        },
                        "feGaussianBlur": {
                            "result": "blurOut",
                            "in": "offOut",
                            "stdDeviation": 5
                        },
                        "feBlend": {
                            "in": "SourceGraphic",
                            "in2": "blurOut",
                            "mode": "normal"
                        }
                    }]
                },
                "dataProvider": JSONData,
                "valueField": valueField,
                "titleField": categoryField,
                "export": {
                    "enabled": true
                }
            });
            chart.addListener("init", handleInit);
            chart.addListener("rollOverSlice", function(e) {
              handleRollOver(e);
            });
            function handleInit(){
              chart.legend.addListener("rollOverItem", handleRollOver);
            }
            function handleRollOver(e){
              var wedge = e.dataItem.wedge.node;
              wedge.parentNode.appendChild(wedge);  
            }
            break;
            case 'donutGradient' :
            var chart = AmCharts.makeChart(divId, {
                "type": "pie",
                "theme": "light",
                "innerRadius": "40%",
                "gradientRatio": [-0.4, -0.4, -0.4, -0.4, -0.4, -0.4, 0, 0.1, 0.2, 0.1, 0, -0.2, -0.5],
                "dataProvider": JSONData,
                "balloonText": "[[value]]",
                "valueField": valueField,
                "titleField": categoryField,
                "balloon": {
                    "drop": true,
                    "adjustBorderColor": false,
                    "color": "#FFFFFF",
                    "fontSize": 16
                },
                "export": {
                    "enabled": true
                }
            });
            default:      
          }
        }      

// Method to Inject Required Resource to build the Charts
function injectStaticResources(){
          loadScript('jquery', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min.js').then(function() {
          return loadScript('amcharts', '//www.amcharts.com/lib/3/amcharts.js');
        }).then(function() {
          return loadScript('dark', '//www.amcharts.com/lib/3/themes/dark.js');
        }).then(function() {
          return loadScript('light', '//www.amcharts.com/lib/3/themes/light.js');
        }).then(function() {
          return loadScript('pie', 'https://www.amcharts.com/lib/3/pie.js');
        }).then(function() {
          return loadScript('serial', '//www.amcharts.com/lib/3/serial.js');
        }).then(function() {
          console.log('Loaded!');
        });
      }
//Method to Create UserPrefrence Record
function setUserPreferenceRecord() {
    // This remoting call will use the page's timeout value
    var deviceType='';
    var applicationType='';
    var browserType='';
    var profileName='';

    if (!isMobile.any){
        deviceType = 'Desktop';
    }
    else if(isMobile.phone){
        deviceType = 'Phone';
    }
    else if(isMobile.tablet){
        deviceType = 'Tablet';
    }
    if(ForceUI.isSalesforce1()){
        applicationType = 'Salesforce1';
    }
    else {
        applicationType = 'Salesforce Classic';
    }
    browserType = ForceUI.browserType();
    var scriptPromise = new Promise(function(resolve, reject) {
    Visualforce.remoting.Manager.invokeAction(
        '{!$RemoteAction.UserPreferenceFeedController.createRecord}',
        applicationType,
        browserType,
        deviceType,
        '',
        function(result, event){
            if(event.status) {
                console.log(result.Id);
            }
        },
        {escape: true}
    );
  }); return scriptPromise;  
}

//Method to load all require resource for injecting data
function createUserPreferenceRecords(){
    loadResourcesDynamically('forcesniffer.js', 'https://rawgit.com/mailtoharshit/ForceSniffer.Js/master/js/forcesniffer.js').then(function() {
    return setUserPreferenceRecord();
  })
}



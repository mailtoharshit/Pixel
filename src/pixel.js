(function($){
    $.injectResources = function(scriptName, scriptPath)
    {
      (function(d, s, id)
       {
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)){ return; }
         js = d.createElement(s); js.id = id;
         js.onload = function(){
             // remote script has loaded
         };
         js.src = scriptPath;
         fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', scriptName));
   };
   $.loadinSeries = function(){
   	var scriptMap = new Map(); //Doesn't not have to be a hash map, any key/value map is fine
   	scriptMap.set('jquery.js', '//cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min.js');
   	scriptMap.set('amcharts.js', '//www.amcharts.com/lib/3/amcharts.js');
   	scriptMap.set('serial.js', '//www.amcharts.com/lib/3/serial.js');
   	scriptMap.set('pie.js', '//www.amcharts.com/lib/3/themes/pie.js');
   	scriptMap.set('light.js', '//www.amcharts.com/lib/3/themes/light.js');
   	scriptMap.set('dark.js', '//www.amcharts.com /lib/3/themes/dark.js');

   	for (var key of scriptMap.keys())
   	{
   	  $.injectResources(key,scriptMap.get(key));
   	}
   }
})(jQuery);

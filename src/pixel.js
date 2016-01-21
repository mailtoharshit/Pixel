(function($){
    if(!$.Pixel){
        $.Pixel = new Object();
    };
    
    $.Pixel.loadinSeries = function(el, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        
        // Add a reverse reference to the DOM object
        base.$el.data("Pixel.loadinSeries", base);
        
        base.init = function(){
            base.options = $.extend({},$.Pixel.loadinSeries.defaultOptions, options);
            
            // Put your initialization code here
        };
        
         base.injectResources = function(scriptName, scriptPath)
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
         }

         base.loadinSeries = function(){
          var scriptMap = new Map(); //Doesn't not have to be a hash map, any key/value map is fine
           scriptMap.set('jquery.js', '//cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min.js');
           scriptMap.set('amcharts.js', '//www.amcharts.com/lib/3/amcharts.js');
           scriptMap.set('serial.js', '//www.amcharts.com/lib/3/serial.js');
           scriptMap.set('pie.js', '//www.amcharts.com/lib/3/themes/pie.js');
           scriptMap.set('light.js', '//www.amcharts.com/lib/3/themes/light.js');
           scriptMap.set('dark.js', '//www.amcharts.com/lib/3/themes/dark.js');

           for (var key of scriptMap.keys())
           {
             injectResources(key,scriptMap.get(key));
           }
         };
        
        // Run initializer
        base.init();
    };
    
    $.Pixel.loadinSeries.defaultOptions = {
    };
    
    $.fn.pixel_loadinSeries = function(options){
        return this.each(function(){
            (new $.Pixel.loadinSeries(this, options));
        });
    };
    
    // This function breaks the chain, but returns
    // the Pixel.loadinSeries if it has been attached to the object.
    $.fn.getPixel_loadinSeries = function(){
        this.data("Pixel.loadinSeries");
    };
    
})(jQuery);
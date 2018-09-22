    var compiled_zooming_text = $('<div id="zoom_text">');
    
    var make_zooming_text = function (zoom_text)
    {
        //document.body.innerHTML = "test" + zoom_text;
      var max_len = Math.max(zoom_text.line_1.length,
                             zoom_text.line_2.length,
                             zoom_text.line_3.length);

      if (max_len > 0) {

        var j, i, z, cur_line, cur_spacing;
        var font_size = 50;

        if      (max_len >= 20) { font_size = 21; }
        else if (max_len >= 15) { font_size = 25; }
        else if (max_len >= 13) { font_size = 30; }
        else if (max_len >= 12) { font_size = 35; }
        else if (max_len >= 10) { font_size = 40; }
        else if (max_len >= 10) { font_size = 45; }
        else { font_size = 50; }

        var spacing = (font_size*2) + 25;

        var zin = 100;

        for (var j = 2; j >= 0; --j) {
          cur_spacing = (spacing * j) * 2;


          for(var i = 1; i <= font_size; ++i) {
            zin++;
            var z = (i == font_size) ? '00' : ((i<4)?'0':'')+(i*4).toString(16);

            //TODO - need jquery, or build css.  this is jquery bulding css
            cur_line = $('<div>'+ zoom_text['line_' + (j+1)] + '</div>').css({'z-index': zin,
                'left': (i*2) + 'px',
                'top':  (i+cur_spacing) + 'px',
                'color': '#'+z+z+z,
                'font-size': (i*2) + 'pt'});
            compiled_zooming_text.append(cur_line);
            //compiled_zooming_text = compiled_zooming_text + cur_line;
          }
        }
      }
    }

   var compile_zooming_text = function(zoom_text)
    {
      if (zoom_text.style == 'default') {
        var max_len = Math.max(zoom_text.line_1.length,
                               zoom_text.line_2.length,
                               zoom_text.line_3.length);

        if (max_len > 0) {
          this.make_zooming_text(zoom_text);
        }
      }
      else if (zoom_text.style == 'image') {

        /**
         * Only make the zooming text image as tall as it has to be.
         */

        var height = 750;

        if (zoom_text.line_3.trim() == '') {
          height = 480;
        }

        if (zoom_text.line_2.trim() == '') {
          height = 220;
        }

        var zoom_text_image_css = {"background-image" : "url('" + zoom_text.url + "')",
                                   "background-repeat": "no-repeat",
                                   "height"           : height + "px" };


        this.compiled_zooming_text.css(zoom_text_image_css);
      }
    }


$(document).ready(function() {

var data = {};

  data.line_1 = "UHHHHhhhhhh";
  data.line_2 = "TS";
  data.line_3 = "Richardson";
  data.style = "default";

  var url_string = window.location;
  var url = new URL(url_string);
  var line1 = url.searchParams.get("line1");
  var line2 = url.searchParams.get("line2");
  data.line_2 = line1;
  data.line_3 = line2;
  
  make_zooming_text(data)

  $('body').append(compiled_zooming_text);
  
});
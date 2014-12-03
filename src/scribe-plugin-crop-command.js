define("scribe-plugin-crop-command", ["jquery"], function($) {
  return function(options) {
    options = options || {};

    return function(scribe) {
      $(scribe.el).on("click", "[type='crop']", function(event) {
        var data = JSON.parse($(this).attr("data"));
        options.click.apply(scribe, [event, $(this).attr("src"), data.slide_id]);
      });

      scribe.commands.crop = new scribe.api.Command('insertHTML');
      scribe.commands.crop.nodeName = 'IMG';
      scribe.commands.crop.execute = function(slideId, coordinates) {
        var loadingId = scribe.loading();

        $.ajax({
          type: "POST",
          data: coordinates,
          url: options.url(slideId),
          success: function(response) {
            var data = {slide_id: slideId, coordinates: coordinates};
            scribe.replaceLoading(loadingId, "<img src='"+ response.url +"' type='crop' data='" + JSON.stringify(data) + "'></img>");
          }
        });
      };
    };
  };
});

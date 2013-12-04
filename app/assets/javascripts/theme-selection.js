$(function () {
  $('#theme-dropdown a').click(function() {
    var stylesheetPath = $(this).attr('cssfile');
    $('#theme-dropdown li').removeClass('active');
    $(this).closest('li').addClass('active');
    $("#theme-css").attr('href', stylesheetPath);
    saveUserStylesheet(stylesheetPath);
  });

  var saveUserStylesheet = function(stylesheetPath) {
    $('#theme-button').addClass('saving');

    $.ajax({
        url: '/user-preferences/stylesheet',
        method: 'PUT',
        data: {
          'user_preference': {
            'value': stylesheetPath
          }
        }
      })
      .done(function(response) {
        $('#theme-button').removeClass('saving');
      })
      .fail(function() {
        $('#theme-button').removeClass('saving');
      });
  };
});
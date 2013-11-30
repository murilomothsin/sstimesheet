$(function () {
  $('table#month > tbody > tr > td.task').click(function(){
    var $this = $(this);
    if (!$this.find('input').length) {
      newTask($this.closest('tr'));  
    }
  });

  var newTask = function(trObj) {
    var liObj = $('<li><input type="text" value="" /></li>')
      .appendTo(trObj.find('ul'));

    liObj.find('input')
      .focus()
      .keydown(function(e) {
          if (e.which == 13) {
            saveTask(trObj);
            newTask(trObj);
            e.preventDefault();
          } else if (e.which == 9) {
            saveTask(trObj);
            newTask(trObj.next());
            e.preventDefault();
          }
        })
        .focusout(function() {
          saveTask(trObj);
        });
  };

  var saveTask = function(trObj) {
    var inputObj = $('input[type=text]', trObj);
    var taskDescription = inputObj.val();
    var containerObj = inputObj.parent();

    if($.trim(taskDescription) == "") {
      containerObj.remove();
    } else {
      containerObj.addClass('saving');
      containerObj.html(taskDescription);

      var data = {
        task: {
          year: $('#year').val(),
          month: $('#month').val(),
          day: trObj.find('input[type=hidden]').val(),
          description: taskDescription
        }
      };

      $.post("/tasks", data)
        .done(function() {
          containerObj.removeClass('saving');
        })
        .fail(function() {
          containerObj.removeClass('saving');
          containerObj.addClass('error');
        });
    }
  };
});
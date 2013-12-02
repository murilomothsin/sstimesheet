$(function () {
  $('table#month > tbody > tr > td.task').click(function(e){
    var $this = $(this);
    var trObj = $this.closest('tr');

    if (e.target.tagName == 'LI') {
      if (!$this.find('input').length) {
        // saveTask(trObj);
        editTask($(e.target), trObj);
      }
    } else {
      if (!$this.find('input').length) {
        newTask(trObj);
      }  
    }
  });

  var addInputEvents = function(inputObj, trObj) {
    inputObj
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

  var newTask = function(trObj) {
    var liObj = $('<li><input type="text" value="" /></li>')
      .appendTo(trObj.find('ul'));

      addInputEvents(liObj.find('input'), trObj);
  };

  var editTask = function(liObj, trObj) {
    var taskId = liObj.attr('taskid');
    var taskDescription = liObj.text();
    var liContentObj = $('<input type="text" value="' + taskDescription + '" taskid="' + taskId + '" />');
    liObj.html(liContentObj);

    addInputEvents(liObj.find('input'), trObj);
  };

  var saveTask = function(trObj) {
    // TODO: Super spaguetti code. Break into smaller methods (edit, delete create)
    var inputObj = $('input[type=text]', trObj);
    var taskDescription = $.trim(inputObj.val());
    var containerObj = inputObj.parent();

    containerObj.addClass('saving');
    if(taskDescription == "") {
      containerObj.remove();
    } else {
      containerObj.html(taskDescription);
    }

    var data = {
      task: {
        year: $('#year').val(),
        month: $('#month').val(),
        day: trObj.find('input[type=hidden]').val(),
        description: taskDescription
      }
    };

    var method = 'POST';
    var url = "/tasks"

    var taskId = inputObj.attr('taskid');
    if(taskId) {
      data.task.id = taskId;
      url = url + "/" + taskId;

      if(taskDescription == "") {
        method = 'DELETE';
      } else {
        method = 'PUT';  
      }
    }

    if(taskDescription != "" || taskId) {
      $.ajax({
        url: url,
        method: method,
        data: data
      })
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
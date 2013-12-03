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

  var saveTask = function(trObj) {
    var task = getTaskData(trObj);
    task.containerObj.addClass('saving');
    task.containerObj.html(task.task.description);

    if(task.task.id) {
      if(task.task.description == "") {
        deleteTask(task);
      } else {
        updateTask(task);
      }     
    } else {
      createTask(task);
    }
  };

  var createTask = function(task) {
    if (task.task.description == "") {
      removeTaskElm(task.containerObj);
    } else {
      saveDataTask(
        task.task,
        "/tasks",
        'POST',
        task.containerObj,
        function(response) {
          task.containerObj.attr('taskid', response.id)
        }
      );
    }
  };

  var updateTask = function(task){
    saveDataTask(
      task.task,
      "/tasks/" + task.task.id,
      'PUT',
      task.containerObj
    );
  };  

  var deleteTask = function(task){
    saveDataTask(
      task.task,
      "/tasks/" + task.task.id,
      'DELETE',
      task.containerObj,
      function() {
        removeTaskElm(task.containerObj);
      }
    );
  };

  var saveDataTask = function(task_data, url, method, containerObj, completeCallback) {
    $.ajax({
        url: url,
        method: method,
        data: {
          'task': task_data
        }
      })
      .done(function(response) {
        containerObj.removeClass('saving');
        if(completeCallback) {
          completeCallback(response);
        }
      })
      .fail(function() {
        containerObj.removeClass('saving');
        containerObj.addClass('error');
      });
  };

  var getTaskData = function(tdObj) {
    var inputObj = $('input[type=text]', tdObj);

    return {
      'inputObj': inputObj,
      'containerObj': inputObj.parent(),
      'task': {
        'id': inputObj.attr('taskid'),
        'year': $('#year').val(),
        'month': $('#month').val(),
        'day': tdObj.find('input[type=hidden]').val(),
        'description': $.trim(inputObj.val())
      }
    };
  };

  var removeTaskElm = function(containerObj) {
    containerObj.fadeOut('slow', function() {
      containerObj.remove();  
    });
  };

});
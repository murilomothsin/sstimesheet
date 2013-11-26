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
    var inputObj = $('input', trObj);
    var taskDescription = inputObj.val();
    var containerObj = inputObj.parent();

    if($.trim(taskDescription) == "") {
      containerObj.remove();
    } else {
      containerObj.addClass('saving');
      containerObj.html(taskDescription);

      window.setTimeout(function() {
        containerObj.removeClass('saving');
      }, 1000);  
    }

    // TODO: send val to backend
  };
});
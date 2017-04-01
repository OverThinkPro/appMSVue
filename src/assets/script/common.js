$(function() {
  $("#menuHidden").on('click', function() {
    $("#nav, #system-pic").hide('800', () => {
      $("#list-wrap-show").css('display', 'block');
    });
  });

  $("#menuShow").on('click', function() {
    $("#list-wrap-show").css('display', 'none');
    $("#nav, #system-pic").show('400');
  });

  $("#sidebarToggle").on('click', function() {
    if ($(".sidebar").hasClass('sidebar-left')) {
        $(".sidebar").removeClass('sidebar-left').addClass('sidebar-right');
        $(".sidebar_toggle_box").find("i").removeClass('glyphicon-triangle-right').addClass('glyphicon-triangle-left');
    } else {
        $(".sidebar").removeClass('sidebar-right').addClass('sidebar-left');
        $(".sidebar_toggle_box").find("i").removeClass('glyphicon-triangle-left').addClass('glyphicon-triangle-right');
    }
  });
});

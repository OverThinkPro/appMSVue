$(function () {
  $("#menuHidden").on('click', function() {
    $("#nav, #system-pic").hide('800', () => {
      $("#list-wrap-show").css('display', 'block');
    });
  });

  $("#menuShow").on('click', function() {
    $("#list-wrap-show").css('display', 'none');
    $("#nav, #system-pic").show('400');
  });
});

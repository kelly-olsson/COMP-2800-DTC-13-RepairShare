$("#easter-egg").click(function () {
  $("#hammer").hide();
  $("#hammer-text").hide();
});

  $("#easter-egg").click(function(){
    $("#phrase").removeAttr('hidden');
    $("#dancers").removeAttr('hidden');
    $("#phrase").addClass('animated');
    $("#dancers").addClass('animated');
  });
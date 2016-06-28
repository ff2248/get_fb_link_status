$(function(){
  var inputUrl = $("#inputUrl"),
      shareResult = $("#shareResult"),
      likeResult = $("#likeResult"),
      commentResult = $("#commentResult"),
      totalResult = $("#totalResult"),
      onSync = false;

  $('#formUrl').submit(function(e) {
    e.preventDefault();
    get_url_status();
  });



  function get_url_status(){
    if (onSync) return;
    onSync = true;

    api_url = "https://api.facebook.com/restserver.php?method=links.getStats&format=json&urls=" + inputUrl.val();

    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: api_url,
      statusCode: {
        200: function (response) {
          shareResult.text(response[0].share_count);
          likeResult.text(response[0].like_count);
          commentResult.text(response[0].comment_count);
          totalResult.text(response[0].total_count);
        }
      },
      error: function(response) {
        alert("發生錯誤。");
      },
      complete: function() {
        onSync = false;
      }
    });
  };

});

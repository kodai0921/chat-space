$(function(){
    function buildHTML(message){
      if ( message.image ) {
        var html = 
          `<div class= "message" data-message-id=${message.id}>
          <div class="main_chat__message-list__section">
              <div class="main_chat__message-list__section__name_date">
                <div class="main_chat__message-list__section__name_date__name">
                  ${message.user_name}
                </div>
                <div class="main_chat__message-list__section__name_date__date">
                  ${message.created_at}
                </div>
              </div>
              <div class="main_chat__message-list__section__message">
                <p class="main_chat__message-list__section__message__content">
                  ${message.content}
                </p>
              </div>
              <img src=${message.image} >
            </div>
            </div>`

          return html;
      } else {
        var html = 
          `<div class= "message" data-message-id=${message.id}>
          <div class="main_chat__message-list__section">
            <div class="main_chat__message-list__section__name_date">
              <div class="main_chat__message-list__section__name_date__name">
                ${message.user_name}
              </div>
              <div class="main_chat__message-list__section__name_date__date">
                ${message.created_at}
              </div>
            </div>
            <div class="main_chat__message-list__section__message">
              <p class="main_chat__message-list__section__message__content">
                ${message.content}
              </p>
            </div>
          </div>
          </div>`
        return html;
      };
    }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
      .done(function(data){
        var html = buildHTML(data);
        $(".main_chat__message-list").append(html);
        $(".new_message")[0].reset();
        $(".main_chat__message-list").animate({ scrollTop: $(".main_chat__message-list")[0].scrollHeight});
      })
      .fail(function(){
        alert("メッセージ送信に失敗しました");
      })
      .always(function(data){
        $(".f__send-btn").prop( "disabled", false );
      });
  })
  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {

        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main_chat__message-list').append(insertHTML);
        $('.main_chat__message-list').animate({ scrollTop: $('.main_chat__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 3000);
  }
});

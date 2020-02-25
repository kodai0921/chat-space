$(function(){
    function buildHTML(message){
      if ( message.image ) {
        var html = 
          `<div class="main_chat__message-list__section">
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
            </div>`
          return html;
      } else {
        var html = 
          `<div class="main_chat__message-list__section">
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
          </div>`
        return html;
      };
    }
$('#new_message').on('submit', function(e){
    console.log('hoge');
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
});
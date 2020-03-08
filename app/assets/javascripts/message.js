$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
     `<div class="chat-main__messages__list" data-message-id=${message.id}>
        <div class="chat-main__messages__list__message-info">
          <div class="chat-main__messages__list__message-info__messanger-name">
           ${message.user_name}
          </div>
          <div class="chat-main__messages__list__message-info__message-date">
           ${message.created_at}
          </div>
        </div>
        <div class="chat-main__messages__list__message">
          <div class="chat-main__messages__list__message__lower-message__content">
            ${message.content}
          </div>
        </div>
          <img src=${message.image} >
      </div>`
     return html;
   } else {
     var html =
     `<div class="chat-main__messages__list" data-message-id=${message.id}>
          <div class="chat-main__messages__list__message-info">
            <div class="chat-main__messages__list__message-info__messanger-name">
             ${message.user_name}
            </div>
            <div class="chat-main__messages__list__message-info__message-date">
             ${message.created_at}
            </div>
           </div>
           <div class="chat-main__messages__list__message">
             <div class="lchat-main__messages__list__message__lower-message__content">
             ${message.content}
             </div>
           </div>
        </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.chat-main__messages').append(html);
    $('form')[0].reset();
    $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
    $('.submit').attr('disabled',false);
  })
  .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
})
});
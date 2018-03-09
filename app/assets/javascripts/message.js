$(function(){
  function buildHTML(message){

    if(message.image){
    var chatImage = message.image
    }
    else{
    var chatImage = ''
    }
    var html = `<div class="main__chat__sub__message">
                  <div class="main__chat__sub__message__upper-message">
                    <div class="main__chat__sub__message__upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="main__chat__sub__message__upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <br>
                  <div class="main__chat__sub__message__lower-message">
                    <p id="lower-content">
                      ${message.content}
                    </p>
                    <img class=$('lower-message__image') src=${chatImage}>
                  </div>
                </div>`
    return html;
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
      contentType: false,
      processData: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.main__chat__sub').append(html)
      $('#message_content').val('')
      $('.main__chat__form__submit').prop("disabled", false);
      $("html,body").animate({scrollTop:$('.main__chat__sub__message').last().offset().top});
    })
  })
})

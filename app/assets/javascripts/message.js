$(function(){
  function buildHTML(message){
    var html = `.main__chat__sub__message
                  .main__chat__sub__message__upper-message
                    .main__chat__sub__message__upper-message__user-name
                      = message.user.name
                    .main__chat__sub__message__upper-message__date
                      = message.created_at.strftime('%Y/%m/%d')
                  %br
                  .main__chat__sub__message__lower-meesage
                    - if message.content.present?
                      %p#lower-content
                        = message.content
                    = image_tag message.image.url, class: 'lower-message__image' if message.image.present?`
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
      console.log($('li.messages:last'))
      var html = buildHTML(data);
      $('messages').append(html)
      $('.textbox').val('')
      $("html,body").animate({scrollTop:$('li.messages:last').offset().top});
    })
  })
})

$(function(){
  function buildHTML(message){
    var html = `%ul
                  %li.name
                    = message.user.name
                  %li.date
                    = message.created_at.strftime('%Y/%m/%d')
                  %br
                  %li.body
                    - if message.content.present?
                      %p.lower-message__content
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
      var html = buildHTML(data);
      $('messages').append(html)
      $('.textbox').val('')
    })
  })
})

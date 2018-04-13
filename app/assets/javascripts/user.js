$(function(){

  var search_list = $('#user-search-result');

  function appendUser(user) {
    var html = `<div class='chat-group-user clearfix'>
                  <p class='chat-group-user__name'>${user.name}</p>
                  <a class='user-search-add chat-group-user__btn chat-group-user__btn--add' data-user-id=${user.id}' data-user-name='${user.name}'>追加</a>
                </div>`
    search_list.append(html);
  }

  function appendNoUser(user){
    var html = `<div class='chat-group-user clearfix'>
                  <p class='chat-group-user__name'>${user}</p>
                </div>`
    search_list.append(html);
  }

  $('#user-search-field').on('keyup', function(e){
    var input = $('#user-search-field').val();
    $('#user-search-result').empty();
      console.log(input !=="")
      if(input !==""){
        $.ajax({
          type: 'GET',
          url: '/users',
          data: { keyword: input },
          dataType: 'json'
        })

    .done(function(users) {
      if(users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      }else {
         appendNoUser('一致るするユーザーはありません');
       }
    })
// ユーザーの検索に失敗
    .fail(function() {
      alert('ユーザーの検索に失敗しました');
    })
     }
   });
// 追加ユーザーリスト作成
  function addUser(user_id, user_name) {
    var html = `<div class='chat-group-user clearfix' id='chat-group-user-8>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                    <p class='chat-group-user__name'>${user_name}</p>
                    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    $('#chat-group-users').append(html);
  }

// 追加ボタンクリック時の処理
  $('#user-search-result').on('click','.chat-group-user__btn--add',function(){
    var user_id = $(this).data('user-id');
    var user_name = $(this).data('user-name');
    addUser(user_id, user_name);
      $(this).parent().remove();
  });
// 削除ボタンクリック時の処理
  $('#chat-group-users').on('click','.chat-group-user__btn--remove',function(){
    $(this).parent().remove();
  });
});


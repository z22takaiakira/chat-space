json.content  @message.content
json.user_name @message.user.name
json.date @message.created_at.strftime('%Y/%m/%d')
json.image @message.image.url

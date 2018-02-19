## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## masageテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|integer||
|group_id|integer||


### Association
- belongs_to :group
- belongs_to :user

## userテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, unique|
|password|string|null: false|

### Association
- has_many :groups, through: :group_users
- has_many :group_users
- has_many :messages

## groupテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|

### Association
- has_many :users, through: :group_users
- has_many :group_users
- has_many :messages



class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validates :content, presence: true, unless: :image?
  mount_uploader :image, ImageUploader

  def posted_date
    created_at.strftime("%Y/%m/%d %H:%M:%S")
  end

end



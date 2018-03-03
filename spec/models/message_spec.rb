require 'rails_helper'

RSpec.describe Message,type: :model do
  describe '#create' do
    context 'can save' do

  it "is available to storage content" do
      expect(build(:message,image:"nil")).to be_valid
  end

  it "is available to storage image" do
      expect(build(:message,content:"nil")).to be_valid
  end

  it "is availabe to storage content and image "do

    expect(:message).to be_valid
  end

end

 context 'can not save' do
   it "is can't storage vailed image and content"do
     message =build(:message,content:"nil",image:"nil")
     message.vaild?
     expect(message.errors[:content]).to include('を入力してください')
   end

   it "is can't storage vaild group_id" do
     message =build(:message,group_id:"nil")
     message.vaild?
     expect(message.errors[:group_id]).to
     include('を入力してください')
   end

   it "is can't storage vaild user_id" do
     message =build(:message,user_id:"nil")
     message.vaild?
     expect(message.errors[:user_id]).to include('を入力してください')
    end
  end

  end
end


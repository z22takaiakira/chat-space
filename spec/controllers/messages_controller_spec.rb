require 'rails_helper'

describe MessagesController do
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do

    context 'log in' do
      before do
        login user
        get :index, params: { group_id: group.id }
      end

      it 'assigns @message' do
        expect(assigns(:message)).to be_a_new(Message)#@messageのインスタンスが作られいるか
      end

      it 'assigns @group' do
        expect(assigns(:group)).to eq group
        #@groupのインスタンスが作られているか
      end

      it 'redners index' do
        expect(response).to render_template :index
        #ビューがきちんと反映されているか
      end
    end

    context 'not log in' do
      before do
        get :index, params: { group_id: group.id }
      end

      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
        #loginしていないときにリダイレクトされているか
      end
    end
  end
  describe '#create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }#attributes_forでオブジェクトを生成せずにからのmessageモデルの配列を作成する

    context 'log in' do
      before do
        login user
      end

      context 'can save' do
        subject {
          post :create,
          params: params
        }#expectに渡す引数を定義

        it 'count up message' do
          expect{ subject }.to change(Message, :count).by(1)#レコード一つ増えたことを確認する。
        end

        it 'redirects to group_messages_path' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context 'can not save' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }

        subject {
          post :create,
          params: invalid_params#invalid_paramsで意図的なメッセージ保存の失敗を引き起こす
        }

        it 'does not count up' do
          expect{ subject }.not_to change(Message, :count)
        end

        it 'renders index' do
          subject
          expect(response).to render_template :index
        end
      end
    end

    context 'not log in' do

      it 'redirects to new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end

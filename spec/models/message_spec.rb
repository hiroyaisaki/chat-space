require 'rails_helper'
describe Message, type: :model do
  describe '#create' do
    context 'can save' do
      example "メッセージのみを保存できるか" do
        expect(build(:message, image: nil)).to be_valid
      end

      example "画像のみを保存できるか" do
        expect(build(:message, content: nil)).to be_valid
      end

      example "メッセージと画像を保存できるか" do
        expect(build(:message)).to be_valid
      end
    end

    context 'cannot save' do
      example "メッセージも画像もないと保存できない" do
        message = FactoryBot.build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include("を入力してください")
      end

      example "group_idがないと保存できない" do
        message = FactoryBot.build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      example "user_idがないと保存できない" do
        message = FactoryBot.build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
  end
end
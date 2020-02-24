class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  has_many :messages
  validates :name, presence: true, uniqueness: true

  def show_side_bar__group_list__section__message
    if (side_bar__group_list__section__message = messages.last).present?
      if side_bar__group_list__section__message.content?
        side_bar__group_list__section__message.content
      else
        '画像が投稿されています'
      end
    else
      'まだメッセージはありません。'
    end
  end
end
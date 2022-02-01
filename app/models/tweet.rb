class Tweet < ApplicationRecord
    belongs_to :user
    validates :message, length: { maximum: 140 }
    validates :user, presence: true
end

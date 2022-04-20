class Message < ApplicationRecord
  belongs_to :game
  after_create_commit -> { broadcast_append_to game }
end

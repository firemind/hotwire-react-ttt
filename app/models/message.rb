class Message < ApplicationRecord
  belongs_to :game
  after_create_commit -> { broadcast_append_to game }

  def as_json(params={})
    {
      id: id,
      content: content,
    }
  end
end

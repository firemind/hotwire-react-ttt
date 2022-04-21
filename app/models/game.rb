class Game < ApplicationRecord
  has_many :messages, dependent: :destroy

  after_update_commit -> { broadcast_replace_to self, target: "board", partial: "games/squares", locals: {game: self, bob: 123} }
  before_create do
    self.squares = [nil]*9
  end

  before_update do
    self.finished = won?(squares)
  end

  DELIM=","
  def squares
    self[:squares]&.split(DELIM,9)
  end

  def is_player?(user_id)
    owner == user_id || opponent == user_id
  end

  def turn_count
    squares.reject(&:blank?).count
  end

  def players_turn?(user_id)
    active_player == user_id
  end

  def active_player
    turn_count % 2 == 0 ? owner : opponent
  end

  def squares=(data)
    super(data.join(DELIM))
  end

  WIN_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  def won?(board)
    WIN_COMBINATIONS.each do |combo|
      win_index_1 = combo[0]
      win_index_2 = combo[1]
      win_index_3 = combo[2]
      next if board[win_index_1].blank?

      position_1 = board[win_index_1]
      position_2 = board[win_index_2]
      position_3 = board[win_index_3]

      if position_1 == position_2 && position_2 == position_3
        return combo
      end
    end
    return false
  end

  def message_channel
    "messages-#{id}"
  end
end

class GameChannel < ApplicationCable::Channel
  def subscribed
    game = Game.find(params[:game])
    stream_from game.game_channel

    ActionCable.server.broadcast(game.game_channel, game)
  end

  def unsubscribed; end
end

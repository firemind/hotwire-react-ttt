class MessagesChannel < ApplicationCable::Channel
  def subscribed
    game = Game.find(params[:game])
    stream_from game.message_channel

    ActionCable.server.broadcast(game.message_channel, { messages: game.messages })
  end

  def unsubscribed; end
end

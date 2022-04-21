class MessagesController < ApplicationController
  before_action :set_game, only: %i[ new create ]
  # GET /games/new
  def new
    @message = @game.messages.new
  end

  # POST /games or /games.json
  def create
    @message = @game.messages.create!(message_params)

    ActionCable.server.broadcast(@game.message_channel, { messages: @game.messages })
    respond_to do |format|
      format.html { redirect_to @message.game, notice: "Message was successfully created." }
      format.turbo_stream { }
    end
  end

  private

    def set_game
      @game = Game.find(params[:game_id])
    end

    # Only allow a list of trusted parameters through.
    def message_params
      params.require(:message).permit(:content)
    end
end

class GamesController < ApplicationController
  before_action :set_game, only: %i[ show react edit play join update destroy ]

  # GET /games or /games.json
  def index
    @games = Game.order(created_at: :desc)
    @new_game = Game.new
  end

  # GET /games/1 or /games/1.json
  def show
  end

  def react
    render layout: 'react'
  end

  # GET /games/new
  def new
  end

  # GET /games/1/edit
  def edit
  end

  # POST /games or /games.json
  def create
    @game = Game.new(game_params)
    @game.owner = user_id
    respond_to do |format|
      if @game.save
        format.html { redirect_to game_url(@game), notice: "Game was successfully created." }
        format.json { render :show, status: :created, location: @game }
      else
        format.html { render :index, status: :unprocessable_entity }
        format.json { render json: @game.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /games/1 or /games/1.json
  def update
    respond_to do |format|
      if @game.update(game_params)
        format.html { redirect_to game_url(@game), notice: "Game was successfully updated." }
        format.json { render :show, status: :ok, location: @game }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @game.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /games/1 or /games/1.json
  def destroy
    @game.destroy

    respond_to do |format|
      format.html { redirect_to games_url, notice: "Game was successfully destroyed." }
      format.json { head :no_content }
    end
  end


  def play
    unless @game.players_turn?(user_id)
      raise "Not your turn"
    end
    raise "game finished" if @game.finished
    squares = @game.squares
    squares[params[:field].to_i] = @game.owner == user_id ? "X" : "O"
    @game.squares = squares
    @game.save!
    ActionCable.server.broadcast(@game.game_channel, @game)
    respond_to do |format|
      format.turbo_stream {
        # render turbo_stream: turbo_stream.replace(:board, partial: "squares")
      }
    end
  end

  def join
    raise "game already full" if @game.opponent != nil
    @game.opponent = user_id
    @game.save!
    respond_to do |format|
      format.html { redirect_to @game, notice: "Game was successfully joined", method: :get }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_game
      @game = Game.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def game_params
      params.require(:game).permit(:owner, :opponent)
    end
end

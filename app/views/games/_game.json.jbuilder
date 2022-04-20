json.extract! game, :id, :owner, :opponent, :created_at, :updated_at
json.url game_url(game, format: :json)

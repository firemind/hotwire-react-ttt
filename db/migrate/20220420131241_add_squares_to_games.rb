class AddSquaresToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :squares, :string, null: false
  end
end

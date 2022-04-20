class AddFinishedToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :finished, :boolean, null: false, default: false
  end
end

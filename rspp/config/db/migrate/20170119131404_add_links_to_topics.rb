class AddLinksToTopics < ActiveRecord::Migration[5.0]
  def change
    add_column :topics, :link, :string
  end
end

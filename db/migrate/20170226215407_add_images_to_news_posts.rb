class AddImagesToNewsPosts < ActiveRecord::Migration[5.0]
  def up
    add_attachment :news_posts, :image
  end

  def down
    remove_attachment :news_posts, :image
  end
end

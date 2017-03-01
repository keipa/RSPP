class AddImagesToSlides < ActiveRecord::Migration[5.0]
  def up
    add_attachment :slides, :image
  end

  def down
    remove_attachment :slides, :image
  end
end

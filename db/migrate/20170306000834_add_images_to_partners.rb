class AddImagesToPartners < ActiveRecord::Migration[5.0]
  def up
    add_attachment :partners, :image
  end

  def down
    remove_attachment :partners, :image
  end
end

class AddDescriptionToPartners < ActiveRecord::Migration[5.0]
  def change
    add_column :partners, :description, :text
  end
end

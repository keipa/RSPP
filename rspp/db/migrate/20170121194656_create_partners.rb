class CreatePartners < ActiveRecord::Migration[5.0]
  def change
    create_table :partners do |t|
      t.string :image_url
      t.string :link
      t.boolean :main_partner, default: false
    end
  end
end

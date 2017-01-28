class CreatePartners < ActiveRecord::Migration[5.0]
  def change
    create_table :partners do |t|
      t.string :image_url, null: false
      t.string :link, null: false
    end
  end
end

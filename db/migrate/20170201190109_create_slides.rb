class CreateSlides < ActiveRecord::Migration[5.0]
  def change
    create_table :slides do |t|
      t.text :text
      t.string :image_url
      t.references :slider, foreign_key: true

      t.timestamps
    end
  end
end

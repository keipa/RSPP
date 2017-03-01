class CreateGalleries < ActiveRecord::Migration[5.0]
  def change
    create_table :galleries do |t|
      t.string :name
      t.string :gallery_type
			t.string :smart_id
      t.timestamps
    end
  end
end

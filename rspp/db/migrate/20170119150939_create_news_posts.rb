class CreateNewsPosts < ActiveRecord::Migration[5.0]
  def change
    create_table :news_posts do |t|
      t.string :title, null: false
      t.text :description
      t.text :text, null: false
      t.string :image_url
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end

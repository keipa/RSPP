class CreateNewsPosts < ActiveRecord::Migration[5.0]
  def change
    create_table :news_posts do |t|
      t.string :title
      t.text :description
      t.text :text
      t.string :image_url
      t.references :user, foreign_key: true
    end
  end
end

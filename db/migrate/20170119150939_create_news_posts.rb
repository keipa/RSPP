class CreateNewsPosts < ActiveRecord::Migration[5.0]
  def change
    create_table :news_posts do |t|
      t.text :title
      t.text :description
      t.text :text
      t.text :post_type
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end

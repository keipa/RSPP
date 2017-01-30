class AddTypeToNewsPosts < ActiveRecord::Migration[5.0]
  def change
    add_column :news_posts, :post_type, :string, null: false
  end
end

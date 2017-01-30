class CreateTopics < ActiveRecord::Migration[5.0]
  def change
    create_table :topics do |t|
      t.string :text, null: false
      t.string :smart_id
      t.text :description, null: false, default: ''
      t.references :topic
      t.references :user, foreign_key: true

      t.timestamps null: false
    end
  end
end

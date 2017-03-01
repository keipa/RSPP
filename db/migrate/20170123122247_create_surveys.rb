class CreateSurveys < ActiveRecord::Migration[5.0]
  def change
    create_table :surveys do |t|
      t.string :title, null: false
      t.text :content
      t.boolean :active
      t.text :users
      t.integer :count_votes, default: 0

      t.timestamps
    end
  end
end

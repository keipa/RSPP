class CreateSurveys < ActiveRecord::Migration[5.0]
  def change
    create_table :surveys do |t|
      t.string :title
      t.text :content
      t.boolean :closed
      t.text :users
      t.integer :count_votes

      t.timestamps
    end
  end
end

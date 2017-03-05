class CreateSurveys < ActiveRecord::Migration[5.0]
  def change
    create_table :surveys do |t|
      t.string :question, null: false
      t.boolean :active

      t.timestamps
    end
  end
end

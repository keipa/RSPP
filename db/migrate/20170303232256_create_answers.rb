class CreateAnswers < ActiveRecord::Migration[5.0]
  def change
    create_table :answers do |t|
      t.text :text
      t.references :survey

      t.timestamps
    end
  end
end

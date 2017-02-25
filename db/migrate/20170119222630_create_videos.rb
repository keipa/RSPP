class CreateVideos < ActiveRecord::Migration[5.0]
  def change
    create_table :videos do |t|
      t.string :youtube_link
      t.string :iframe_link
      t.string :video_id
      t.string :title
      t.text :description
      t.string :published_at
      t.string :video_type
      t.references :album, foreign_key: true

      t.timestamps
    end
  end
end

class AddSlidesToSliders < ActiveRecord::Migration[5.0]
  def change
    add_reference :sliders, :slides, foreign_key: true
  end
end

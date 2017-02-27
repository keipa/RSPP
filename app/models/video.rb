class Video < ApplicationRecord
  YOUTUBE_VIDEO_REGEX = /(https?):\/\/(www.)?youtube.com\/watch\?v=(.{8,14})/

  paginates_per 5

  belongs_to :album

  default_scope -> { order('created_at DESC') }

  validates_presence_of :video_type, :youtube_link
  validates_format_of :youtube_link, with: YOUTUBE_VIDEO_REGEX

  before_save :create_iframe_link

  acts_as_commentable

  def create_iframe_link
    video_hash = youtube_link.match(YOUTUBE_VIDEO_REGEX)[2]
    self.iframe_link = "https://www.youtube.com/embed/#{video_hash}"
  end
end

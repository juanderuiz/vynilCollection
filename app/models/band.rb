class Band < ActiveRecord::Base
  belongs_to :user	
  has_many :albums

  validates :name, presence: true
  #validates :url, presence: true
end

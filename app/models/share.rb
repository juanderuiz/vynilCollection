class Share < ActiveRecord::Base
  belongs_to :from_user
  belongs_to :to_user

  validates_format_of :to_email, 
            :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
end

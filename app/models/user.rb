require 'digest'

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  def gravatar_path(size=21)
    "http://www.gravatar.com/avatar/#{Digest::MD5.hexdigest(self.email)}?d=identicon&s=#{size}"
  end
end

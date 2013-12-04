class UserPreference < ActiveRecord::Base
  def self.get_value(user, key, default_value = nil)
    self.find_by(user_id: user.id, key: key).value rescue default_value
  end
end
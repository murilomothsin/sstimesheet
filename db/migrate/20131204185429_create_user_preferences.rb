class CreateUserPreferences < ActiveRecord::Migration
  def change
    create_table :user_preferences do |t|
      t.references :user
      t.string     :key
      t.string     :value
    end
  end
end

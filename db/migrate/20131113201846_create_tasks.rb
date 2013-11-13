class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      	t.references :user
      	t.integer    :year
      	t.integer    :month
      	t.integer    :day
      	t.string     :description
    end
  end
end

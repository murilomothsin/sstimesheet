json.month do
  json.month @month.month 
  json.year @month.year
  json.name @month.name
  json.days @month.days do |day|
    json.day day.day
    json.day_type day.day_type
    json.tasks day.tasks, :id, :description
  end
end

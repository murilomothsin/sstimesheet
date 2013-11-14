class TimesheetDay

  attr_reader :day, :tasks

  def initialize(year, month, day, tasks)
    @day = day
    @month = month
    @year = year
    @tasks = tasks
  end

  def to_date
    Date.new(@year, @month, @day)
  end

  def day_type
    case true
    when weekend?
      'weekend'
    when today?
      'today'
    else
      'weekday'
    end
  end

  def weekend?
    [0, 6].include? to_date.wday
  end

  def today?
    Time.now.to_date == to_date
  end


end

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

  def weekend?
    [0, 6].include? to_date.wday
  end

end

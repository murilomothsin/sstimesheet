class TimesheetMonth
  attr_reader :month

  def initialize(month, year, user)
    @month = month
    @year = year || Time.now.year
    @user = user
    @user_tasks = Task.where(user_id: user.id, year: @year, month: @month)
    @days = build_days
  end

  def days
    @days
  end

  def name
    Date.new(@year, @month, 1).strftime("%B")
  end

  def next
    Hashie::Mash.new({
      month: @month.next <= 12 ? @month.next : 1,
      year: @month.next <= 12 ? @year : @year.next
    })
  end

  def pred
    Hashie::Mash.new({
      month: @month.pred >= 1 ? @month.pred : 12,
      year: @month.pred >= 1 ? @year : @year.pred
    })
  end

  private

  def build_days
    month_total_days = Time.days_in_month(@month, @year)
    (1..month_total_days).map do |day_number|
      day_tasks = @user_tasks.select { |task| task.day == day_number }
      TimesheetDay.new(@year, @month, day_number, day_tasks)
    end
  end

end

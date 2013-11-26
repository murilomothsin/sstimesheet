class TimesheetController < ApplicationController

  def index
    redirect_to current_month_path if user_signed_in?
  end

  def month
    year = params[:year] || Time.now.year
    month = params[:month] || Time.now.month
    @month = TimesheetMonth.new(month.to_i, year.to_i, current_user)
  end

end

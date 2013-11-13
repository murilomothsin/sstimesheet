class WelcomeController < ApplicationController

  def month
    @month = TimesheetMonth.new(params[:month].to_i, params[:year].to_i, current_user)
  end

end

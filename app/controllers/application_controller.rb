class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :user_stylesheet

  def user_stylesheet
    if user_signed_in?
      UserPreference.get_value(current_user, :stylesheet, "//netdna.bootstrapcdn.com/bootswatch/3.0.2/flatly/bootstrap.min.css")
    else
      "//netdna.bootstrapcdn.com/bootswatch/3.0.2/flatly/bootstrap.min.css"
    end
  end
end

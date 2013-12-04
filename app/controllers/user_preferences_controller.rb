class UserPreferencesController < ApplicationController

  # PUT /user_preferences/:key
  def set
    @user_preference = UserPreference.find_by(user_id: current_user.id, key: params[:key])

    if create_or_update
      head :no_content
    else
      render json: @user_preference.errors, status: :unprocessable_entity
    end
  end

  private

  def create_or_update
    if @user_preference #se ta criando ou editando
      @user_preference.update(user_preference_params)
    else
      @user_preference = UserPreference.new(user_preference_params)
      @user_preference.user_id = current_user.id
      @user_preference.key = params[:key]
      @user_preference.save
    end
  end

  def user_preference_params
    params.require(:user_preference).permit(:value)
  end
end
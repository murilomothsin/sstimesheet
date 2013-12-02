Sstimesheet::Application.routes.draw do
  
  devise_for :users
  root 'timesheet#index'
  get 'month/:year/:month', to: 'timesheet#month', as: 'month'
  get 'month', to: 'timesheet#month', as: 'current_month'

  resources :tasks, only: [:create, :update, :destroy]
end

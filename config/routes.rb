Sstimesheet::Application.routes.draw do
  
  devise_for :users
  root 'welcome#index'
  get 'month/:year/:month', to: 'welcome#month', as: 'month'
end

Shareup::Application.routes.draw do
  resources :shares

  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :vinilos, only: [:index]
      resources :bands, only: [:index, :show, :create, :update, :destroy] do
        resources :albums, only: [:index, :show, :create, :update, :destroy]
      end
    end
  end

  devise_for :users,
    :controllers => {
      :omniauth_callbacks => "users/omniauth_callbacks"
    }

  devise_scope :user do
    get '/current_user' => 'users/sessions#show_current_user', as: 'show_current_user'
    post '/api/check/is_user' => 'users/users#is_user', as: 'is_user'
  end

  get '/dashboard' => 'welcome#dashboard'
  root to: 'welcome#index'
end

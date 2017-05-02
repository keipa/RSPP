Rails.application.routes.draw do
  mount Ckeditor::Engine => '/ckeditor'
  namespace :admin do
    root 'news_posts#index'
    resources :news_posts, only: [:index, :new, :create, :edit, :update, :destroy]
    resources :partners, only:   [:index, :create, :edit, :update, :destroy]
		resources :topics, only:     [:index, :new, :create, :edit, :update, :destroy]

    resources :feedbacks, only:  [:index, :show, :destroy]

    resources :surveys
    resources :answers, only: [:destroy]

    resources :users
    resources :sliders
    resources :slides

    get 'news_posts/:post_type', to: 'news_posts#index'
  end

  devise_for :users

  root 'home#index'

  resources :galleries, only: [:show] do
    collection do
      get '/:gallery_type', to: 'galleries#show', as: 'type'
    end

    resources :albums, only:   [:index, :show, :new, :create, :edit, :update, :destroy] do
      resources :pictures
      resources :videos, only: [:new, :create, :edit, :update, :destroy]
    end
  end

  devise_scope :user do
    get '/users', to: 'devise/registrations#new'
  end


  resources :topics, only: [:show]


  resources :news_posts , only: [:show, :index]
  resources :videos do
    resources :comments, module: :videos
  end
  resources :surveys, only: [:show, :create, :destroy, :update] do
    resources :comments, module: :surveys
    member do
      post :vote
    end
  end

	get 'home/join_rspp', to: 'home#join_rspp', as: 'join_rspp'
	get 'home/bill', to: 'home#bill', as: 'bill'
	get 'home/statement', to: 'home#statement', as: 'statement'
	get 'home/registration_card', to: 'home#registration_card', as: 'registration_card'
  post 'home/get_pdf', to: 'home#get_pdf', as: 'get_pdf'
  post 'home/send_email_with_pdf', to: 'home#send_email_with_pdf', as: 'send_email_with_pdf'

  resources :feedbacks, only: [:create]
end

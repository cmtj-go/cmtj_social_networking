class ApplicationController < ActionController::API
	include DeviseTokenAuth::Concerns::SetUserByToken
	include ActionController::RequestForgeryProtection
	protect_from_forgery with: :exception, unless: -> { request.format.json? }

	before_action :configure_permitted_parameters, if: :devise_controller?

	protected

	def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:full_name, :user_name, {following_ids: []}, :bio, :cover_img, :profile_img])
  end
end

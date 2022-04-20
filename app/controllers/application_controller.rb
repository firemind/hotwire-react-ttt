class ApplicationController < ActionController::Base

  def user_id
    session[:user_id] ||= SecureRandom.uuid
  end
end

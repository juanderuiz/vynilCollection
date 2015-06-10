class Users::UsersController < Devise::SessionsController
  respond_to :json

  def index
    users = User.all.order('id ASC')
    render json: users, status: 200
  end

  def is_user
    reject_if_not_authorized_request!
    render status: 200,
        json: {
          success: !User.find_by_name(params[:name]).blank?
        }
  end
  private

  def reject_if_not_authorized_request!
    warden.authenticate!(
      scope: resource_name, 
      recall: "#{controller_path}#failure")
  end
end
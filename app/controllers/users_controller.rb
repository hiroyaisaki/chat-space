class UsersController < ApplicationController
  protect_from_forgery except: :search
  def edit
  
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  def search
    @products = Product.where('name LIKE(?)', "%#{params[:keyword]}%")
    redirect_to 'index'
  end

  private 

  def user_params
    params.require(:user).permit(:name, :email)
  end

end
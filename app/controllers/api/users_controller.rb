module Api
    class UsersController < ApplicationController
        def create
            @user = User.create(user_params)

            if @user
                render 'api/users/create.jbuilder'
                
            else
                render json: {
                    success: false
                }
            end
        end

        private

            def user_params
                params.require(:user).permit(:password, :username, :email)
            end
    end
end
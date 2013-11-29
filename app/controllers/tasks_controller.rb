class TasksController < ApplicationController

  # POST /tasks
  def create
    @task = Task.new(task_params)
    @task.user_id = current_user.id

    if @task.save
      render json: @task, status: :created, location: @task
    else
      render json: @task.errors, status: :unprocessed_entity
    end
  end

  # PUT /tasks
  def update
    head :no_content
  end

  private

  def task_params
    params.require(:task).permit(:year, :month, :day, :description)
  end

end

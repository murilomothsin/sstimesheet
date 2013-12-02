class TasksController < ApplicationController

  before_action :set_task, only: [:update, :destroy]

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

  # PUT /tasks/:id
  def update
    if @task.update(task_params)
      head :no_content
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/:id
  def destroy
    @task.destroy
    head :no_content
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:year, :month, :day, :description)
  end

end

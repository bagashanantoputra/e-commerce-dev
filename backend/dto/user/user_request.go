package usersdto

type CreateUserRequest struct {
	FirstName string `json:"first_name" form:"first_name" validate:"required"`
	LastName  string `json:"last_name" form:"last_name" validate:"required"`
	Email     string `json:"email" form:"email" validate:"required"`
	Password  string `json:"password" form:"password" validate:"required"`
}

type UpdateUserRequest struct {
	IsAdmin   bool   `json:"is_admin"`
	FirstName string `json:"first_name" form:"first_name"`
	LastName  string `json:"last_name" form:"last_name"`
	Email     string `json:"email" form:"email"`
	Password  string `json:"password" form:"password"`
}

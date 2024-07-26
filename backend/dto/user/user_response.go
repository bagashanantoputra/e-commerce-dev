package usersdto

type UserResponse struct {
	ID        int    `json:"id"`
	FirstName string `json:"first_name" gorm:"type varchar(255)"`
	LastName  string `json:"last_name" gorm:"type varchar(255)"`
	Email     string `json:"email"`
}

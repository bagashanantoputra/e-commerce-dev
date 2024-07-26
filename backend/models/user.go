package models

import "time"

type User struct {
	ID          int                       `json:"id" gorm:"primary_key:auto_increment"`
	IsAdmin     bool                      `json:"is_admin" gorm:"type: bool"`
	FirstName   string                    `json:"first_name" gorm:"type: varchar(255)"`
	LastName    string                    `json:"last_name" gorm:"type: varchar(255)"`
	Email       string                    `json:"email" gorm:"type: varchar(255)"`
	Password    string                    `json:"-" gorm:"type: varchar(255)"`
	Profile     ProfileResponse           `json:"profile"`
	Cart        []CartUSerResponse        `json:"cart"`
	Transaction []TransactionUserResponse `json:"transaction"`
	Products    []Product                 `json:"products" gorm:"foreignKey:UserID"`
	CreatedAt   time.Time                 `json:"created_at"`
	UpdatedAt   time.Time                 `json:"updated_at"`
}

type UsersProfileResponse struct {
	ID       int    `json:"id"`
	IsAdmin  bool   `json:"is_admin"`
	FistName string `json:"first_name"`
	LastName string `json:"last_name"`
}

type UsersCartResponse struct {
	ID       int    `json:"id"`
	IsAdmin  bool   `json:"is_admin"`
	FistName string `json:"first_name"`
	LastName string `json:"last_name"`
}

type UserTransactionResponse struct {
	ID        int    `json:"id" gorm:"primary_key:auto_increment"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email" gorm:"type: varchar(255)"`
}

func (UsersProfileResponse) TableName() string {
	return "users"
}

func (UsersCartResponse) TableName() string {
	return "users"
}

func (UserTransactionResponse) TableName() string {
	return "users"
}

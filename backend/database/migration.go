package database

import (
	"fmt"
	"ecommerce/models"
	"ecommerce/pkg/postgres"
)

func RunMigration() {
	err := postgres.DB.AutoMigrate(
		&models.User{},
		&models.Profile{},
		&models.Product{},
		&models.Cart{},
		&models.Transaction{},
		&models.ProductTransaction{},
	)

	if err != nil {
		fmt.Println(err)
		panic("Migration Failed")
	}

	fmt.Println("Migration Success")
}

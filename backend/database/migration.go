package database

import (
	"ecommerce/models"
	"ecommerce/pkg/postgres"
	"fmt"
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

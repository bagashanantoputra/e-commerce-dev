package routes

import (
	"ecommerce/handlers"
	"ecommerce/pkg/middleware"
	"ecommerce/pkg/postgres"
	"ecommerce/repositories"

	"github.com/labstack/echo/v4"
)

func UserRoutes(e *echo.Group) {
	userRepository := repositories.RepositoryUser(postgres.DB)
	profileRepository := repositories.RepositoryProfile(postgres.DB)
	cartRepository := repositories.RepositoryCart(postgres.DB)
	transactionRepository := repositories.RepositoryTransaction(postgres.DB)
	h := handlers.HandlerUser(userRepository, profileRepository, cartRepository, transactionRepository)

	e.GET("/users", middleware.Auth(h.FindUsers))
	e.GET("/user/:id", middleware.Auth(h.GetUser))
	e.PATCH("/user", middleware.Auth(h.UpdateUser))
	e.DELETE("/user", middleware.Auth(h.DeleteUser))
}

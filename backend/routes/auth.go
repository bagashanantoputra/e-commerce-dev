package routes

import (
	"ecommerce/handlers"
	"ecommerce/pkg/middleware"
	"ecommerce/pkg/postgres"
	"ecommerce/repositories"

	"github.com/labstack/echo/v4"
)

func AuthRoutes(e *echo.Group) {
	authRepository := repositories.RepositoryAuth(postgres.DB)
	h := handlers.HandlerAuth(authRepository)

	e.POST("/register", h.Register)
	e.POST("/login", h.Login)
	e.GET("/check-auth", middleware.Auth(h.CheckAuth))
}

package routes

import (
	"ecommerce/handlers"
	"ecommerce/pkg/middleware"
	"ecommerce/pkg/postgres"
	"ecommerce/repositories"

	"github.com/labstack/echo/v4"
)

func ProfileRoutes(e *echo.Group) {
	profileRepository := repositories.RepositoryProfile(postgres.DB)
	h := handlers.HandlerProfile(profileRepository)

	e.GET("/profile/:id", middleware.Auth(h.GetProfile))
	e.POST("/profile", middleware.Auth(middleware.UploadFile(h.CreateProfile)))
	e.PATCH("/profile", middleware.Auth(middleware.UploadFile(h.UpdateProfile)))
	e.DELETE("/profile", middleware.Auth(h.DeleteProfile))
}

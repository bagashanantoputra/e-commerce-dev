package routes

import (
	"ecommerce/handlers"
	"ecommerce/pkg/middleware"
	"ecommerce/pkg/postgres"
	"ecommerce/repositories"

	"github.com/labstack/echo/v4"
)

func TransactionRoutes(e *echo.Group) {
	transactionRepository := repositories.RepositoryTransaction(postgres.DB)
	userRepository := repositories.RepositoryUser(postgres.DB)
	productRepository := repositories.RepositoryProduct(postgres.DB)
	cartRepository := repositories.RepositoryCart(postgres.DB)
	h := handlers.HandlerTransaction(transactionRepository, userRepository, productRepository, cartRepository)

	e.GET("/transactions", middleware.Auth(h.FindTransactions))
	e.GET("/transaction/:id", middleware.Auth(h.GetTransaction))
	e.POST("/transaction", middleware.Auth(h.CreateTransaction))
	e.DELETE("/transaction/:id", middleware.Auth(h.DeleteTransaction))
}

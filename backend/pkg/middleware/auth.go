package middleware

import (
	dto "ecommerce/dto/result"
	jwtToken "ecommerce/pkg/jwt"
	"log"
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
)

type Result struct {
	Status  int         `json:"status"`
	Data    interface{} `json:"data"`
	Message string      `json:"message"`
}

func Auth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		log.Println("Auth middleware: Starting authentication process")

		token := c.Request().Header.Get("Authorization")
		log.Println("Auth middleware: Authorization header received:", token)

		if token == "" {
			log.Println("Auth middleware: No token provided")
			return c.JSON(http.StatusUnauthorized, dto.ErrorResult{Status: http.StatusBadRequest, Message: "unauthorized"})
		}

		parts := strings.Split(token, " ")
		if len(parts) != 2 {
			log.Println("Auth middleware: Invalid token format")
			return c.JSON(http.StatusUnauthorized, Result{Status: http.StatusUnauthorized, Message: "unauthorized"})
		}
		token = parts[1]
		log.Println("Auth middleware: Extracted token:", token)

		claims, err := jwtToken.DecodeToken(token)
		if err != nil {
			log.Println("Auth middleware: Failed to decode token:", err)
			return c.JSON(http.StatusUnauthorized, Result{Status: http.StatusUnauthorized, Message: "unauthorized"})
		}
		log.Println("Auth middleware: Token decoded successfully, claims:", claims)

		c.Set("userLogin", claims)
		log.Println("Auth middleware: User claims set in context")

		log.Println("Auth middleware: Authentication process completed successfully")
		return next(c)
	}
}

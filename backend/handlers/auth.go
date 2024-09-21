package handlers

import (
	authdto "ecommerce/dto/auth"
	dto "ecommerce/dto/result"
	"log"
	"net/http"
	"time"

	"ecommerce/models"
	"ecommerce/pkg/bcrypt"
	jwtToken "ecommerce/pkg/jwt"
	"ecommerce/repositories"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerAuth struct {
	AuthRepository repositories.AuthRepository
}

func HandlerAuth(AuthRepository repositories.AuthRepository) *handlerAuth {
	return &handlerAuth{AuthRepository}
}

func (h *handlerAuth) Register(c echo.Context) error {
	log.Println("Start handling registration")

	// Bind request data
	request := new(authdto.AuthRequest)
	if err := c.Bind(request); err != nil {
		log.Println("Failed to bind request:", err)
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	log.Println("Request binding successful:", request)

	// Validate the request data
	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		log.Println("Validation failed:", err)
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	log.Println("Validation successful")

	// Check if the user already exists by email
	existingUser, err := h.AuthRepository.Login(request.Email) // Assuming Login method finds user by email
	if err == nil && existingUser.Email != "" {
		log.Println("User already exists with email:", request.Email)
		return c.JSON(http.StatusConflict, dto.ErrorResult{Status: http.StatusConflict, Message: "User already exists"})
	}

	// Proceed with password hashing
	password, err := bcrypt.HashingPassword(request.Password)
	if err != nil {
		log.Println("Password hashing failed:", err)
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	log.Println("Password hashing successful")

	currentTime := time.Now()

	// Create new user
	user := models.User{
		IsAdmin:   request.IsAdmin,
		FirstName: request.FirstName,
		LastName:  request.LastName,
		Email:     request.Email,
		Password:  password,
		CreatedAt: currentTime,
		UpdatedAt: currentTime,
	}

	log.Println("User created:", user)

	// Register the new user
	data, err := h.AuthRepository.Register(user)
	if err != nil {
		log.Println("User registration failed:", err)
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}

	log.Println("User registration successful:", data)

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: http.StatusOK, Message: "Your registration is successful", Data: data})
}

func (h *handlerAuth) Login(c echo.Context) error {
	log.Println("Start handling login")

	request := new(authdto.LoginRequest)
	if err := c.Bind(request); err != nil {
		log.Println("Failed to bind request:", err)
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	log.Println("Request binding successful:", request)

	user, err := h.AuthRepository.Login(request.Email)
	if err != nil {
		log.Println("Login failed:", err)
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	log.Println("User found:", user)

	isValid := bcrypt.CheckPasswordHash(request.Password, user.Password)
	if !isValid {
		log.Println("Password check failed: wrong email or password")
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: http.StatusBadRequest, Message: "wrong email or password"})
	}

	log.Println("Password check successful")

	claims := jwt.MapClaims{}
	claims["id"] = user.ID
	claims["is_admin"] = user.IsAdmin
	claims["exp"] = time.Now().Add(time.Minute * 2).Unix()

	token, err := jwtToken.GenerateToken(&claims)
	if err != nil {
		log.Println("Token generation failed:", err)
		return echo.NewHTTPError(http.StatusUnauthorized)
	}

	log.Println("Token generation successful")

	loginResponse := authdto.LoginResponse{
		IsAdmin: user.IsAdmin,
		Email:   user.Email,
		Token:   token,
	}

	log.Println("Login response prepared:", loginResponse)

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: http.StatusOK, Message: "You have successfully logged in", Data: loginResponse})
}

func (h *handlerAuth) CheckAuth(c echo.Context) error {
	log.Println("Start handling CheckAuth")

	userLogin := c.Get("userLogin")
	if userLogin == nil {
		log.Println("User login not found in context")
		return c.JSON(http.StatusUnauthorized, dto.ErrorResult{Status: http.StatusUnauthorized, Message: "User not logged in"})
	}

	log.Println("User login found:", userLogin)

	claims, ok := userLogin.(jwt.MapClaims)
	if !ok {
		log.Println("Failed to parse user claims from context")
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: http.StatusBadRequest, Message: "Invalid token"})
	}

	// Check if token is expired
	exp, ok := claims["exp"].(float64)
	if !ok || time.Unix(int64(exp), 0).Before(time.Now()) {
		log.Println("Token has expired")
		return c.JSON(http.StatusUnauthorized, dto.ErrorResult{Status: http.StatusUnauthorized, Message: "Token has expired"})
	}

	userId, ok := userLogin.(jwt.MapClaims)["id"].(float64)
	if !ok {
		log.Println("Failed to parse user ID from token")
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: http.StatusBadRequest, Message: "Invalid token"})
	}

	log.Println("User ID parsed from token:", userId)

	user, err := h.AuthRepository.CheckAuth(int(userId))
	if err != nil {
		log.Println("CheckAuth failed:", err)
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}

	log.Println("CheckAuth successful, user found:", user)

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: http.StatusOK, Data: user})
}

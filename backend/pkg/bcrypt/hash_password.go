package bcrypt

import (
	"log"

	"golang.org/x/crypto/bcrypt"
)

func HashingPassword(password string) (string, error) {
	log.Println("Starting password hashing process")
	hashedByte, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	if err != nil {
		log.Printf("Error hashing password: %v\n", err)
		return "", err
	}
	hashedPassword := string(hashedByte)
	log.Printf("Password hashed successfully: %s\n", hashedPassword)
	return hashedPassword, nil
}

func CheckPasswordHash(password, hashedPassword string) bool {
	log.Println("Starting password hash comparison process")
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	if err != nil {
		log.Printf("Password does not match: %v\n", err)
		return false
	}
	log.Println("Password matches successfully")
	return true
}

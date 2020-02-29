package handlers

import (
	"github.com/Zero/Servers/gateway/models/users"
	"time"
)

// SessionState stores session states
//TODO: define a session state struct for this web server
//see the assignment description for the fields you should include
//remember that other packages can only see exported fields!
type SessionState struct {
	Time    time.Time
	Address string
	Users   *users.User
}
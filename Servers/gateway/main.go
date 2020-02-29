package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/streadway/amqp"

	"github.com/gorilla/mux"

	_ "github.com/go-sql-driver/mysql"

	// "github.com/cchen97/assignments-cchen97/servers/gateway/indexes"

	"github.com/Zero/Servers/gateway/handlers"

	"github.com/Zero/Servers/gateway/models/users"

	"github.com/Zero/Servers/gateway/sessions"

	"github.com/go-redis/redis"
)

//main is the main entry point for the server
func main() {
	/* TODO: add code to do the following
	- Read the ADDR environment variable to get the address
	  the server should listen on. If empty, default to ":80"
	- Create a new mux for the web server.
	- Tell the mux to call your handlers.SummaryHandler function
	  when the "/v1/summary" URL path is requested.
	- Start a web server listening on the address you read from
	  the environment variable, using the mux you created as
	  the root handler. Use log.Fatal() to report any errors
	  that occur when trying to start the web server.
	*/
	addr := os.Getenv("ADDR")
	if len(addr) == 0 {
		addr = ":443"
	}
	tlsKeyPath := os.Getenv("TLSKEY")
	tlsCertPath := os.Getenv("TLSCERT")
	sessionKey := os.Getenv("SESSIONKEY")
	redisAddr := os.Getenv("REDISADDR")
	dsn := os.Getenv("DSN")
	// messageAddrs := os.Getenv("MESSAGESADDR")
	// summaryAddrs := os.Getenv("SUMMARYADDR")
	mqAddrs := os.Getenv("MQADDR")
	mqName := os.Getenv("MQNAME")

	if len(tlsCertPath) == 0 || len(tlsKeyPath) == 0 {
		fmt.Fprintf(os.Stderr, "error: missing  TLSCERT or TLSKEY")
		os.Exit(1)
	}

	client := redis.NewClient(&redis.Options{
		Addr:     redisAddr, // use default Addr
		Password: "",        // no password set
		DB:       0,         // use default DB
	})
	redisStore := sessions.NewRedisStore(client, time.Hour)
	// trie := indexes.NewTrie()
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		fmt.Printf("error opening database: %v\n", err)
		os.Exit(1)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		fmt.Printf("error pinging database: %v\n", err)
	} else {
		fmt.Printf("successfully connected!\n")
	}

	mySQLStore := users.NewSQLStore(db)

	// trie, err2 := mySQLStore.Load()
	// if err2 != nil {
	// 	fmt.Printf("error loading user accounts to trie")
	// }
	// mqURL := "amqp://" + mqAddrs
	// conn, err := amqp.Dial(mqURL)
	// if err != nil {
	// 	fmt.Printf("Failed to connect to RabbitMQ: %v", err)
	// } else {
	// 	fmt.Print("Successfully connectf to RabbitMQ")
	// }
	// defer conn.Close()

	// ch, err := conn.Channel()
	// if err != nil {
	// 	fmt.Printf("Failed to open a channel: %v", err)
	// }
	// defer ch.Close()

	// q, err := ch.QueueDeclare(mqName,
	// 	true,
	// 	false,
	// 	false,
	// 	false,
	// 	nil,
	// )
	// if err != nil {
	// 	fmt.Printf("error declaring queue: %v", err)
	// }

	// msgs, err := ch.Consume(q.Name,
	// 	"",
	// 	false,
	// 	false,
	// 	false,
	// 	false,
	// 	nil,
	// )
	// if err != nil {
	// 	fmt.Printf("error consuming messages: %v", err)
	// }

	// notifier := handlers.NewNotifier()

	// hctx := handlers.NewHandlerContext(sessionKey, redisStore, mySQLStore, trie, notifier)
	hctx := handlers.NewHandlerContext(sessionKey, redisStore, mySQLStore)
	// go hctx.Notifier.ReceiveMsgs(msgs)
	
	mux := mux.NewRouter()
	mux.HandleFunc("/v1/users", hctx.UserHandler)
	mux.HandleFunc("/v1/users/{id}", hctx.SpecificUserHandler)
	mux.HandleFunc("/v1/sessions", hctx.SessionsHandler)
	mux.HandleFunc("/v1/sessions/{id}", hctx.SpecificSessionHandler)

	// mux.Handle("/v1/summary", hctx.NewServiceProxy(summaryAddrs))

	// messageService := hctx.NewServiceProxy(messageAddrs)
	// mux.Handle("/v1/channels", messageService)
	// mux.Handle("/v1/channels/{channelID}", messageService)
	// mux.Handle("/v1/channels/{channelID}/members", messageService)
	// mux.Handle("/v1/messages/{messageID}", messageService)

	// mux.Handle("/v1/ws", handlers.NewWebSocketsHandler(hctx))

	wrappedMux := handlers.NewResponseHeader(mux)
	log.Printf("server is listening at http://%s", addr)

	log.Fatal(http.ListenAndServeTLS(addr, tlsCertPath, tlsKeyPath, wrappedMux))
}
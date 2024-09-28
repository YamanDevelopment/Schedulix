package main

import (
	//"regexp"
	//"io"
	"fmt"
	"os"
	"time"

	"github.com/gocarina/gocsv"
)

// from go by example
func check(e error) {
	if e != nil {
		panic(e)
	}
}

// should probably change the name of this lol
type roomTime struct {
	day  string
	room string

	start time.Time
	end   time.Time
}

type Room struct {
	Campus              string
	Building            string
	Room                string
	RoomType            string
	time_occupied       map[string][]roomTime
	StudentCapacity     int
	ZoomEnabled         bool
	VideoConf           bool
	Mediasite           bool
	AudienceMicrophones bool
	AudienceCamera      bool
}

func main() {
	// file imports
	//t, err := os.ReadFile("./OrganizedFAURoomInfoFall2024.txt")
	p, err := os.OpenFile("./data.csv", os.O_RDWR|os.O_CREATE, os.ModePerm)

	if err != nil {
		panic(err)
	}
	defer p.Close()
	fmt.Println("ur mom")
	// reads csv file into slice of rooms
	data := []*Room{}

	if err := gocsv.UnmarshalFile(p, &data); err != nil { // Load clients from file
		panic(err)
	}
	//+
	// generate room structs
	//mp := make([]Room)

}

func strtoTime(a string) (time.Time, error) {
	// Define the layout that matches the time string format
	layout := "03:04 PM"

	// Parse the time string into a Time object
	t, err := time.Parse(layout, a)
	if err != nil {
		fmt.Println("Error parsing time:", err)
		return time.Time{}, err
	}
	return t, nil
}

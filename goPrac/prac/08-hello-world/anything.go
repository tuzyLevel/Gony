package main

import (
	"fmt"
)

var y = 42

func main() {
	n, _:= fmt.Println("Hello my dear friends")
	fmt.Println(n)
	

}

func foo(x ...interface{}) {
	fmt.Println("foo func called")
	
}

func bar() {
	fmt.Print("bar func called")
}

// control flow:
// sequence :
// loop; iterative
// conditional

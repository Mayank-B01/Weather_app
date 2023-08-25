<?php
	// Setting variables
	$hostname = "localhost";
	$username = "root";
	$password = "";
	$dbname = "weather_data";

	// Connection
	$connect = mysqli_connect($hostname, $username, $password, $dbname);
// If connection failed
if ($connect->connect_error) {
		die("Connection failed: " . $connect->connect_error);
	}
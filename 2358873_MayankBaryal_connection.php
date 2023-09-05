<?php
	// Setting variables
	$hostname = "sql208.infinityfree.com";
	$username = "if0_34822372";
	$password = "p79gRZn145";
	$dbname = "if0_34822372_Mayank";

	// Connection
	$connect = mysqli_connect($hostname, $username, $password, $dbname);
// If connection failed
if ($connect->connect_error) {
		die("Connection failed: " . $connect->connect_error);
	}
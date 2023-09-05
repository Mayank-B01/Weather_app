<?php
	// Include connection
	include '2358873_MayankBaryal_connection.php';
	// Get data from POST
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
	 
			// City name from url
	        $jsonData = file_get_contents("php://input");
	        if ($jsonData === false) {
	            throw new Exception("Error reading input data");
	        }

	        $data = json_decode($jsonData, true);
	        if ($data === null) {
	            throw new Exception("Error decoding JSON data");
	        }
	        $city = $data['city'];
			// SQL query
			$query = "SELECT 
					MAX(id) as id, city, country, temperature, weather_condition, humidity, pressure, wind, date_accessed
				FROM 
				weather_info
				WHERE 
					city = '$city' AND date_accessed >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
				GROUP BY 
					DATE(date_accessed)
				ORDER BY 
					date_accessed DESC;";
			// Query exceution
			$sql = mysqli_query($connect, $query);
			$rows = array();
			// Collecting rows
			while ($row = mysqli_fetch_assoc($sql)) {
			    $rows[] = $row;
			}
			// Send data back
			header('Content-Type: application/json');
			echo json_encode($rows);
	        $connect->close();
	    } 
	else{
		http_response_code(405);
	    echo json_encode(['success' => false, 'error' => 'Only POST requests are allowed']);
	}
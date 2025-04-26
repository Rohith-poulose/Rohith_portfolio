<?php
$servername = "localhost";      // Usually localhost
$username = "root";              // Default username for XAMPP/MAMP
$password = "";                  // Password is usually blank unless you set it
$dbname = "skills";              // YOUR database name (you said it's 'skills')

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch data from the 'skills' table
$sql = "SELECT * FROM skills";   // Table name is also 'skills'
$result = $conn->query($sql);

$skills = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $skills[] = $row;
    }
}

// Return data as JSON
echo json_encode($skills);

$conn->close();
?>

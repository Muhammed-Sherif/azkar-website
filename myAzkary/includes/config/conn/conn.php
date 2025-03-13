<?php
class db {
    private $dns  = "Localhost" ;
    private $dbname = "myAzkary" ;
    private $username = "root" ; 
    private $password = "" ;
    // public $conn ;
    public function connect() {
        try {
            $conn = new PDO("mysql:dbname=".$this->dbname.";host=".$this->dns,$this->username,$this->password);
            $conn->setAttribute(PDO::ATTR_ERRMODE , PDO::ERRMODE_EXCEPTION) ;
        } catch (PDOException $e) {
            echo "connection Failed".$e->getMessage(); 
        }
        return $conn ;
    } 
}
?>
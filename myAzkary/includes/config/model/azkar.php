<?php
class azkar {
private $conn ;
public $id ;
private $tbname = "azkary" ;
public function __construct($db) {
$this->conn = $db ;
}
public function read () {
$query = "SELECT subTitle,bodyText,textSource,textInfo,categoryName,a.categoryId,count FROM azkary a left join category c on a.categoryId = c.categoryId order by  a.categoryId  "  ;
$stmt = $this->conn->prepare($query) ;
// $stmt->execute(array($azkarCategory)) ;
$stmt->execute() ;
return $stmt ;
}
public function singleRead () {
$query = "SELECT subTitle,bodyText,textSource,textInfo,categoryName,a.categoryId,count FROM azkary a left join category c on a.categoryId = c.categoryId  WHERE a.categoryId = ? order by  a.categoryId "  ;
$stmt = $this->conn->prepare($query) ;

$stmt->execute([$this->id]) ;
return $stmt ;
}
// public function readOneCategory ($azkarCategory) {
// $query = "SELECT subTitle,bodyText,textSource,textInfo,azkarCategory,count FROM ".$this->tbname ."WHERE azkarCategory = ?";
// $stmt = $this->conn->prepare($query) ;
// $stmt->execute(array($azkarCategory)) ;
// return $stmt ;
// }
}
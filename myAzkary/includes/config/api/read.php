<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type:appliction/json");
header("Access-Control-Allow-Headers: Content-Type, Authorization"); //////////
include "../conn/conn.php";
include "../../config/model/azkar.php";
$conn = (new db())->connect() ;
$azkar = new azkar($conn) ;
if (isset($_GET["categoryId"])) {
    if ($_GET["categoryId"] == 1) {
        $azkar->id =$_GET["categoryId"] ;
        $stmt = $azkar->singleRead();
    }elseif ($_GET["categoryId"] == 2) {
        $azkar->id =$_GET["categoryId"] ;
        $stmt = $azkar->singleRead();
    }
    elseif ($_GET["categoryId"] == 3) {
        $azkar->id =$_GET["categoryId"] ;
        $stmt = $azkar->singleRead();
    }
    elseif ($_GET["categoryId"] == 4) {
        $azkar->id =$_GET["categoryId"] ;
        $stmt = $azkar->singleRead();   
    }
    elseif ($_GET["categoryId"] == 5) {
        $azkar->id =$_GET["categoryId"] ;
        $stmt = $azkar->singleRead();
        
    }else {
        $stmt = $azkar->read();
    }


}else {
    $stmt = $azkar->read();
}
if ($stmt->rowCount() > 0) {
    $result = array("data"=>[]) ;
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row) ;
        $result["data"][] = ["subTitle" =>$subTitle ,"bodyText" =>$bodyText ,"textSource" =>$textSource ,"textInfo" =>$textInfo ,"count" =>$count ,"categoryName" =>$categoryName,"categoryId" =>$categoryId  ];
    
    }
echo json_encode($result) ;

}
else {
    
    echo json_encode(["data"=>"no data"]) ;
}

?>

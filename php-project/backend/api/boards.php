<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($method) {
        case 'GET':
            // دریافت لیست بردها
            $result = mysqli_query($link, "SELECT * FROM board ORDER BY id DESC");
            $boards = [];
            while ($row = mysqli_fetch_array($result)) {
                $boards[] = [
                    'id' => $row['id'],
                    'bcode' => $row['bcode'],
                    'bname' => $row['bname'],
                    'pcode' => $row['pcode'],
                    'pcount' => $row['pcount'],
                    'created_at' => $row['created_at'] ?? null,
                    'updated_at' => $row['updated_at'] ?? null
                ];
            }
            echo json_encode(['success' => true, 'data' => $boards]);
            break;

        case 'POST':
            // افزودن برد جدید
            $input = json_decode(file_get_contents('php://input'), true);
            $bcode = mysqli_real_escape_string($link, $input['bcode']);
            $bname = mysqli_real_escape_string($link, $input['bname']);
            $pcode = mysqli_real_escape_string($link, $input['pcode']);
            $pcount = intval($input['pcount']);
            
            $query = "INSERT INTO board (bcode, bname, pcode, pcount) VALUES ('$bcode', '$bname', '$pcode', $pcount)";
            if (mysqli_query($link, $query)) {
                echo json_encode(['success' => true, 'id' => mysqli_insert_id($link)]);
            } else {
                echo json_encode(['success' => false, 'error' => mysqli_error($link)]);
            }
            break;

        case 'PUT':
            // ویرایش برد
            $input = json_decode(file_get_contents('php://input'), true);
            $id = intval($input['id']);
            $bcode = mysqli_real_escape_string($link, $input['bcode']);
            $bname = mysqli_real_escape_string($link, $input['bname']);
            $pcode = mysqli_real_escape_string($link, $input['pcode']);
            $pcount = intval($input['pcount']);
            
            $query = "UPDATE board SET bcode='$bcode', bname='$bname', pcode='$pcode', pcount=$pcount WHERE id=$id";
            if (mysqli_query($link, $query)) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error' => mysqli_error($link)]);
            }
            break;

        case 'DELETE':
            // حذف برد
            $input = json_decode(file_get_contents('php://input'), true);
            $id = intval($input['id']);
            
            $query = "DELETE FROM board WHERE id=$id";
            if (mysqli_query($link, $query)) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error' => mysqli_error($link)]);
            }
            break;

        default:
            http_response_code(405);
            echo json_encode(['success' => false, 'error' => 'Method not allowed']);
            break;
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
} finally {
    mysqli_close($link);
} 
<?php
/**
 * Boards API
 * API مدیریت بردها
 */

require_once '../config/database.php';
require_once '../includes/functions.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    
    $method = checkRequestMethod(['GET', 'POST', 'PUT', 'DELETE']);
    
    switch ($method) {
        case 'GET':
            handleGetBoards($db);
            break;
        case 'POST':
            handleCreateBoard($db);
            break;
        case 'PUT':
            handleUpdateBoard($db);
            break;
        case 'DELETE':
            handleDeleteBoard($db);
            break;
    }
    
} catch (Exception $e) {
    logError('Boards API Error: ' . $e->getMessage());
    sendErrorResponse('خطا در پردازش درخواست: ' . $e->getMessage(), 500);
}

/**
 * دریافت لیست بردها
 */
function handleGetBoards($db) {
    try {
        $searchTerm = isset($_GET['search']) ? sanitizeInput($_GET['search']) : '';
        $page = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;
        $limit = isset($_GET['limit']) ? max(1, min(100, (int)$_GET['limit'])) : 20;
        $offset = ($page - 1) * $limit;
        
        // ایجاد شرط جستجو
        $searchCondition = buildSearchCondition(['bname', 'bcode', 'pcode'], $searchTerm);
        $orderClause = buildOrderClause(['id', 'bname', 'bcode', 'pcode', 'pcount'], 'id', 'ASC');
        
        // شمارش کل رکوردها
        $countQuery = "SELECT COUNT(*) as total FROM board WHERE 1=1" . $searchCondition['condition'];
        $countStmt = $db->prepare($countQuery);
        $countStmt->execute($searchCondition['params']);
        $totalCount = $countStmt->fetch()['total'];
        
        // دریافت داده‌ها
        $query = "SELECT id, bcode, bname, pcode, pcount 
                  FROM board 
                  WHERE 1=1" . $searchCondition['condition'] . " 
                  {$orderClause} 
                  LIMIT {$limit} OFFSET {$offset}";
        
        $stmt = $db->prepare($query);
        $stmt->execute($searchCondition['params']);
        $boards = $stmt->fetchAll();
        
        // محاسبه اطلاعات صفحه‌بندی
        $totalPages = ceil($totalCount / $limit);
        
        sendSuccessResponse([
            'boards' => $boards,
            'pagination' => [
                'current_page' => $page,
                'total_pages' => $totalPages,
                'total_count' => (int)$totalCount,
                'limit' => $limit,
                'has_next' => $page < $totalPages,
                'has_prev' => $page > 1
            ]
        ]);
        
    } catch (Exception $e) {
        logError('Get Boards Error: ' . $e->getMessage());
        sendErrorResponse('خطا در دریافت بردها: ' . $e->getMessage());
    }
}

/**
 * ایجاد برد جدید
 */
function handleCreateBoard($db) {
    try {
        $data = getJsonInput();
        validateRequiredFields($data, ['bcode', 'bname', 'pcode', 'pcount']);
        
        // پاک‌کردن داده‌ها
        $bcode = sanitizeInput($data['bcode']);
        $bname = sanitizeInput($data['bname']);
        $pcode = sanitizeInput($data['pcode']);
        $pcount = (int)$data['pcount'];
        
        // بررسی تکراری نبودن کد برد
        $checkQuery = "SELECT id FROM board WHERE bcode = ?";
        $checkStmt = $db->prepare($checkQuery);
        $checkStmt->execute([$bcode]);
        
        if ($checkStmt->fetch()) {
            sendErrorResponse('کد برد تکراری است');
        }
        
        // درج رکورد جدید
        $insertQuery = "INSERT INTO board (bcode, bname, pcode, pcount) VALUES (?, ?, ?, ?)";
        $insertStmt = $db->prepare($insertQuery);
        $insertStmt->execute([$bcode, $bname, $pcode, $pcount]);
        
        $newId = $db->lastInsertId();
        
        // دریافت رکورد ایجاد شده
        $selectQuery = "SELECT id, bcode, bname, pcode, pcount FROM board WHERE id = ?";
        $selectStmt = $db->prepare($selectQuery);
        $selectStmt->execute([$newId]);
        $newBoard = $selectStmt->fetch();
        
        sendSuccessResponse($newBoard, 'برد با موفقیت ایجاد شد');
        
    } catch (Exception $e) {
        logError('Create Board Error: ' . $e->getMessage());
        sendErrorResponse('خطا در ایجاد برد: ' . $e->getMessage());
    }
}

/**
 * ویرایش برد
 */
function handleUpdateBoard($db) {
    try {
        $data = getJsonInput();
        validateRequiredFields($data, ['id', 'bcode', 'bname', 'pcode', 'pcount']);
        
        // پاک‌کردن داده‌ها
        $id = (int)$data['id'];
        $bcode = sanitizeInput($data['bcode']);
        $bname = sanitizeInput($data['bname']);
        $pcode = sanitizeInput($data['pcode']);
        $pcount = (int)$data['pcount'];
        
        // بررسی وجود رکورد
        $checkQuery = "SELECT id FROM board WHERE id = ?";
        $checkStmt = $db->prepare($checkQuery);
        $checkStmt->execute([$id]);
        
        if (!$checkStmt->fetch()) {
            sendErrorResponse('برد مورد نظر یافت نشد', 404);
        }
        
        // بررسی تکراری نبودن کد برد (به جز خودش)
        $duplicateQuery = "SELECT id FROM board WHERE bcode = ? AND id != ?";
        $duplicateStmt = $db->prepare($duplicateQuery);
        $duplicateStmt->execute([$bcode, $id]);
        
        if ($duplicateStmt->fetch()) {
            sendErrorResponse('کد برد تکراری است');
        }
        
        // به‌روزرسانی رکورد
        $updateQuery = "UPDATE board SET bcode = ?, bname = ?, pcode = ?, pcount = ? WHERE id = ?";
        $updateStmt = $db->prepare($updateQuery);
        $updateStmt->execute([$bcode, $bname, $pcode, $pcount, $id]);
        
        // دریافت رکورد به‌روزرسانی شده
        $selectQuery = "SELECT id, bcode, bname, pcode, pcount FROM board WHERE id = ?";
        $selectStmt = $db->prepare($selectQuery);
        $selectStmt->execute([$id]);
        $updatedBoard = $selectStmt->fetch();
        
        sendSuccessResponse($updatedBoard, 'برد با موفقیت به‌روزرسانی شد');
        
    } catch (Exception $e) {
        logError('Update Board Error: ' . $e->getMessage());
        sendErrorResponse('خطا در به‌روزرسانی برد: ' . $e->getMessage());
    }
}

/**
 * حذف برد
 */
function handleDeleteBoard($db) {
    try {
        $id = getIdFromParam('id');
        
        // بررسی وجود رکورد
        $checkQuery = "SELECT id FROM board WHERE id = ?";
        $checkStmt = $db->prepare($checkQuery);
        $checkStmt->execute([$id]);
        
        if (!$checkStmt->fetch()) {
            sendErrorResponse('برد مورد نظر یافت نشد', 404);
        }
        
        // بررسی استفاده در جداول مرتبط
        $usedInDeviceQuery = "SELECT COUNT(*) as count FROM device WHERE board_id = ?";
        $usedInDeviceStmt = $db->prepare($usedInDeviceQuery);
        $usedInDeviceStmt->execute([$id]);
        $deviceCount = $usedInDeviceStmt->fetch()['count'];
        
        $usedInGhateQuery = "SELECT COUNT(*) as count FROM ghate WHERE board_id = ?";
        $usedInGhateStmt = $db->prepare($usedInGhateQuery);
        $usedInGhateStmt->execute([$id]);
        $ghateCount = $usedInGhateStmt->fetch()['count'];
        
        if ($deviceCount > 0 || $ghateCount > 0) {
            sendErrorResponse('امکان حذف این برد وجود ندارد، زیرا در دستگاه‌ها یا قطعات استفاده شده است');
        }
        
        // حذف رکورد
        $deleteQuery = "DELETE FROM board WHERE id = ?";
        $deleteStmt = $db->prepare($deleteQuery);
        $deleteStmt->execute([$id]);
        
        sendSuccessResponse(['id' => $id], 'برد با موفقیت حذف شد');
        
    } catch (Exception $e) {
        logError('Delete Board Error: ' . $e->getMessage());
        sendErrorResponse('خطا در حذف برد: ' . $e->getMessage());
    }
}
?> 
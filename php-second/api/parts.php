<?php
/**
 * Parts API (Ghate)
 * API مدیریت قطعات
 */

require_once '../config/database.php';
require_once '../includes/functions.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    
    $method = checkRequestMethod(['GET', 'POST', 'PUT', 'DELETE']);
    
    switch ($method) {
        case 'GET':
            handleGetParts($db);
            break;
        case 'POST':
            handleCreatePart($db);
            break;
        case 'PUT':
            handleUpdatePart($db);
            break;
        case 'DELETE':
            handleDeletePart($db);
            break;
    }
    
} catch (Exception $e) {
    logError('Parts API Error: ' . $e->getMessage());
    sendErrorResponse('خطا در پردازش درخواست: ' . $e->getMessage(), 500);
}

/**
 * دریافت لیست قطعات
 */
function handleGetParts($db) {
    try {
        $searchTerm = isset($_GET['search']) ? sanitizeInput($_GET['search']) : '';
        $boardId = isset($_GET['board_id']) ? (int)$_GET['board_id'] : null;
        $page = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;
        $limit = isset($_GET['limit']) ? max(1, min(100, (int)$_GET['limit'])) : 20;
        $offset = ($page - 1) * $limit;
        
        // ایجاد شرط جستجو
        $searchCondition = buildSearchCondition(['g.name', 'g.description'], $searchTerm);
        $boardCondition = $boardId ? ' AND g.board_id = ?' : '';
        $orderClause = buildOrderClause(['id', 'name', 'description', 'price', 'quantity'], 'id', 'ASC');
        
        // پارامترهای کوئری
        $queryParams = $searchCondition['params'];
        if ($boardId) {
            $queryParams[] = $boardId;
        }
        
        // شمارش کل رکوردها
        $countQuery = "SELECT COUNT(*) as total 
                       FROM ghate g 
                       WHERE 1=1" . $searchCondition['condition'] . $boardCondition;
        $countStmt = $db->prepare($countQuery);
        $countStmt->execute($queryParams);
        $totalCount = $countStmt->fetch()['total'];
        
        // دریافت داده‌ها با اطلاعات برد
        $query = "SELECT g.id, g.name, g.description, g.price, g.board_id, g.quantity,
                         b.bname as board_name, b.bcode as board_code
                  FROM ghate g 
                  LEFT JOIN board b ON g.board_id = b.id
                  WHERE 1=1" . $searchCondition['condition'] . $boardCondition . " 
                  {$orderClause} 
                  LIMIT {$limit} OFFSET {$offset}";
        
        $stmt = $db->prepare($query);
        $stmt->execute($queryParams);
        $parts = $stmt->fetchAll();
        
        // تبدیل قیمت و مقدار به عدد
        foreach ($parts as &$part) {
            $part['price'] = (float)$part['price'];
            $part['quantity'] = (int)$part['quantity'];
        }
        
        // محاسبه اطلاعات صفحه‌بندی
        $totalPages = ceil($totalCount / $limit);
        
        sendSuccessResponse([
            'parts' => $parts,
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
        logError('Get Parts Error: ' . $e->getMessage());
        sendErrorResponse('خطا در دریافت قطعات: ' . $e->getMessage());
    }
}

/**
 * ایجاد قطعه جدید
 */
function handleCreatePart($db) {
    try {
        $data = getJsonInput();
        validateRequiredFields($data, ['name', 'price', 'board_id', 'quantity']);
        
        // پاک‌کردن داده‌ها
        $name = sanitizeInput($data['name']);
        $description = isset($data['description']) ? sanitizeInput($data['description']) : null;
        $price = (float)$data['price'];
        $boardId = (int)$data['board_id'];
        $quantity = (int)$data['quantity'];
        
        // اعتبارسنجی قیمت و مقدار
        if ($price < 0) {
            sendErrorResponse('قیمت نمی‌تواند منفی باشد');
        }
        
        if ($quantity < 0) {
            sendErrorResponse('مقدار نمی‌تواند منفی باشد');
        }
        
        // بررسی وجود برد
        $boardCheckQuery = "SELECT id FROM board WHERE id = ?";
        $boardCheckStmt = $db->prepare($boardCheckQuery);
        $boardCheckStmt->execute([$boardId]);
        
        if (!$boardCheckStmt->fetch()) {
            sendErrorResponse('برد مورد نظر یافت نشد');
        }
        
        // درج رکورد جدید
        $insertQuery = "INSERT INTO ghate (name, description, price, board_id, quantity) VALUES (?, ?, ?, ?, ?)";
        $insertStmt = $db->prepare($insertQuery);
        $insertStmt->execute([$name, $description, $price, $boardId, $quantity]);
        
        $newId = $db->lastInsertId();
        
        // دریافت رکورد ایجاد شده با اطلاعات برد
        $selectQuery = "SELECT g.id, g.name, g.description, g.price, g.board_id, g.quantity,
                               b.bname as board_name, b.bcode as board_code
                        FROM ghate g 
                        LEFT JOIN board b ON g.board_id = b.id
                        WHERE g.id = ?";
        $selectStmt = $db->prepare($selectQuery);
        $selectStmt->execute([$newId]);
        $newPart = $selectStmt->fetch();
        
        // تبدیل قیمت و مقدار به عدد
        $newPart['price'] = (float)$newPart['price'];
        $newPart['quantity'] = (int)$newPart['quantity'];
        
        sendSuccessResponse($newPart, 'قطعه با موفقیت ایجاد شد');
        
    } catch (Exception $e) {
        logError('Create Part Error: ' . $e->getMessage());
        sendErrorResponse('خطا در ایجاد قطعه: ' . $e->getMessage());
    }
}

/**
 * ویرایش قطعه
 */
function handleUpdatePart($db) {
    try {
        $data = getJsonInput();
        validateRequiredFields($data, ['id', 'name', 'price', 'board_id', 'quantity']);
        
        // پاک‌کردن داده‌ها
        $id = (int)$data['id'];
        $name = sanitizeInput($data['name']);
        $description = isset($data['description']) ? sanitizeInput($data['description']) : null;
        $price = (float)$data['price'];
        $boardId = (int)$data['board_id'];
        $quantity = (int)$data['quantity'];
        
        // اعتبارسنجی قیمت و مقدار
        if ($price < 0) {
            sendErrorResponse('قیمت نمی‌تواند منفی باشد');
        }
        
        if ($quantity < 0) {
            sendErrorResponse('مقدار نمی‌تواند منفی باشد');
        }
        
        // بررسی وجود قطعه
        $checkQuery = "SELECT id FROM ghate WHERE id = ?";
        $checkStmt = $db->prepare($checkQuery);
        $checkStmt->execute([$id]);
        
        if (!$checkStmt->fetch()) {
            sendErrorResponse('قطعه مورد نظر یافت نشد', 404);
        }
        
        // بررسی وجود برد
        $boardCheckQuery = "SELECT id FROM board WHERE id = ?";
        $boardCheckStmt = $db->prepare($boardCheckQuery);
        $boardCheckStmt->execute([$boardId]);
        
        if (!$boardCheckStmt->fetch()) {
            sendErrorResponse('برد مورد نظر یافت نشد');
        }
        
        // به‌روزرسانی رکورد
        $updateQuery = "UPDATE ghate SET name = ?, description = ?, price = ?, board_id = ?, quantity = ? WHERE id = ?";
        $updateStmt = $db->prepare($updateQuery);
        $updateStmt->execute([$name, $description, $price, $boardId, $quantity, $id]);
        
        // دریافت رکورد به‌روزرسانی شده با اطلاعات برد
        $selectQuery = "SELECT g.id, g.name, g.description, g.price, g.board_id, g.quantity,
                               b.bname as board_name, b.bcode as board_code
                        FROM ghate g 
                        LEFT JOIN board b ON g.board_id = b.id
                        WHERE g.id = ?";
        $selectStmt = $db->prepare($selectQuery);
        $selectStmt->execute([$id]);
        $updatedPart = $selectStmt->fetch();
        
        // تبدیل قیمت و مقدار به عدد
        $updatedPart['price'] = (float)$updatedPart['price'];
        $updatedPart['quantity'] = (int)$updatedPart['quantity'];
        
        sendSuccessResponse($updatedPart, 'قطعه با موفقیت به‌روزرسانی شد');
        
    } catch (Exception $e) {
        logError('Update Part Error: ' . $e->getMessage());
        sendErrorResponse('خطا در به‌روزرسانی قطعه: ' . $e->getMessage());
    }
}

/**
 * حذف قطعه
 */
function handleDeletePart($db) {
    try {
        $id = getIdFromParam('id');
        
        // بررسی وجود رکورد
        $checkQuery = "SELECT id FROM ghate WHERE id = ?";
        $checkStmt = $db->prepare($checkQuery);
        $checkStmt->execute([$id]);
        
        if (!$checkStmt->fetch()) {
            sendErrorResponse('قطعه مورد نظر یافت نشد', 404);
        }
        
        // حذف رکورد
        $deleteQuery = "DELETE FROM ghate WHERE id = ?";
        $deleteStmt = $db->prepare($deleteQuery);
        $deleteStmt->execute([$id]);
        
        sendSuccessResponse(['id' => $id], 'قطعه با موفقیت حذف شد');
        
    } catch (Exception $e) {
        logError('Delete Part Error: ' . $e->getMessage());
        sendErrorResponse('خطا در حذف قطعه: ' . $e->getMessage());
    }
}
?> 
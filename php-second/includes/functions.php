<?php
/**
 * Helper Functions
 * توابع کمکی برای API ها
 */

/**
 * ارسال پاسخ JSON
 */
function sendJsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        exit(0);
    }
    
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

/**
 * ارسال پاسخ خطا
 */
function sendErrorResponse($message, $statusCode = 400) {
    sendJsonResponse([
        'success' => false,
        'error' => $message
    ], $statusCode);
}

/**
 * ارسال پاسخ موفق
 */
function sendSuccessResponse($data, $message = null) {
    $response = [
        'success' => true,
        'data' => $data
    ];
    
    if ($message) {
        $response['message'] = $message;
    }
    
    sendJsonResponse($response);
}

/**
 * اعتبارسنجی ورودی JSON
 */
function getJsonInput() {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        sendErrorResponse('داده‌های JSON نامعتبر است');
    }
    
    return $data;
}

/**
 * اعتبارسنجی فیلدهای ضروری
 */
function validateRequiredFields($data, $requiredFields) {
    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || empty($data[$field])) {
            sendErrorResponse("فیلد {$field} ضروری است");
        }
    }
}

/**
 * پاک‌کردن و اعتبارسنجی ورودی
 */
function sanitizeInput($data) {
    if (is_array($data)) {
        return array_map('sanitizeInput', $data);
    }
    return htmlspecialchars(strip_tags(trim($data)));
}

/**
 * تولید UUID ساده
 */
function generateUUID() {
    return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000,
        mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );
}

/**
 * لاگ خطاها
 */
function logError($message, $context = []) {
    $logMessage = date('Y-m-d H:i:s') . ' - ' . $message;
    if (!empty($context)) {
        $logMessage .= ' - Context: ' . json_encode($context, JSON_UNESCAPED_UNICODE);
    }
    error_log($logMessage);
}

/**
 * بررسی متد درخواست
 */
function checkRequestMethod($allowedMethods) {
    $method = $_SERVER['REQUEST_METHOD'];
    if (!in_array($method, $allowedMethods)) {
        sendErrorResponse('متد درخواست مجاز نیست', 405);
    }
    return $method;
}

/**
 * دریافت ID از پارامتر
 */
function getIdFromParam($paramName = 'id') {
    if (!isset($_GET[$paramName]) || empty($_GET[$paramName])) {
        sendErrorResponse("{$paramName} ضروری است");
    }
    
    $id = sanitizeInput($_GET[$paramName]);
    if (!is_numeric($id)) {
        sendErrorResponse("{$paramName} باید عددی باشد");
    }
    
    return (int)$id;
}

/**
 * ایجاد کلیدهای مرتب‌سازی
 */
function buildOrderClause($allowedSortFields, $defaultSort = 'id', $defaultOrder = 'ASC') {
    $sortField = isset($_GET['sort']) ? sanitizeInput($_GET['sort']) : $defaultSort;
    $sortOrder = isset($_GET['order']) ? strtoupper(sanitizeInput($_GET['order'])) : $defaultOrder;
    
    if (!in_array($sortField, $allowedSortFields)) {
        $sortField = $defaultSort;
    }
    
    if (!in_array($sortOrder, ['ASC', 'DESC'])) {
        $sortOrder = $defaultOrder;
    }
    
    return "ORDER BY {$sortField} {$sortOrder}";
}

/**
 * ایجاد شرط‌های جستجو
 */
function buildSearchCondition($searchFields, $searchTerm) {
    if (empty($searchTerm) || empty($searchFields)) {
        return ['condition' => '', 'params' => []];
    }
    
    $conditions = [];
    $params = [];
    
    foreach ($searchFields as $field) {
        $conditions[] = "{$field} LIKE ?";
        $params[] = "%{$searchTerm}%";
    }
    
    return [
        'condition' => ' AND (' . implode(' OR ', $conditions) . ')',
        'params' => $params
    ];
}
?> 
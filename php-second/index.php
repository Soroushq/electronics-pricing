<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Electronics Pricing API - تست API ها</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Tahoma', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            color: white;
            margin-bottom: 30px;
        }
        
        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .header p {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        
        .api-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .api-card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .api-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        
        .api-card h3 {
            color: #667eea;
            margin-bottom: 15px;
            font-size: 1.3rem;
            border-bottom: 2px solid #f0f0f0;
            padding-bottom: 10px;
        }
        
        .endpoint {
            margin-bottom: 10px;
            padding: 8px 12px;
            background: #f8f9fa;
            border-radius: 5px;
            border-right: 4px solid #28a745;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
        }
        
        .method {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 3px;
            font-weight: bold;
            font-size: 0.8rem;
            margin-left: 8px;
        }
        
        .get { background: #17a2b8; color: white; }
        .post { background: #28a745; color: white; }
        .put { background: #ffc107; color: black; }
        .delete { background: #dc3545; color: white; }
        
        .test-section {
            background: white;
            border-radius: 10px;
            padding: 25px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        
        .test-section h2 {
            color: #667eea;
            margin-bottom: 20px;
            font-size: 1.5rem;
        }
        
        .test-form {
            display: grid;
            gap: 15px;
        }
        
        .form-group {
            display: grid;
            gap: 5px;
        }
        
        label {
            font-weight: bold;
            color: #555;
        }
        
        input, select, textarea {
            padding: 10px;
            border: 2px solid #e0e0e0;
            border-radius: 5px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }
        
        input:focus, select:focus, textarea:focus {
            outline: none;
            border-color: #667eea;
        }
        
        button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: bold;
            transition: transform 0.3s ease;
        }
        
        button:hover {
            transform: translateY(-2px);
        }
        
        .result {
            background: #f8f9fa;
            border-radius: 5px;
            padding: 15px;
            margin-top: 15px;
            white-space: pre-wrap;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            max-height: 400px;
            overflow-y: auto;
            border: 1px solid #e0e0e0;
        }
        
        .status-indicator {
            text-align: center;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        
        .status-success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .status-error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        .footer {
            text-align: center;
            color: white;
            margin-top: 30px;
            opacity: 0.8;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔧 Electronics Pricing API</h1>
            <p>سیستم مدیریت قیمت‌گذاری قطعات الکترونیکی</p>
        </div>

        <div class="status-indicator status-success">
            <h3>✅ API Backend Successfully Deployed</h3>
            <p>بک‌اند PHP با موفقیت راه‌اندازی شده است</p>
        </div>

        <div class="api-grid">
            <div class="api-card">
                <h3>🔲 مدیریت بردها (Boards)</h3>
                <div class="endpoint">
                    <span class="method get">GET</span>/api/boards.php
                </div>
                <div class="endpoint">
                    <span class="method post">POST</span>/api/boards.php
                </div>
                <div class="endpoint">
                    <span class="method put">PUT</span>/api/boards.php
                </div>
                <div class="endpoint">
                    <span class="method delete">DELETE</span>/api/boards.php?id=1
                </div>
            </div>

            <div class="api-card">
                <h3>📱 مدیریت دستگاه‌ها (Devices)</h3>
                <div class="endpoint">
                    <span class="method get">GET</span>/api/devices.php
                </div>
                <div class="endpoint">
                    <span class="method post">POST</span>/api/devices.php
                </div>
                <div class="endpoint">
                    <span class="method put">PUT</span>/api/devices.php
                </div>
                <div class="endpoint">
                    <span class="method delete">DELETE</span>/api/devices.php?id=1
                </div>
            </div>

            <div class="api-card">
                <h3>⚙️ مدیریت قطعات (Parts)</h3>
                <div class="endpoint">
                    <span class="method get">GET</span>/api/parts.php
                </div>
                <div class="endpoint">
                    <span class="method post">POST</span>/api/parts.php
                </div>
                <div class="endpoint">
                    <span class="method put">PUT</span>/api/parts.php
                </div>
                <div class="endpoint">
                    <span class="method delete">DELETE</span>/api/parts.php?id=1
                </div>
            </div>

            <div class="api-card">
                <h3>🔄 مدیریت پردازش‌ها (Processes)</h3>
                <div class="endpoint">
                    <span class="method get">GET</span>/api/processes.php
                </div>
                <div class="endpoint">
                    <span class="method post">POST</span>/api/processes.php
                </div>
                <div class="endpoint">
                    <span class="method put">PUT</span>/api/processes.php
                </div>
                <div class="endpoint">
                    <span class="method delete">DELETE</span>/api/processes.php?id=1
                </div>
            </div>

            <div class="api-card">
                <h3>💰 محاسبه قیمت (Pricing)</h3>
                <div class="endpoint">
                    <span class="method get">GET</span>/api/pricing.php?device_id=1
                </div>
                <p style="margin-top: 10px; font-size: 0.9rem; color: #666;">
                    محاسبه قیمت کل دستگاه بر اساس قطعات و پردازش‌ها
                </p>
            </div>
        </div>

        <div class="test-section">
            <h2>🧪 تست سریع API</h2>
            <form class="test-form" onsubmit="testApi(event)">
                <div class="form-group">
                    <label for="apiUrl">API Endpoint:</label>
                    <select id="apiUrl" required>
                        <option value="">انتخاب کنید...</option>
                        <option value="api/boards.php">دریافت بردها (GET)</option>
                        <option value="api/devices.php">دریافت دستگاه‌ها (GET)</option>
                        <option value="api/parts.php">دریافت قطعات (GET)</option>
                        <option value="api/processes.php">دریافت پردازش‌ها (GET)</option>
                        <option value="api/pricing.php?device_id=1">محاسبه قیمت دستگاه 1 (GET)</option>
                    </select>
                </div>
                <button type="submit">🚀 تست API</button>
            </form>
            <div id="testResult" class="result" style="display: none;"></div>
        </div>

        <div class="footer">
            <p>🔗 برای اتصال فرانت Next.js به این بک‌اند، از URLهای بالا استفاده کنید</p>
            <p>📝 تمامی API ها از CORS پشتیبانی می‌کنند و آماده اتصال هستند</p>
        </div>
    </div>

    <script>
        async function testApi(event) {
            event.preventDefault();
            
            const url = document.getElementById('apiUrl').value;
            const resultDiv = document.getElementById('testResult');
            
            if (!url) {
                alert('لطفاً یک API انتخاب کنید');
                return;
            }
            
            resultDiv.style.display = 'block';
            resultDiv.textContent = 'در حال تست API...';
            
            try {
                const response = await fetch(url);
                const data = await response.json();
                
                resultDiv.textContent = `Status: ${response.status}\n\n${JSON.stringify(data, null, 2)}`;
                
                if (response.ok) {
                    resultDiv.style.backgroundColor = '#d4edda';
                    resultDiv.style.color = '#155724';
                    resultDiv.style.border = '1px solid #c3e6cb';
                } else {
                    resultDiv.style.backgroundColor = '#f8d7da';
                    resultDiv.style.color = '#721c24';
                    resultDiv.style.border = '1px solid #f5c6cb';
                }
            } catch (error) {
                resultDiv.textContent = `خطا در تست API:\n\n${error.message}`;
                resultDiv.style.backgroundColor = '#f8d7da';
                resultDiv.style.color = '#721c24';
                resultDiv.style.border = '1px solid #f5c6cb';
            }
        }
    </script>
</body>
</html> 
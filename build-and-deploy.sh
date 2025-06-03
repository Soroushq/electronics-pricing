#!/bin/bash

echo "🚀 شروع فرآیند Build و آماده‌سازی برای آپلود..."

# Clear previous builds
echo "🧹 پاک کردن build های قبلی..."
rm -rf .next
rm -rf out

# Install dependencies
echo "📦 نصب dependencies..."
npm install

# Build the project
echo "🔨 Build کردن پروژه..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build موفقیت‌آمیز بود!"
    
    # Create deployment package
    echo "📦 ایجاد package برای آپلود..."
    
    # Create a temporary directory for deployment files
    mkdir -p deployment-package
    
    # Copy necessary files
    cp -r src deployment-package/
    cp -r public deployment-package/
    cp -r .next deployment-package/
    cp package.json deployment-package/
    cp package-lock.json deployment-package/
    cp next.config.ts deployment-package/
    cp tsconfig.json deployment-package/
    cp DEPLOYMENT_GUIDE.md deployment-package/
    
    # Create .env.local template
    cat > deployment-package/.env.local << EOF
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=aramcont_pricedata
DB_USER=aramcont_pricedata
DB_PASSWORD=Aram@222333

# Next.js Configuration
NEXTAUTH_URL=https://aramcontrol.com/price-electronics
NEXTAUTH_SECRET=your_nextauth_secret_key_here

# Application Settings
NODE_ENV=production
EOF
    
    echo "✅ Package آماده شد در پوشه deployment-package/"
    echo ""
    echo "📋 مراحل بعدی:"
    echo "1. فایل deployment-package/.env.local را ویرایش کنید"
    echo "2. پسورد دیتابیس واقعی را وارد کنید"
    echo "3. محتویات پوشه deployment-package را روی سرور آپلود کنید"
    echo "4. در سرور: npm install --production"
    echo "5. سایت شما در آدرس https://aramcontrol.com/price-electronics آماده است"
    
else
    echo "❌ خطا در Build! لطفاً خطاها را بررسی کنید."
    exit 1
fi 
import { NextResponse } from 'next/server';
import { testConnection, DatabaseOperations, Board } from '@/lib/database';

export async function GET() {
  try {
    // Test basic connection
    const isConnected = await testConnection();
    
    if (!isConnected) {
      return NextResponse.json(
        {
          success: false,
          message: 'خطا در اتصال به دیتابیس',
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      );
    }

    // Check which tables exist
    const tableStatus = await DatabaseOperations.checkTablesExist();
    
    // Try to get some sample data from board table
    let sampleBoards: Board[] = [];
    try {
      const boards = await DatabaseOperations.getBoards();
      sampleBoards = boards.slice(0, 3); // First 3 boards
    } catch (error) {
      console.error('Error fetching sample boards:', error);
    }

    return NextResponse.json({
      success: true,
      message: 'اتصال به دیتابیس موفقیت‌آمیز است',
      database: {
        name: process.env.DB_NAME || 'aramcont_pricedata',
        user: process.env.DB_USER || 'aramcont_moridi',
        host: process.env.DB_HOST || 'localhost'
      },
      tables: tableStatus,
      sampleData: {
        boardsCount: sampleBoards.length,
        sampleBoards: sampleBoards
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'خطا در تست دیتابیس',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 
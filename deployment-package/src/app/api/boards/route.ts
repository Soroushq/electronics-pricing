import { NextRequest, NextResponse } from 'next/server';
import { DatabaseOperations } from '@/lib/database';

export async function GET() {
  try {
    const boards = await DatabaseOperations.getBoards();
    return NextResponse.json({ success: true, data: boards });
  } catch (error) {
    console.error('Error fetching boards:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch boards' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bname, pcode, pcount } = body;

    if (!bname) {
      return NextResponse.json(
        { success: false, error: 'Board name (bname) is required' },
        { status: 400 }
      );
    }

    const boardCode = await DatabaseOperations.createBoard({ 
      bname, 
      pcode: pcode || '', 
      pcount: pcount || 0 
    });
    
    return NextResponse.json(
      { success: true, data: { bcode: boardCode, bname, pcode, pcount } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating board:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create board' },
      { status: 500 }
    );
  }
} 
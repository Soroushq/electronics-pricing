import { NextRequest, NextResponse } from 'next/server';
import { DatabaseOperations } from '@/lib/database';

export async function GET() {
  try {
    const devices = await DatabaseOperations.getDevices();
    return NextResponse.json({ success: true, data: devices });
  } catch (error) {
    console.error('Error fetching devices:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch devices' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, board_code } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }

    const deviceId = await DatabaseOperations.createDevice({ name, description, board_code });
    return NextResponse.json(
      { success: true, data: { id: deviceId, name, description, board_code } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating device:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create device' },
      { status: 500 }
    );
  }
} 
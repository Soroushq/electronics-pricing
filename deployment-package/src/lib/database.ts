import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  database: process.env.DB_NAME || 'aramcont_pricedata',
  user: process.env.DB_USER || 'aramcont_moridi',
  password: process.env.DB_PASSWORD || 'OSA09155032778',
  charset: 'utf8mb4',
  timezone: '+00:00',
  connectTimeout: 60000,
  acquireTimeout: 60000,
  timeout: 60000,
};

// Connection pool for better performance
let pool: mysql.Pool | null = null;

export function getConnection(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

// Test database connection
export async function testConnection(): Promise<boolean> {
  try {
    const connection = getConnection();
    await connection.execute('SELECT 1 as test');
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

// Database interfaces based on actual table structure
export interface Board {
  bcode?: string;
  bname: string;
  pcode?: string;
  pcount?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface Device {
  id?: number;
  name: string;
  description?: string;
  board_code?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Ghate {
  id?: number;
  name: string;
  description?: string;
  price?: number;
  board_code?: string;
  quantity?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface Process {
  id?: number;
  name: string;
  description?: string;
  device_id?: number;
  order_index?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface ProcessPrice {
  id?: number;
  process_id: number;
  price: number;
  labor_cost?: number;
  material_cost?: number;
  overhead_cost?: number;
  created_at?: Date;
  updated_at?: Date;
}

// Database operations
export class DatabaseOperations {
  
  // Board operations
  static async getBoards(): Promise<Board[]> {
    const connection = getConnection();
    const [rows] = await connection.execute('SELECT * FROM board ORDER BY bcode DESC');
    return rows as Board[];
  }

  static async createBoard(board: Omit<Board, 'bcode' | 'created_at' | 'updated_at'>): Promise<string> {
    const connection = getConnection();
    
    // Generate new board code
    const [lastBoard] = await connection.execute(
      'SELECT bcode FROM board ORDER BY bcode DESC LIMIT 1'
    );
    
    let newBcode = 'B001';
    if (Array.isArray(lastBoard) && lastBoard.length > 0) {
      const boardRow = lastBoard[0] as {bcode: string};
      const lastBcode = boardRow.bcode;
      const lastNum = parseInt(lastBcode.substring(1)) || 0;
      newBcode = 'B' + String(lastNum + 1).padStart(3, '0');
    }
    
    await connection.execute(
      'INSERT INTO board (bcode, bname, pcode, pcount) VALUES (?, ?, ?, ?)',
      [newBcode, board.bname, board.pcode || '', board.pcount || 0]
    );
    return newBcode;
  }

  static async getBoardByCode(bcode: string): Promise<Board | null> {
    const connection = getConnection();
    const [rows] = await connection.execute('SELECT * FROM board WHERE bcode = ?', [bcode]);
    const boards = rows as Board[];
    return boards.length > 0 ? boards[0] : null;
  }

  // Device operations (if device table exists)
  static async getDevices(): Promise<Device[]> {
    try {
      const connection = getConnection();
      const [rows] = await connection.execute('SELECT * FROM device ORDER BY created_at DESC');
      return rows as Device[];
    } catch (error) {
      console.log('Device table might not exist:', error);
      return [];
    }
  }

  static async createDevice(device: Omit<Device, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    try {
      const connection = getConnection();
      const [result] = await connection.execute(
        'INSERT INTO device (name, description, board_code, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
        [device.name, device.description || '', device.board_code]
      );
      return (result as mysql.ResultSetHeader).insertId as number;
    } catch (error) {
      console.error('Error creating device:', error);
      throw error;
    }
  }

  // Ghate (Parts) operations (if ghate table exists)
  static async getGhateByBoardCode(boardCode: string): Promise<Ghate[]> {
    try {
      const connection = getConnection();
      const [rows] = await connection.execute('SELECT * FROM ghate WHERE board_code = ? ORDER BY created_at DESC', [boardCode]);
      return rows as Ghate[];
    } catch (error) {
      console.log('Ghate table might not exist:', error);
      return [];
    }
  }

  static async createGhate(ghate: Omit<Ghate, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    try {
      const connection = getConnection();
      const [result] = await connection.execute(
        'INSERT INTO ghate (name, description, price, board_code, quantity, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
        [ghate.name, ghate.description || '', ghate.price || 0, ghate.board_code, ghate.quantity || 1]
      );
      return (result as mysql.ResultSetHeader).insertId as number;
    } catch (error) {
      console.error('Error creating ghate:', error);
      throw error;
    }
  }

  // Process operations (if processes table exists)
  static async getProcessesByDeviceId(deviceId: number): Promise<Process[]> {
    try {
      const connection = getConnection();
      const [rows] = await connection.execute('SELECT * FROM processes WHERE device_id = ? ORDER BY order_index ASC', [deviceId]);
      return rows as Process[];
    } catch (error) {
      console.log('Processes table might not exist:', error);
      return [];
    }
  }

  static async createProcess(process: Omit<Process, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    try {
      const connection = getConnection();
      const [result] = await connection.execute(
        'INSERT INTO processes (name, description, device_id, order_index, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
        [process.name, process.description || '', process.device_id, process.order_index || 0]
      );
      return (result as mysql.ResultSetHeader).insertId as number;
    } catch (error) {
      console.error('Error creating process:', error);
      throw error;
    }
  }

  // Process Price operations (if processprice table exists)
  static async getProcessPricesByProcessId(processId: number): Promise<ProcessPrice[]> {
    try {
      const connection = getConnection();
      const [rows] = await connection.execute('SELECT * FROM processprice WHERE process_id = ?', [processId]);
      return rows as ProcessPrice[];
    } catch {
      console.log('ProcessPrice table might not exist');
      return [];
    }
  }

  static async createProcessPrice(processPrice: Omit<ProcessPrice, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    try {
      const connection = getConnection();
      const [result] = await connection.execute(
        'INSERT INTO processprice (process_id, price, labor_cost, material_cost, overhead_cost, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
        [processPrice.process_id, processPrice.price, processPrice.labor_cost || 0, processPrice.material_cost || 0, processPrice.overhead_cost || 0]
      );
      return (result as mysql.ResultSetHeader).insertId as number;
    } catch (error) {
      console.error('Error creating process price:', error);
      throw error;
    }
  }

  // Check if all tables exist
  static async checkTablesExist(): Promise<{[key: string]: boolean}> {
    const connection = getConnection();
    const tables = ['board', 'device', 'ghate', 'processes', 'processprice'];
    const result: {[key: string]: boolean} = {};
    
    for (const table of tables) {
      try {
        await connection.execute(`SELECT 1 FROM ${table} LIMIT 1`);
        result[table] = true;
      } catch {
        result[table] = false;
      }
    }
    
    return result;
  }
} 
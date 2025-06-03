/**
 * Type definitions for Electronics Pricing System
 * 
 * This file contains all the TypeScript interfaces and types
 * used throughout the application for type safety and consistency.
 */

// Base interface for all database entities
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Specifications interface for component technical details
export interface ComponentSpecifications {
  voltage?: string;
  current?: string;
  power?: string;
  tolerance?: string;
  packageType?: string;
  temperature?: string;
  frequency?: string;
  [key: string]: string | number | boolean | undefined;
}

// Component/Part interface - represents individual electronic components
export interface Component extends BaseEntity {
  code: string;           // Component code (e.g., "RS409", "BD490")
  name: string;           // Component name in Persian
  price: number;          // Current price in Rial
  category: ComponentCategory;
  description?: string;   // Optional description
  specifications?: ComponentSpecifications; // Technical specifications
  supplier?: string;      // Supplier information
  stockQuantity?: number; // Available stock
  minOrderQuantity?: number; // Minimum order quantity
  isActive: boolean;      // Whether component is active/available
}

// Component categories enum
export enum ComponentCategory {
  RESISTOR = 'resistor',           // مقاومت‌ها
  CAPACITOR = 'capacitor',         // خازن‌ها
  DIODE = 'diode',                 // دیودها
  TRANSISTOR = 'transistor',       // ترانزیستورها
  IC = 'ic',                       // آی‌سی‌ها
  CONNECTOR = 'connector',         // کانکتورها
  LED = 'led',                     // LED ها
  DISPLAY = 'display',             // نمایشگرها
  RELAY = 'relay',                 // رله‌ها
  POWER_SUPPLY = 'power_supply',   // منابع تغذیه
  PCB = 'pcb',                     // بردهای مدار چاپی
  SENSOR = 'sensor',               // سنسورها
  CRYSTAL = 'crystal',             // کریستال‌ها
  INDUCTOR = 'inductor',           // سلف‌ها
  FUSE = 'fuse',                   // فیوزها
  SWITCH = 'switch',               // سوئیچ‌ها
  OTHER = 'other'                  // سایر
}

// Board interface - represents PCBs made from components
export interface Board extends BaseEntity {
  name: string;           // Board name (e.g., "ماژول قفل کارتی")
  code: string;           // Board code (e.g., "BD582")
  description?: string;   // Board description
  components: BoardComponent[]; // List of components in this board
  totalPrice: number;     // Calculated total price
  laborCost?: number;     // Labor/assembly cost
  markupPercentage?: number; // Profit margin percentage
  category: BoardCategory;
  isActive: boolean;
}

// Board component relationship - how many of each component is used in a board
export interface BoardComponent {
  componentId: string;    // Reference to Component
  component?: Component;  // Populated component data
  quantity: number;       // How many of this component are used
  notes?: string;         // Optional notes about usage
}

// Board categories
export enum BoardCategory {
  CARD_LOCK = 'card_lock',         // ماژول‌های قفل کارتی
  CONTROL_BOARD = 'control_board', // بردهای کنترل
  POWER_BOARD = 'power_board',     // بردهای تغذیه
  RELAY_BOX = 'relay_box',         // رله باکس‌ها
  NETWORK = 'network',             // شبکه
  INTERFACE = 'interface',         // رابط‌ها
  SENSOR_BOARD = 'sensor_board',   // بردهای سنسور
  OTHER = 'other'
}

// Device interface - represents final products made from boards
export interface Device extends BaseEntity {
  name: string;           // Device name
  code: string;           // Device code
  description?: string;   // Device description
  boards: DeviceBoard[];  // List of boards in this device
  totalPrice: number;     // Calculated total price
  assemblyCost?: number;  // Final assembly cost
  markupPercentage?: number; // Final profit margin
  category: DeviceCategory;
  isActive: boolean;
}

// Device board relationship
export interface DeviceBoard {
  boardId: string;        // Reference to Board
  board?: Board;          // Populated board data
  quantity: number;       // How many of this board are used
  notes?: string;         // Optional notes
}

// Device categories
export enum DeviceCategory {
  ACCESS_CONTROL = 'access_control',   // کنترل دسترسی
  SMART_HOME = 'smart_home',           // خانه هوشمند
  SECURITY = 'security',               // امنیتی
  AUTOMATION = 'automation',           // اتوماسیون
  COMMUNICATION = 'communication',     // ارتباطات
  OTHER = 'other'
}

// Price history for tracking price changes
export interface PriceHistory extends BaseEntity {
  entityType: 'component' | 'board' | 'device';
  entityId: string;
  oldPrice: number;
  newPrice: number;
  changeReason?: string;
  changedBy?: string;     // User who made the change
}

// User interface for authentication and authorization
export interface User extends BaseEntity {
  username: string;
  email: string;
  fullName: string;
  role: UserRole;
  isActive: boolean;
}

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
  VIEWER = 'viewer'
}

// API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Pagination interface
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Search and filter interfaces
export interface ComponentFilter {
  category?: ComponentCategory;
  priceMin?: number;
  priceMax?: number;
  isActive?: boolean;
  search?: string;
}

export interface BoardFilter {
  category?: BoardCategory;
  priceMin?: number;
  priceMax?: number;
  isActive?: boolean;
  search?: string;
}

export interface DeviceFilter {
  category?: DeviceCategory;
  priceMin?: number;
  priceMax?: number;
  isActive?: boolean;
  search?: string;
}

// Drag and Drop interfaces for UI
export interface DragItem {
  id: string;
  type: 'component' | 'board';
  data: Component | Board;
}

export interface DropResult {
  targetId: string;
  targetType: 'board' | 'device';
  position?: { x: number; y: number };
}

// Form interfaces
export interface ComponentFormData {
  code: string;
  name: string;
  price: number;
  category: ComponentCategory;
  description?: string;
  specifications?: ComponentSpecifications;
  supplier?: string;
  stockQuantity?: number;
  minOrderQuantity?: number;
}

export interface BoardFormData {
  name: string;
  code: string;
  description?: string;
  category: BoardCategory;
  laborCost?: number;
  markupPercentage?: number;
}

export interface DeviceFormData {
  name: string;
  code: string;
  description?: string;
  category: DeviceCategory;
  assemblyCost?: number;
  markupPercentage?: number;
} 
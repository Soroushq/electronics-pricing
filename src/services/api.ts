/**
 * API Service for Electronics Pricing System
 * سرویس API برای سیستم قیمت‌گذاری قطعات الکترونیکی
 */

// آدرس بک‌اند PHP - این آدرس را مطابق سرور خود تغییر دهید
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/php-second/api';

// تایپ‌های مربوط به API Response
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface PaginationInfo {
  current_page: number;
  total_pages: number;
  total_count: number;
  limit: number;
  has_next: boolean;
  has_prev: boolean;
}

// تایپ‌های داده‌ها
interface Board {
  id: number;
  bcode: string;
  bname: string;
  pcode: string;
  pcount: number;
}

interface Device {
  id: number;
  name: string;
  description?: string;
  board_id: number;
  board_name?: string;
  board_code?: string;
}

interface Part {
  id: number;
  name: string;
  description?: string;
  price: number;
  board_id: number;
  quantity: number;
  board_name?: string;
  board_code?: string;
}

interface Process {
  id: number;
  name: string;
  description?: string;
  device_id: number;
  order_index: number;
  device_name?: string;
  price?: number;
  labor_cost?: number;
  material_cost?: number;
  overhead_cost?: number;
}

interface DevicePricing {
  device: {
    id: number;
    name: string;
    description?: string;
  };
  board: {
    id: number;
    name: string;
    code: string;
    pcode: string;
    pcount: number;
    parts: Array<{
      id: number;
      name: string;
      description?: string;
      unit_price: number;
      quantity: number;
      total_price: number;
    }>;
    total_price: number;
  };
  processes: Array<{
    id: number;
    name: string;
    description?: string;
    order_index: number;
    base_price: number;
    labor_cost: number;
    material_cost: number;
    overhead_cost: number;
    total_price: number;
  }>;
  cost_breakdown: {
    board_cost: number;
    process_cost: number;
    labor_cost: number;
    material_cost: number;
    overhead_cost: number;
  };
  total_price: number;
  currency: string;
  calculated_at: string;
}

// پارامترهای جستجو و فیلتر
interface SearchParams {
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'ASC' | 'DESC';
  board_id?: number;
  device_id?: number;
}

// کلاس اصلی API
class ElectronicsPricingAPI {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // متد کمکی برای ارسال درخواست‌ها
  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}/${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // متد کمکی برای ساخت URL با پارامترها
  private buildUrlWithParams(endpoint: string, params: SearchParams = {}): string {
    const url = new URL(`${this.baseUrl}/${endpoint}`);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      }
    });
    
    return url.pathname + url.search;
  }

  // ===================
  // BOARDS API
  // ===================

  async getBoards(params: SearchParams = {}): Promise<ApiResponse<{
    boards: Board[];
    pagination: PaginationInfo;
  }>> {
    const endpoint = this.buildUrlWithParams('boards.php', params);
    return this.makeRequest(endpoint.replace(`${this.baseUrl}/`, ''));
  }

  async createBoard(data: Omit<Board, 'id'>): Promise<ApiResponse<Board>> {
    return this.makeRequest('boards.php', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateBoard(data: Board): Promise<ApiResponse<Board>> {
    return this.makeRequest('boards.php', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteBoard(id: number): Promise<ApiResponse<{ id: number }>> {
    return this.makeRequest(`boards.php?id=${id}`, {
      method: 'DELETE',
    });
  }

  // ===================
  // DEVICES API
  // ===================

  async getDevices(params: SearchParams = {}): Promise<ApiResponse<{
    devices: Device[];
    pagination: PaginationInfo;
  }>> {
    const endpoint = this.buildUrlWithParams('devices.php', params);
    return this.makeRequest(endpoint.replace(`${this.baseUrl}/`, ''));
  }

  async createDevice(data: Omit<Device, 'id' | 'board_name' | 'board_code'>): Promise<ApiResponse<Device>> {
    return this.makeRequest('devices.php', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateDevice(data: Omit<Device, 'board_name' | 'board_code'>): Promise<ApiResponse<Device>> {
    return this.makeRequest('devices.php', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteDevice(id: number): Promise<ApiResponse<{ id: number }>> {
    return this.makeRequest(`devices.php?id=${id}`, {
      method: 'DELETE',
    });
  }

  // ===================
  // PARTS API
  // ===================

  async getParts(params: SearchParams = {}): Promise<ApiResponse<{
    parts: Part[];
    pagination: PaginationInfo;
  }>> {
    const endpoint = this.buildUrlWithParams('parts.php', params);
    return this.makeRequest(endpoint.replace(`${this.baseUrl}/`, ''));
  }

  async createPart(data: Omit<Part, 'id' | 'board_name' | 'board_code'>): Promise<ApiResponse<Part>> {
    return this.makeRequest('parts.php', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePart(data: Omit<Part, 'board_name' | 'board_code'>): Promise<ApiResponse<Part>> {
    return this.makeRequest('parts.php', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deletePart(id: number): Promise<ApiResponse<{ id: number }>> {
    return this.makeRequest(`parts.php?id=${id}`, {
      method: 'DELETE',
    });
  }

  // ===================
  // PROCESSES API
  // ===================

  async getProcesses(params: SearchParams = {}): Promise<ApiResponse<{
    processes: Process[];
    pagination: PaginationInfo;
  }>> {
    const endpoint = this.buildUrlWithParams('processes.php', params);
    return this.makeRequest(endpoint.replace(`${this.baseUrl}/`, ''));
  }

  async createProcess(data: Omit<Process, 'id' | 'device_name'>): Promise<ApiResponse<Process>> {
    return this.makeRequest('processes.php', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProcess(data: Omit<Process, 'device_name'>): Promise<ApiResponse<Process>> {
    return this.makeRequest('processes.php', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProcess(id: number): Promise<ApiResponse<{ id: number }>> {
    return this.makeRequest(`processes.php?id=${id}`, {
      method: 'DELETE',
    });
  }

  // ===================
  // PRICING API
  // ===================

  async getDevicePricing(deviceId: number): Promise<ApiResponse<DevicePricing>> {
    return this.makeRequest(`pricing.php?device_id=${deviceId}`);
  }

  // ===================
  // UTILITY METHODS
  // ===================

  // تست اتصال API
  async testConnection(): Promise<boolean> {
    try {
      await this.getBoards({ limit: 1 });
      return true;
    } catch (error) {
      console.error('API Connection Test Failed:', error);
      return false;
    }
  }

  // دریافت آمار کلی
  async getStatistics(): Promise<ApiResponse<{
    total_devices: number;
    total_boards: number;
    total_parts: number;
    total_processes: number;
    average_part_price: number;
    total_parts_value: number;
  }>> {
    // این API در فایل pricing.php موجود اما فعال نشده
    // می‌توان آن را فعال کرد یا آمار را از چندین API جمع‌آوری کرد
    const [boards, devices, parts, processes] = await Promise.all([
      this.getBoards({ limit: 1 }),
      this.getDevices({ limit: 1 }),
      this.getParts({ limit: 1 }),
      this.getProcesses({ limit: 1 })
    ]);

    return {
      success: true,
      data: {
        total_boards: boards.data?.pagination.total_count || 0,
        total_devices: devices.data?.pagination.total_count || 0,
        total_parts: parts.data?.pagination.total_count || 0,
        total_processes: processes.data?.pagination.total_count || 0,
        average_part_price: 0, // باید محاسبه شود
        total_parts_value: 0, // باید محاسبه شود
      }
    };
  }
}

// Export types
export type {
  Board,
  Device,
  Part,
  Process,
  DevicePricing,
  SearchParams,
  ApiResponse,
  PaginationInfo
};

// ایجاد instance پیش‌فرض
const api = new ElectronicsPricingAPI();

export { ElectronicsPricingAPI };
export default api; 
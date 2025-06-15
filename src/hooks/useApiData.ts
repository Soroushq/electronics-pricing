import { useState, useEffect, useCallback } from 'react';
import api, { 
  Board, 
  Device, 
  Part, 
  Process, 
  DevicePricing, 
  SearchParams,
  ApiResponse,
  PaginationInfo 
} from '@/services/api';

// Generic hook برای مدیریت data fetching
function useApiData<T>(
  fetchFunction: (params?: SearchParams) => Promise<ApiResponse<{ 
    [key: string]: T[] | unknown;
    pagination: PaginationInfo;
  }>>,
  dataKey: string,
  deps: unknown[] = []
) {
  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (params: SearchParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchFunction(params);
      
             if (response.success && response.data) {
         const responseData = response.data[dataKey];
         setData(Array.isArray(responseData) ? responseData : []);
         setPagination(response.data.pagination);
       } else {
         setError(response.error || 'خطا در دریافت داده‌ها');
       }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در دریافت داده‌ها');
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, dataKey]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...deps]);

  return {
    data,
    pagination,
    loading,
    error,
    refetch: fetchData,
    setData,
    setLoading,
    setError
  };
}

// Hook برای مدیریت بردها
export function useBoards(initialParams: SearchParams = {}) {
  const {
    data: boards,
    pagination,
    loading,
    error,
    refetch,
    setData: setBoards,
    setLoading,
    setError
  } = useApiData<Board>(api.getBoards.bind(api), 'boards', [JSON.stringify(initialParams)]);

  const createBoard = useCallback(async (boardData: Omit<Board, 'id'>) => {
    try {
      setLoading(true);
      const response = await api.createBoard(boardData);
      
      if (response.success && response.data) {
        setBoards(prev => [...prev, response.data!]);
        return response.data;
      } else {
        throw new Error(response.error || 'خطا در ایجاد برد');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در ایجاد برد');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setBoards, setLoading, setError]);

  const updateBoard = useCallback(async (boardData: Board) => {
    try {
      setLoading(true);
      const response = await api.updateBoard(boardData);
      
      if (response.success && response.data) {
        setBoards(prev => prev.map(b => b.id === boardData.id ? response.data! : b));
        return response.data;
      } else {
        throw new Error(response.error || 'خطا در به‌روزرسانی برد');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در به‌روزرسانی برد');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setBoards, setLoading, setError]);

  const deleteBoard = useCallback(async (id: number) => {
    try {
      setLoading(true);
      const response = await api.deleteBoard(id);
      
      if (response.success) {
        setBoards(prev => prev.filter(b => b.id !== id));
        return true;
      } else {
        throw new Error(response.error || 'خطا در حذف برد');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در حذف برد');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setBoards, setLoading, setError]);

  return {
    boards,
    pagination,
    loading,
    error,
    refetch,
    createBoard,
    updateBoard,
    deleteBoard
  };
}

// Hook برای مدیریت دستگاه‌ها
export function useDevices(initialParams: SearchParams = {}) {
  const {
    data: devices,
    pagination,
    loading,
    error,
    refetch,
    setData: setDevices,
    setLoading,
    setError
  } = useApiData<Device>(api.getDevices.bind(api), 'devices', [JSON.stringify(initialParams)]);

  const createDevice = useCallback(async (deviceData: Omit<Device, 'id' | 'board_name' | 'board_code'>) => {
    try {
      setLoading(true);
      const response = await api.createDevice(deviceData);
      
      if (response.success && response.data) {
        setDevices(prev => [...prev, response.data!]);
        return response.data;
      } else {
        throw new Error(response.error || 'خطا در ایجاد دستگاه');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در ایجاد دستگاه');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setDevices, setLoading, setError]);

  const updateDevice = useCallback(async (deviceData: Omit<Device, 'board_name' | 'board_code'>) => {
    try {
      setLoading(true);
      const response = await api.updateDevice(deviceData);
      
      if (response.success && response.data) {
        setDevices(prev => prev.map(d => d.id === deviceData.id ? response.data! : d));
        return response.data;
      } else {
        throw new Error(response.error || 'خطا در به‌روزرسانی دستگاه');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در به‌روزرسانی دستگاه');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setDevices, setLoading, setError]);

  const deleteDevice = useCallback(async (id: number) => {
    try {
      setLoading(true);
      const response = await api.deleteDevice(id);
      
      if (response.success) {
        setDevices(prev => prev.filter(d => d.id !== id));
        return true;
      } else {
        throw new Error(response.error || 'خطا در حذف دستگاه');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در حذف دستگاه');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setDevices, setLoading, setError]);

  return {
    devices,
    pagination,
    loading,
    error,
    refetch,
    createDevice,
    updateDevice,
    deleteDevice
  };
}

// Hook برای مدیریت قطعات
export function useParts(initialParams: SearchParams = {}) {
  const {
    data: parts,
    pagination,
    loading,
    error,
    refetch,
    setData: setParts,
    setLoading,
    setError
  } = useApiData<Part>(api.getParts.bind(api), 'parts', [JSON.stringify(initialParams)]);

  const createPart = useCallback(async (partData: Omit<Part, 'id' | 'board_name' | 'board_code'>) => {
    try {
      setLoading(true);
      const response = await api.createPart(partData);
      
      if (response.success && response.data) {
        setParts(prev => [...prev, response.data!]);
        return response.data;
      } else {
        throw new Error(response.error || 'خطا در ایجاد قطعه');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در ایجاد قطعه');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setParts, setLoading, setError]);

  const updatePart = useCallback(async (partData: Omit<Part, 'board_name' | 'board_code'>) => {
    try {
      setLoading(true);
      const response = await api.updatePart(partData);
      
      if (response.success && response.data) {
        setParts(prev => prev.map(p => p.id === partData.id ? response.data! : p));
        return response.data;
      } else {
        throw new Error(response.error || 'خطا در به‌روزرسانی قطعه');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در به‌روزرسانی قطعه');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setParts, setLoading, setError]);

  const deletePart = useCallback(async (id: number) => {
    try {
      setLoading(true);
      const response = await api.deletePart(id);
      
      if (response.success) {
        setParts(prev => prev.filter(p => p.id !== id));
        return true;
      } else {
        throw new Error(response.error || 'خطا در حذف قطعه');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در حذف قطعه');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setParts, setLoading, setError]);

  return {
    parts,
    pagination,
    loading,
    error,
    refetch,
    createPart,
    updatePart,
    deletePart
  };
}

// Hook برای مدیریت پردازش‌ها
export function useProcesses(initialParams: SearchParams = {}) {
  const {
    data: processes,
    pagination,
    loading,
    error,
    refetch,
    setData: setProcesses,
    setLoading,
    setError
  } = useApiData<Process>(api.getProcesses.bind(api), 'processes', [JSON.stringify(initialParams)]);

  const createProcess = useCallback(async (processData: Omit<Process, 'id' | 'device_name'>) => {
    try {
      setLoading(true);
      const response = await api.createProcess(processData);
      
      if (response.success && response.data) {
        setProcesses(prev => [...prev, response.data!]);
        return response.data;
      } else {
        throw new Error(response.error || 'خطا در ایجاد پردازش');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در ایجاد پردازش');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setProcesses, setLoading, setError]);

  const updateProcess = useCallback(async (processData: Omit<Process, 'device_name'>) => {
    try {
      setLoading(true);
      const response = await api.updateProcess(processData);
      
      if (response.success && response.data) {
        setProcesses(prev => prev.map(p => p.id === processData.id ? response.data! : p));
        return response.data;
      } else {
        throw new Error(response.error || 'خطا در به‌روزرسانی پردازش');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در به‌روزرسانی پردازش');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setProcesses, setLoading, setError]);

  const deleteProcess = useCallback(async (id: number) => {
    try {
      setLoading(true);
      const response = await api.deleteProcess(id);
      
      if (response.success) {
        setProcesses(prev => prev.filter(p => p.id !== id));
        return true;
      } else {
        throw new Error(response.error || 'خطا در حذف پردازش');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در حذف پردازش');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setProcesses, setLoading, setError]);

  return {
    processes,
    pagination,
    loading,
    error,
    refetch,
    createProcess,
    updateProcess,
    deleteProcess
  };
}

// Hook برای قیمت‌گذاری
export function useDevicePricing(deviceId: number | null) {
  const [pricing, setPricing] = useState<DevicePricing | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPricing = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getDevicePricing(id);
      
      if (response.success && response.data) {
        setPricing(response.data);
      } else {
        setError(response.error || 'خطا در محاسبه قیمت');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در محاسبه قیمت');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (deviceId) {
      fetchPricing(deviceId);
    }
  }, [deviceId, fetchPricing]);

  return {
    pricing,
    loading,
    error,
    refetch: deviceId ? () => fetchPricing(deviceId) : () => {}
  };
}

// Hook برای تست اتصال API
export function useApiConnection() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [testing, setTesting] = useState(false);

     const testConnection = useCallback(async () => {
     try {
       setTesting(true);
       const connected = await api.testConnection();
       setIsConnected(connected);
       return connected;
     } catch {
       setIsConnected(false);
       return false;
     } finally {
       setTesting(false);
     }
   }, []);

  useEffect(() => {
    testConnection();
  }, [testConnection]);

  return {
    isConnected,
    testing,
    testConnection
  };
} 
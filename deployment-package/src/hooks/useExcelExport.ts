import { useCallback } from 'react';
import * as XLSX from 'xlsx';

/**
 * Types for Excel Export
 */
export interface ExcelPartItem {
  partCode: string;
  partName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category?: string;
  supplier?: string;
  usedIn?: string; // Which board/device this part is used in
}

export interface ExcelBoardItem {
  boardCode: string;
  boardName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  partsCount: number;
  usedInDevice?: string;
}

export interface ExcelDeviceItem {
  deviceCode: string;
  deviceName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  boardsCount: number;
  partsCount: number;
}

export interface ExcelOrderSummary {
  orderDate: string;
  orderNumber: string;
  customerName?: string;
  totalDevices: number;
  totalBoards: number;
  totalParts: number;
  totalUniqueDevices: number;
  totalUniqueBoards: number;
  totalUniqueParts: number;
  grandTotal: number;
}

export interface ExcelExportData {
  summary: ExcelOrderSummary;
  devices?: ExcelDeviceItem[];
  boards?: ExcelBoardItem[];
  parts: ExcelPartItem[];
}

// Order item interfaces based on existing pages
export interface PartsOrderItem {
  partId: string;
  name: string;
  partNumber: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  category: string;
}

export interface BoardPart {
  partId: string;
  name: string;
  partNumber: string;
  unitPrice: number;
  quantity: number;
}

export interface BoardsOrderItem {
  boardId: string;
  name: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  parts: BoardPart[];
}

export interface BoardBOMItem {
  partId: string;
  name: string;
  partNumber: string;
  unitPrice: number;
  totalQuantity: number;
  totalCost: number;
  usedInBoards: string[];
}

export interface DeviceBoard {
  boardId: string;
  name: string;
  quantity: number;
  unitCost: number;
  parts: BoardPart[];
}

export interface DevicesOrderItem {
  deviceId: string;
  name: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  boards: DeviceBoard[];
}

export interface DeviceBoardBOMItem {
  boardId: string;
  name: string;
  totalQuantity: number;
  unitCost: number;
  totalCost: number;
  usedInDevices: string[];
}

export interface DevicePartBOMItem {
  partId: string;
  name: string;
  partNumber: string;
  unitPrice: number;
  totalQuantity: number;
  totalCost: number;
  usedInBoards: string[];
}

/**
 * Hook for Excel Export functionality
 */
export const useExcelExport = () => {
  
  /**
   * Export order data to Excel file
   */
  const exportToExcel = useCallback((data: ExcelExportData, filename?: string) => {
    try {
      // Create a new workbook
      const workbook = XLSX.utils.book_new();
      
      // 1. Summary Sheet
      const summaryData = [
        ['گزارش سفارش الکترونیک', '', '', ''],
        ['', '', '', ''],
        ['شماره سفارش', data.summary.orderNumber, '', ''],
        ['تاریخ سفارش', data.summary.orderDate, '', ''],
        ['نام مشتری', data.summary.customerName || 'نامشخص', '', ''],
        ['', '', '', ''],
        ['خلاصه سفارش', '', '', ''],
        ['انواع دستگاه', data.summary.totalUniqueDevices, 'مجموع دستگاه‌ها', data.summary.totalDevices],
        ['انواع برد', data.summary.totalUniqueBoards, 'مجموع بردها', data.summary.totalBoards],
        ['انواع قطعه', data.summary.totalUniqueParts, 'مجموع قطعات', data.summary.totalParts],
        ['', '', '', ''],
        ['مبلغ کل (ریال)', data.summary.grandTotal.toLocaleString('fa-IR'), '', '']
      ];
      
      const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
      
      // Set column widths for summary
      summarySheet['!cols'] = [
        { width: 20 }, { width: 20 }, { width: 20 }, { width: 20 }
      ];
      
      XLSX.utils.book_append_sheet(workbook, summarySheet, 'خلاصه سفارش');
      
      // 2. Devices Sheet (if devices exist)
      if (data.devices && data.devices.length > 0) {
        const deviceHeaders = ['کد دستگاه', 'نام دستگاه', 'تعداد', 'قیمت واحد (ریال)', 'قیمت کل (ریال)', 'تعداد بردها', 'تعداد قطعات'];
        const deviceRows = data.devices.map(device => [
          device.deviceCode,
          device.deviceName,
          device.quantity,
          device.unitPrice.toLocaleString('fa-IR'),
          device.totalPrice.toLocaleString('fa-IR'),
          device.boardsCount,
          device.partsCount
        ]);
        
        // Add total row
        const deviceTotal = data.devices.reduce((sum, device) => sum + device.totalPrice, 0);
        deviceRows.push([
          '', 'مجموع کل', '', '', deviceTotal.toLocaleString('fa-IR'), '', ''
        ]);
        
        const deviceSheetData = [deviceHeaders, ...deviceRows];
        const deviceSheet = XLSX.utils.aoa_to_sheet(deviceSheetData);
        
        // Set column widths
        deviceSheet['!cols'] = [
          { width: 15 }, { width: 25 }, { width: 10 }, { width: 18 }, { width: 18 }, { width: 12 }, { width: 12 }
        ];
        
        XLSX.utils.book_append_sheet(workbook, deviceSheet, 'لیست دستگاه‌ها');
      }
      
      // 3. Boards Sheet (if boards exist)
      if (data.boards && data.boards.length > 0) {
        const boardHeaders = ['کد برد', 'نام برد', 'تعداد', 'قیمت واحد (ریال)', 'قیمت کل (ریال)', 'تعداد قطعات', 'استفاده در'];
        const boardRows = data.boards.map(board => [
          board.boardCode,
          board.boardName,
          board.quantity,
          board.unitPrice.toLocaleString('fa-IR'),
          board.totalPrice.toLocaleString('fa-IR'),
          board.partsCount,
          board.usedInDevice || ''
        ]);
        
        // Add total row
        const boardTotal = data.boards.reduce((sum, board) => sum + board.totalPrice, 0);
        boardRows.push([
          '', 'مجموع کل', '', '', boardTotal.toLocaleString('fa-IR'), '', ''
        ]);
        
        const boardSheetData = [boardHeaders, ...boardRows];
        const boardSheet = XLSX.utils.aoa_to_sheet(boardSheetData);
        
        // Set column widths
        boardSheet['!cols'] = [
          { width: 15 }, { width: 25 }, { width: 10 }, { width: 18 }, { width: 18 }, { width: 12 }, { width: 20 }
        ];
        
        XLSX.utils.book_append_sheet(workbook, boardSheet, 'لیست بردها');
      }
      
      // 4. Parts Sheet (Main requirement)
      const partHeaders = ['کد قطعه', 'نام قطعه', 'تعداد', 'قیمت واحد (ریال)', 'قیمت کل (ریال)', 'دسته‌بندی', 'تامین‌کننده', 'استفاده در'];
      const partRows = data.parts.map(part => [
        part.partCode,
        part.partName,
        part.quantity,
        part.unitPrice.toLocaleString('fa-IR'),
        part.totalPrice.toLocaleString('fa-IR'),
        part.category || '',
        part.supplier || '',
        part.usedIn || ''
      ]);
      
      // Add total row for parts
      const partTotal = data.parts.reduce((sum, part) => sum + part.totalPrice, 0);
      const totalPartsCount = data.parts.reduce((sum, part) => sum + part.quantity, 0);
      
      partRows.push([
        '', 'مجموع کل', totalPartsCount, '', partTotal.toLocaleString('fa-IR'), '', '', ''
      ]);
      
      const partSheetData = [partHeaders, ...partRows];
      const partSheet = XLSX.utils.aoa_to_sheet(partSheetData);
      
      // Set column widths for parts sheet
      partSheet['!cols'] = [
        { width: 15 }, { width: 30 }, { width: 10 }, { width: 18 }, { width: 18 }, { width: 15 }, { width: 15 }, { width: 25 }
      ];
      
      XLSX.utils.book_append_sheet(workbook, partSheet, 'لیست قطعات');
      
      // Generate filename if not provided
      const finalFilename = filename || `سفارش_${data.summary.orderNumber}_${new Date().toLocaleDateString('fa-IR').replace(/\//g, '-')}.xlsx`;
      
      // Write and download the file
      XLSX.writeFile(workbook, finalFilename);
      
      return true;
    } catch (error) {
      console.error('خطا در تولید فایل اکسل:', error);
      return false;
    }
  }, []);
  
  /**
   * Convert parts order to Excel format
   */
  const exportPartsOrder = useCallback((orderItems: PartsOrderItem[], orderNumber?: string) => {
    const summary: ExcelOrderSummary = {
      orderDate: new Date().toLocaleDateString('fa-IR'),
      orderNumber: orderNumber || `P-${Date.now()}`,
      totalDevices: 0,
      totalBoards: 0,
      totalParts: orderItems.reduce((sum, item) => sum + item.quantity, 0),
      totalUniqueDevices: 0,
      totalUniqueBoards: 0,
      totalUniqueParts: orderItems.length,
      grandTotal: orderItems.reduce((sum, item) => sum + item.totalPrice, 0)
    };
    
    const parts: ExcelPartItem[] = orderItems.map(item => ({
      partCode: item.partNumber,
      partName: item.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice,
      category: item.category,
      usedIn: 'سفارش مستقل قطعات'
    }));
    
    const data: ExcelExportData = {
      summary,
      parts
    };
    
    return exportToExcel(data, `سفارش_قطعات_${summary.orderNumber}.xlsx`);
  }, [exportToExcel]);
  
  /**
   * Convert boards order to Excel format
   */
  const exportBoardsOrder = useCallback((orderItems: BoardsOrderItem[], bomItems: BoardBOMItem[], orderNumber?: string) => {
    const summary: ExcelOrderSummary = {
      orderDate: new Date().toLocaleDateString('fa-IR'),
      orderNumber: orderNumber || `B-${Date.now()}`,
      totalDevices: 0,
      totalBoards: orderItems.reduce((sum, item) => sum + item.quantity, 0),
      totalParts: bomItems.reduce((sum, item) => sum + item.totalQuantity, 0),
      totalUniqueDevices: 0,
      totalUniqueBoards: orderItems.length,
      totalUniqueParts: bomItems.length,
      grandTotal: orderItems.reduce((sum, item) => sum + item.totalCost, 0)
    };
    
    const boards: ExcelBoardItem[] = orderItems.map(item => ({
      boardCode: `BRD-${item.boardId}`,
      boardName: item.name,
      quantity: item.quantity,
      unitPrice: item.unitCost,
      totalPrice: item.totalCost,
      partsCount: item.parts.length,
      usedInDevice: 'سفارش مستقل برد'
    }));
    
    const parts: ExcelPartItem[] = bomItems.map(item => ({
      partCode: item.partNumber,
      partName: item.name,
      quantity: item.totalQuantity,
      unitPrice: item.unitPrice,
      totalPrice: item.totalCost,
      usedIn: item.usedInBoards.join(', ')
    }));
    
    const data: ExcelExportData = {
      summary,
      boards,
      parts
    };
    
    return exportToExcel(data, `سفارش_بردها_${summary.orderNumber}.xlsx`);
  }, [exportToExcel]);
  
  /**
   * Convert devices order to Excel format
   */
  const exportDevicesOrder = useCallback((
    orderItems: DevicesOrderItem[], 
    boardBOM: DeviceBoardBOMItem[], 
    partBOM: DevicePartBOMItem[], 
    orderNumber?: string
  ) => {
    const summary: ExcelOrderSummary = {
      orderDate: new Date().toLocaleDateString('fa-IR'),
      orderNumber: orderNumber || `D-${Date.now()}`,
      totalDevices: orderItems.reduce((sum, item) => sum + item.quantity, 0),
      totalBoards: boardBOM.reduce((sum, item) => sum + item.totalQuantity, 0),
      totalParts: partBOM.reduce((sum, item) => sum + item.totalQuantity, 0),
      totalUniqueDevices: orderItems.length,
      totalUniqueBoards: boardBOM.length,
      totalUniqueParts: partBOM.length,
      grandTotal: orderItems.reduce((sum, item) => sum + item.totalCost, 0)
    };
    
    const devices: ExcelDeviceItem[] = orderItems.map(item => ({
      deviceCode: `DEV-${item.deviceId}`,
      deviceName: item.name,
      quantity: item.quantity,
      unitPrice: item.unitCost,
      totalPrice: item.totalCost,
      boardsCount: item.boards.length,
      partsCount: item.boards.reduce((sum: number, board: DeviceBoard) => sum + board.parts.length, 0)
    }));
    
    const boards: ExcelBoardItem[] = boardBOM.map(item => ({
      boardCode: `BRD-${item.boardId}`,
      boardName: item.name,
      quantity: item.totalQuantity,
      unitPrice: item.unitCost,
      totalPrice: item.totalCost,
      partsCount: 0, // Will be calculated from parts
      usedInDevice: item.usedInDevices.join(', ')
    }));
    
    const parts: ExcelPartItem[] = partBOM.map(item => ({
      partCode: item.partNumber,
      partName: item.name,
      quantity: item.totalQuantity,
      unitPrice: item.unitPrice,
      totalPrice: item.totalCost,
      usedIn: item.usedInBoards.join(', ')
    }));
    
    const data: ExcelExportData = {
      summary,
      devices,
      boards,
      parts
    };
    
    return exportToExcel(data, `سفارش_دستگاه‌ها_${summary.orderNumber}.xlsx`);
  }, [exportToExcel]);
  
  return {
    exportToExcel,
    exportPartsOrder,
    exportBoardsOrder,
    exportDevicesOrder
  };
};

export default useExcelExport; 
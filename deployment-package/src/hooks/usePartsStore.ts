import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { 
  Part, 
  PartCategory, 
  PartUnit, 
  Supplier, 
  PartFilters, 
  PartSortOptions,
  PartImportResult,
  CSVImportOptions
} from '@/types/parts';

// Helper functions for generating IDs
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

interface PartsState {
  // Data
  parts: Part[];
  categories: PartCategory[];
  units: PartUnit[];
  suppliers: Supplier[];
  
  // UI State
  selectedPart: Part | null;
  isLoading: boolean;
  error: string | null;
  
  // Filters and Search
  filters: PartFilters;
  sortOptions: PartSortOptions;
  searchTerm: string;
  
  // Pagination
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  
  // Modal states
  isAddModalOpen: boolean;
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;
  isImportModalOpen: boolean;
}

interface PartsActions {
  // Parts CRUD
  addPart: (part: Omit<Part, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePart: (id: string, updates: Partial<Part>) => void;
  deletePart: (id: string) => void;
  duplicatePart: (id: string) => void;
  
  // Categories CRUD
  addCategory: (category: Omit<PartCategory, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCategory: (id: string, updates: Partial<PartCategory>) => void;
  deleteCategory: (id: string) => void;
  
  // Suppliers CRUD
  addSupplier: (supplier: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateSupplier: (id: string, updates: Partial<Supplier>) => void;
  deleteSupplier: (id: string) => void;
  
  // Selection and UI
  selectPart: (part: Part | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Search and Filters
  setSearchTerm: (term: string) => void;
  setFilters: (filters: Partial<PartFilters>) => void;
  clearFilters: () => void;
  setSortOptions: (options: PartSortOptions) => void;
  
  // Pagination
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  
  // Modal controls
  openAddModal: () => void;
  closeAddModal: () => void;
  openEditModal: (part: Part) => void;
  closeEditModal: () => void;
  openDeleteModal: (part: Part) => void;
  closeDeleteModal: () => void;
  openImportModal: () => void;
  closeImportModal: () => void;
  
  // Import/Export
  importFromCSV: (options: CSVImportOptions) => Promise<PartImportResult>;
  exportParts: (format: 'csv' | 'excel', filters?: PartFilters) => void;
  
  // Utility functions
  getFilteredParts: () => Part[];
  getSortedParts: (parts: Part[]) => Part[];
  getPaginatedParts: () => Part[];
  getLowStockParts: () => Part[];
  getPartsByCategory: (categoryId: string) => Part[];
  getPartsBySupplier: (supplierId: string) => Part[];
  
  // Initialize with sample data
  initializeSampleData: () => void;
}

type PartsStore = PartsState & PartsActions;

// Initial state
const initialState: PartsState = {
  parts: [],
  categories: [],
  units: [],
  suppliers: [],
  selectedPart: null,
  isLoading: false,
  error: null,
  filters: {},
  sortOptions: { field: 'name', direction: 'asc' },
  searchTerm: '',
  currentPage: 1,
  itemsPerPage: 20,
  totalItems: 0,
  isAddModalOpen: false,
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  isImportModalOpen: false,
};

export const usePartsStore = create<PartsStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Parts CRUD
      addPart: (partData: Omit<Part, 'id' | 'createdAt' | 'updatedAt'>) => {
        const newPart: Part = {
          ...partData,
          id: generateId(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        set((state: PartsState) => ({
          parts: [...state.parts, newPart],
          totalItems: state.parts.length + 1,
        }));
      },

      updatePart: (id: string, updates: Partial<Part>) => {
        set((state: PartsState) => ({
          parts: state.parts.map((part) =>
            part.id === id
              ? { ...part, ...updates, updatedAt: new Date() }
              : part
          ),
        }));
      },

      deletePart: (id: string) => {
        set((state: PartsState) => ({
          parts: state.parts.filter((part) => part.id !== id),
          totalItems: state.parts.length - 1,
          selectedPart: state.selectedPart?.id === id ? null : state.selectedPart,
        }));
      },

      duplicatePart: (id: string) => {
        const part = get().parts.find((p) => p.id === id);
        if (part) {
          const duplicatedPart: Part = {
            ...part,
            id: generateId(),
            name: `${part.name} (کپی)`,
            partNumber: `${part.partNumber}-COPY`,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          set((state: PartsState) => ({
            parts: [...state.parts, duplicatedPart],
            totalItems: state.parts.length + 1,
          }));
        }
      },

      // Categories CRUD
      addCategory: (categoryData: Omit<PartCategory, 'id' | 'createdAt' | 'updatedAt'>) => {
        const newCategory: PartCategory = {
          ...categoryData,
          id: generateId(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        set((state: PartsState) => ({
          categories: [...state.categories, newCategory],
        }));
      },

      updateCategory: (id: string, updates: Partial<PartCategory>) => {
        set((state: PartsState) => ({
          categories: state.categories.map((category) =>
            category.id === id
              ? { ...category, ...updates, updatedAt: new Date() }
              : category
          ),
        }));
      },

      deleteCategory: (id: string) => {
        set((state: PartsState) => ({
          categories: state.categories.filter((category) => category.id !== id),
        }));
      },

      // Suppliers CRUD
      addSupplier: (supplierData: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>) => {
        const newSupplier: Supplier = {
          ...supplierData,
          id: generateId(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        set((state: PartsState) => ({
          suppliers: [...state.suppliers, newSupplier],
        }));
      },

      updateSupplier: (id: string, updates: Partial<Supplier>) => {
        set((state: PartsState) => ({
          suppliers: state.suppliers.map((supplier) =>
            supplier.id === id
              ? { ...supplier, ...updates, updatedAt: new Date() }
              : supplier
          ),
        }));
      },

      deleteSupplier: (id: string) => {
        set((state: PartsState) => ({
          suppliers: state.suppliers.filter((supplier) => supplier.id !== id),
        }));
      },

      // Selection and UI
      selectPart: (part: Part | null) => set({ selectedPart: part }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setError: (error: string | null) => set({ error }),

      // Search and Filters
      setSearchTerm: (term: string) => set({ searchTerm: term, currentPage: 1 }),
      
      setFilters: (newFilters: Partial<PartFilters>) => {
        set((state: PartsState) => ({
          filters: { ...state.filters, ...newFilters },
          currentPage: 1,
        }));
      },

      clearFilters: () => {
        set({
          filters: {},
          searchTerm: '',
          currentPage: 1,
        });
      },

      setSortOptions: (options: PartSortOptions) => set({ sortOptions: options }),

      // Pagination
      setCurrentPage: (page: number) => set({ currentPage: page }),
      setItemsPerPage: (items: number) => set({ itemsPerPage: items, currentPage: 1 }),

      // Modal controls
      openAddModal: () => set({ isAddModalOpen: true }),
      closeAddModal: () => set({ isAddModalOpen: false }),
      
      openEditModal: (part: Part) => set({ 
        isEditModalOpen: true, 
        selectedPart: part 
      }),
      closeEditModal: () => set({ 
        isEditModalOpen: false, 
        selectedPart: null 
      }),
      
      openDeleteModal: (part: Part) => set({ 
        isDeleteModalOpen: true, 
        selectedPart: part 
      }),
      closeDeleteModal: () => set({ 
        isDeleteModalOpen: false, 
        selectedPart: null 
      }),
      
      openImportModal: () => set({ isImportModalOpen: true }),
      closeImportModal: () => set({ isImportModalOpen: false }),

      // Utility functions
      getFilteredParts: () => {
        const { parts, filters, searchTerm } = get();
        
        return parts.filter((part) => {
          // Search term filter
          if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            if (
              !part.name.toLowerCase().includes(searchLower) &&
              !part.partNumber.toLowerCase().includes(searchLower) &&
              !part.description?.toLowerCase().includes(searchLower) &&
              !part.tags.some(tag => tag.toLowerCase().includes(searchLower))
            ) {
              return false;
            }
          }

          // Category filter
          if (filters.categoryIds?.length && !filters.categoryIds.includes(part.categoryId)) {
            return false;
          }

          // Supplier filter
          if (filters.supplierIds?.length && part.supplierId && !filters.supplierIds.includes(part.supplierId)) {
            return false;
          }

          // Price range filter
          if (filters.priceRange) {
            if (filters.priceRange.min && part.currentPrice < filters.priceRange.min) {
              return false;
            }
            if (filters.priceRange.max && part.currentPrice > filters.priceRange.max) {
              return false;
            }
          }

          // Stock range filter
          if (filters.stockRange) {
            if (filters.stockRange.min && part.stockQuantity < filters.stockRange.min) {
              return false;
            }
            if (filters.stockRange.max && part.stockQuantity > filters.stockRange.max) {
              return false;
            }
          }

          // Active filter
          if (filters.isActive !== undefined && part.isActive !== filters.isActive) {
            return false;
          }

          // Obsolete filter
          if (filters.isObsolete !== undefined && part.isObsolete !== filters.isObsolete) {
            return false;
          }

          // Low stock filter
          if (filters.hasLowStock && part.stockQuantity >= part.minStockLevel) {
            return false;
          }

          // Tags filter
          if (filters.tags?.length) {
            const hasMatchingTag = filters.tags.some(tag => 
              part.tags.includes(tag)
            );
            if (!hasMatchingTag) {
              return false;
            }
          }

          return true;
        });
      },

      getSortedParts: (parts: Part[]) => {
        const { sortOptions } = get();
        
        return [...parts].sort((a, b) => {
          const aValue = a[sortOptions.field];
          const bValue = b[sortOptions.field];
          
          let comparison = 0;
          
          if (aValue < bValue) {
            comparison = -1;
          } else if (aValue > bValue) {
            comparison = 1;
          }
          
          return sortOptions.direction === 'desc' ? -comparison : comparison;
        });
      },

      getPaginatedParts: () => {
        const { currentPage, itemsPerPage } = get();
        const filteredParts = get().getFilteredParts();
        const sortedParts = get().getSortedParts(filteredParts);
        
        // Update total items
        set({ totalItems: sortedParts.length });
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        
        return sortedParts.slice(startIndex, endIndex);
      },

      getLowStockParts: () => {
        return get().parts.filter(part => 
          part.stockQuantity < part.minStockLevel && part.isActive
        );
      },

      getPartsByCategory: (categoryId: string) => {
        return get().parts.filter(part => part.categoryId === categoryId);
      },

      getPartsBySupplier: (supplierId: string) => {
        return get().parts.filter(part => part.supplierId === supplierId);
      },

      // Import/Export (placeholder implementations)
      importFromCSV: async (options: CSVImportOptions) => {
        // This would be implemented with actual CSV parsing logic
        // The options parameter will be used when implementing the real CSV import
        console.log('CSV import options:', options);
        set({ isLoading: true });
        
        try {
          // Simulate import process
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          const result: PartImportResult = {
            totalRows: 0,
            successfulImports: 0,
            failedImports: 0,
            errors: [],
            importedParts: [],
          };
          
          set({ isLoading: false });
          return result;
        } catch (error) {
          set({ isLoading: false, error: 'خطا در وارد کردن فایل CSV' });
          throw error;
        }
      },

      exportParts: (format: 'csv' | 'excel', filters?: PartFilters) => {
        // This would be implemented with actual export logic
        const parts = filters ? get().getFilteredParts() : get().parts;
        console.log(`Exporting ${parts.length} parts in ${format} format`);
      },

      // Initialize with sample data
      initializeSampleData: () => {
        try {
          const sampleUnits: PartUnit[] = [
            { id: '1', name: 'عدد', nameEn: 'Piece', symbol: 'pcs', type: 'quantity' },
            { id: '2', name: 'متر', nameEn: 'Meter', symbol: 'm', type: 'length' },
            { id: '3', name: 'کیلوگرم', nameEn: 'Kilogram', symbol: 'kg', type: 'weight' },
          ];

          const sampleCategories: PartCategory[] = [
            {
              id: '1',
              name: 'مقاومت‌ها',
              nameEn: 'Resistors',
              description: 'مقاومت‌های الکترونیکی',
              color: '#3b82f6',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: '2', 
              name: 'خازن‌ها',
              nameEn: 'Capacitors',
              description: 'خازن‌های الکترونیکی',
              color: '#10b981',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: '3',
              name: 'آی‌سی‌ها', 
              nameEn: 'ICs',
              description: 'مدارهای مجتمع',
              color: '#8b5cf6',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ];

          const sampleSuppliers: Supplier[] = [
            {
              id: '1',
              name: 'تامین‌کننده الکترونیک پارس',
              contactPerson: 'احمد محمدی',
              phone: '021-12345678',
              email: 'info@parselectronic.com',
              isActive: true,
              rating: 4.5,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ];

          const sampleParts: Part[] = [
            {
              id: '1',
              name: 'مقاومت ۱۰ کیلو اهم',
              nameEn: '10k Ohm Resistor',
              partNumber: 'R-10K-01',
              description: 'مقاومت کربنی ۱۰ کیلو اهم با تلرانس ۵٪',
              categoryId: '1',
              unitId: '1',
              currentPrice: 500,
              currency: 'ریال',
              stockQuantity: 1500,
              minStockLevel: 100,
              maxStockLevel: 5000,
              supplierId: '1',
              specifications: [
                { name: 'مقاومت', value: '10', unit: 'kΩ' },
                { name: 'تلرانس', value: '5', unit: '%' },
                { name: 'توان', value: '0.25', unit: 'W' }
              ],
              images: [],
              isActive: true,
              isObsolete: false,
              alternativeParts: [],
              tags: ['مقاومت', 'کربنی', '10k'],
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: '2',
              name: 'خازن ۱۰۰ میکروفاراد',
              nameEn: '100µF Capacitor',
              partNumber: 'C-100UF-16V',
              description: 'خازن الکترولیتی ۱۰۰ میکروفاراد ۱۶ ولت',
              categoryId: '2',
              unitId: '1',
              currentPrice: 2000,
              currency: 'ریال',
              stockQuantity: 50,
              minStockLevel: 100,
              maxStockLevel: 1000,
              supplierId: '1',
              specifications: [
                { name: 'ظرفیت', value: '100', unit: 'µF' },
                { name: 'ولتاژ', value: '16', unit: 'V' },
                { name: 'نوع', value: 'الکترولیتی', unit: '' }
              ],
              images: [],
              isActive: true,
              isObsolete: false,
              alternativeParts: [],
              tags: ['خازن', 'الکترولیتی', '100uf'],
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: '3',
              name: 'آی‌سی تقویت‌کننده LM358',
              nameEn: 'LM358 Op-Amp IC',
              partNumber: 'IC-LM358-DIP8',
              description: 'آی‌سی تقویت‌کننده عملیاتی دو کانال LM358 در پکیج DIP-8',
              categoryId: '3',
              unitId: '1',
              currentPrice: 8000,
              currency: 'ریال',
              stockQuantity: 200,
              minStockLevel: 50,
              maxStockLevel: 500,
              supplierId: '1',
              specifications: [
                { name: 'نوع', value: 'Op-Amp', unit: '' },
                { name: 'کانال‌ها', value: '2', unit: '' },
                { name: 'پکیج', value: 'DIP-8', unit: '' },
                { name: 'ولتاژ تغذیه', value: '3-32', unit: 'V' }
              ],
              images: [],
              isActive: true,
              isObsolete: false,
              alternativeParts: [],
              tags: ['IC', 'opamp', 'LM358', 'تقویت‌کننده'],
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ];

          set({
            units: sampleUnits,
            categories: sampleCategories,
            suppliers: sampleSuppliers,
            parts: sampleParts,
            totalItems: sampleParts.length,
          });

          console.log('Sample data initialized successfully:', {
            units: sampleUnits.length,
            categories: sampleCategories.length,
            suppliers: sampleSuppliers.length,
            parts: sampleParts.length,
          });
        } catch (error) {
          console.error('Error initializing sample data:', error);
          set({ error: 'خطا در بارگذاری داده‌های نمونه' });
        }
      },
    }),
    {
      name: 'parts-store',
    }
  )
); 
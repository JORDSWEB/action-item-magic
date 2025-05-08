// Mock data for users
export const mockUsers = getUsers();

// Mock data for products
export const mockProducts = getProducts();

// Mock data for stock in
export const mockStockIn = getStockIn();

// Helper function to add a new user (for signup functionality)
export const addUser = (username: string, password: string, userType: string) => {
  const users = getUsers();
  const newId = users.length > 0 ? Math.max(...users.map((user: any) => user.id)) + 1 : 1;
  const newUser = {
    id: newId,
    username,
    password,
    userType,
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
};

// Initialize localStorage with mock data if it doesn't exist
const initializeLocalStorage = () => {
  // Users
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([
      {
        id: 1,
        username: "owner",
        password: "owner123",
        userType: "owner",
      },
      {
        id: 2,
        username: "worker",
        password: "worker123",
        userType: "worker",
      },
    ]));
  }

  // Products
  if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify([
      {
        id: 1,
        productName: "Sina Gerard Small",
        buyUnitPrice: 250.0,
        saleUnitPrice: 300.0,
      },
      {
        id: 2,
        productName: "Sina Gerard Big",
        buyUnitPrice: 450.0,
        saleUnitPrice: 550.0,
      },
      {
        id: 3,
        productName: "AZAM Industries",
        buyUnitPrice: 350.0,
        saleUnitPrice: 420.0,
      },
      {
        id: 4,
        productName: "Energy Drink",
        buyUnitPrice: 700.0,
        saleUnitPrice: 800.0,
      },
    ]));
  }

  // Stock In
  if (!localStorage.getItem('stockIn')) {
    localStorage.setItem('stockIn', JSON.stringify([
      {
        id: 1,
        productId: 1,
        quantity: 50,
        unitPrice: 250.0,
        date: "2025-05-01",
      },
      {
        id: 2,
        productId: 2,
        quantity: 30,
        unitPrice: 450.0,
        date: "2025-05-01",
      },
      {
        id: 3,
        productId: 3,
        quantity: 40,
        unitPrice: 350.0,
        date: "2025-05-02",
      },
      {
        id: 4,
        productId: 4,
        quantity: 25,
        unitPrice: 700.0,
        date: "2025-05-02",
      },
    ]));
  }

  // Sales
  if (!localStorage.getItem('sales')) {
    localStorage.setItem('sales', JSON.stringify([]));
  }
};

// Initialize localStorage when the app starts
initializeLocalStorage();

// Get data from localStorage
export const getUsers = () => {
  return JSON.parse(localStorage.getItem('users') || '[]');
};

export const getProducts = () => {
  return JSON.parse(localStorage.getItem('products') || '[]');
};

export const getStockIn = () => {
  return JSON.parse(localStorage.getItem('stockIn') || '[]');
};

export const getSales = () => {
  return JSON.parse(localStorage.getItem('sales') || '[]');
};

// Save data to localStorage
export const saveUsers = (users: any[]) => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const saveProducts = (products: any[]) => {
  localStorage.setItem('products', JSON.stringify(products));
};

export const saveStockIn = (stockIn: any[]) => {
  localStorage.setItem('stockIn', JSON.stringify(stockIn));
};

export const saveSales = (sales: any[]) => {
  localStorage.setItem('sales', JSON.stringify(sales));
};

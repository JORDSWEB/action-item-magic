
// Mock data for users
export const mockUsers = [
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
];

// Mock data for products
export const mockProducts = [
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
];

// Mock data for stock in
export const mockStockIn = [
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
];

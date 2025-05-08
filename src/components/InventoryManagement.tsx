
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockProducts, mockStockIn } from "@/data/mockData";

interface InventoryManagementProps {
  isOwner: boolean;
}

const InventoryManagement = ({ isOwner }: InventoryManagementProps) => {
  const [inventory, setInventory] = useState<any[]>([]);
  const [newStock, setNewStock] = useState({
    productId: 0,
    quantity: 0,
    unitPrice: 0,
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  // Calculate inventory from stockIn and stockOut
  useEffect(() => {
    const inventoryData = mockProducts.map(product => {
      const stockForProduct = mockStockIn.filter(stock => stock.productId === product.id);
      const totalQuantity = stockForProduct.reduce((sum, item) => sum + item.quantity, 0);
      
      return {
        id: product.id,
        name: product.productName,
        totalQuantity,
        buyUnitPrice: product.buyUnitPrice
      };
    });
    
    setInventory(inventoryData);
  }, []);

  const handleStockInChange = (field: string, value: string) => {
    setNewStock({
      ...newStock,
      [field]: field === 'productId' ? parseInt(value) : parseFloat(value)
    });
  };

  const handleAddStock = () => {
    if (!newStock.productId || newStock.quantity <= 0 || newStock.unitPrice <= 0) {
      setMessage({ text: "Please fill all fields with valid values", type: "error" });
      return;
    }

    // In a real app, this would be an API call
    setMessage({ text: "Stock added successfully", type: "success" });
    
    // Reset form
    setNewStock({ productId: 0, quantity: 0, unitPrice: 0 });
    
    // Update inventory state
    const updatedInventory = [...inventory];
    const productIndex = updatedInventory.findIndex(item => item.id === newStock.productId);
    if (productIndex !== -1) {
      updatedInventory[productIndex].totalQuantity += newStock.quantity;
      setInventory(updatedInventory);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Inventory Management</h2>
      
      {message.text && (
        <div className={`p-4 rounded ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {message.text}
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Current Inventory</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buy Unit Price (Rwf)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventory.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.totalQuantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.buyUnitPrice} Rwf</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Record Stock In</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product</label>
            <select 
              className="w-full p-2 border rounded"
              value={newStock.productId}
              onChange={(e) => handleStockInChange('productId', e.target.value)}
            >
              <option value={0}>Select Product</option>
              {mockProducts.map(product => (
                <option key={product.id} value={product.id}>
                  {product.productName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <Input 
              type="number" 
              min="1"
              value={newStock.quantity || ''}
              onChange={(e) => handleStockInChange('quantity', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Unit Price (Rwf)</label>
            <Input 
              type="number"
              min="0.01"
              step="0.01"
              value={newStock.unitPrice || ''}
              onChange={(e) => handleStockInChange('unitPrice', e.target.value)}
            />
          </div>
        </div>
        <Button className="mt-4" onClick={handleAddStock}>
          Add Stock
        </Button>
      </div>
    </div>
  );
};

export default InventoryManagement;

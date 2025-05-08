import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getProducts, getStockIn, getSales, saveSales } from "@/data/mockData";
import { toast } from "sonner";

const SalesManagement = () => {
  const [sales, setSales] = useState<any[]>([]);
  const [availableProducts, setAvailableProducts] = useState<any[]>([]);
  const [newSale, setNewSale] = useState({
    productId: 0,
    quantity: 0,
    saleUnitPrice: 0,
    date: new Date().toISOString().split('T')[0]
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  // Load data from localStorage
  useEffect(() => {
    const salesData = getSales();
    setSales(salesData);
    
    // Calculate available inventory
    const productsData = getProducts();
    const stockInData = getStockIn();
    
    const available = productsData.map(product => {
      const stockForProduct = stockInData.filter(stock => stock.productId === product.id);
      const totalQuantity = stockForProduct.reduce((sum, item) => sum + item.quantity, 0);
      
      const soldQuantity = salesData
        .filter(sale => sale.productId === product.id)
        .reduce((sum, sale) => sum + sale.quantity, 0);
      
      return {
        ...product,
        availableQuantity: totalQuantity - soldQuantity
      };
    });
    
    setAvailableProducts(available);
  }, []);

  const handleSaleChange = (field: string, value: string) => {
    if (field === 'productId') {
      const selectedProduct = availableProducts.find(p => p.id === parseInt(value));
      setNewSale({
        ...newSale,
        productId: parseInt(value),
        saleUnitPrice: selectedProduct ? selectedProduct.saleUnitPrice : 0
      });
    } else {
      setNewSale({
        ...newSale,
        [field]: field === 'date' ? value : parseFloat(value)
      });
    }
  };

  const handleAddSale = () => {
    if (!newSale.productId || newSale.quantity <= 0) {
      setMessage({ text: "Please fill all fields with valid values", type: "error" });
      return;
    }

    const selectedProduct = availableProducts.find(p => p.id === newSale.productId);
    if (!selectedProduct || newSale.quantity > selectedProduct.availableQuantity) {
      setMessage({ text: "Insufficient stock available", type: "error" });
      return;
    }

    // Add new sale to localStorage
    const salesData = getSales();
    const saleWithId = {
      id: salesData.length > 0 ? Math.max(...salesData.map(s => s.id)) + 1 : 1,
      ...newSale,
      totalAmount: newSale.quantity * newSale.saleUnitPrice,
      productName: selectedProduct?.productName
    };
    
    const updatedSales = [...salesData, saleWithId];
    saveSales(updatedSales);
    setSales(updatedSales);
    
    // Update available products
    const updatedAvailableProducts = availableProducts.map(product => {
      if (product.id === newSale.productId) {
        return {
          ...product,
          availableQuantity: product.availableQuantity - newSale.quantity
        };
      }
      return product;
    });
    
    setAvailableProducts(updatedAvailableProducts);
    setMessage({ text: "Sale recorded successfully", type: "success" });
    toast.success("Sale recorded successfully");
    
    // Reset form
    setNewSale({
      productId: 0,
      quantity: 0,
      saleUnitPrice: 0,
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Sales Management</h2>
      
      {message.text && (
        <div className={`p-4 rounded ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {message.text}
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Record Sale</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product</label>
            <select 
              className="w-full p-2 border rounded"
              value={newSale.productId}
              onChange={(e) => handleSaleChange('productId', e.target.value)}
            >
              <option value={0}>Select Product</option>
              {availableProducts
                .filter(product => product.availableQuantity > 0)
                .map(product => (
                <option key={product.id} value={product.id}>
                  {product.productName} (Available: {product.availableQuantity})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <Input 
              type="number"
              min="1"
              max={availableProducts.find(p => p.id === newSale.productId)?.availableQuantity || 0}
              value={newSale.quantity || ''}
              onChange={(e) => handleSaleChange('quantity', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Unit Price (Rwf)</label>
            <Input 
              type="number"
              min="0.01"
              step="0.01"
              value={newSale.saleUnitPrice || ''}
              onChange={(e) => handleSaleChange('saleUnitPrice', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <Input 
              type="date"
              value={newSale.date}
              onChange={(e) => handleSaleChange('date', e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <Button onClick={handleAddSale}>
            Record Sale
          </Button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Today's Sales</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price (Rwf)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount (Rwf)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sales.length > 0 ? (
                sales.map((sale) => (
                  <tr key={sale.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{sale.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{sale.productName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{sale.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{sale.saleUnitPrice} Rwf</td>
                    <td className="px-6 py-4 whitespace-nowrap">{sale.totalAmount} Rwf</td>
                    <td className="px-6 py-4 whitespace-nowrap">{sale.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No sales recorded yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesManagement;

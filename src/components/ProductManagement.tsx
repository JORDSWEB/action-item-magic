
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockProducts } from "@/data/mockData";

interface ProductManagementProps {
  isOwner: boolean;
}

const ProductManagement = ({ isOwner }: ProductManagementProps) => {
  const [products, setProducts] = useState([...mockProducts]);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    buyUnitPrice: 0,
    saleUnitPrice: 0,
  });
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleProductChange = (field: string, value: string) => {
    setNewProduct({
      ...newProduct,
      [field]: field === 'productName' ? value : parseFloat(value)
    });
  };

  const handleAddProduct = () => {
    if (
      !newProduct.productName ||
      newProduct.buyUnitPrice <= 0 ||
      newProduct.saleUnitPrice <= 0
    ) {
      setMessage({ text: "Please fill all fields with valid values", type: "error" });
      return;
    }

    // In a real app, this would be an API call
    if (editMode && editingId) {
      // Update existing product
      const updatedProducts = products.map(product =>
        product.id === editingId
          ? { ...product, ...newProduct }
          : product
      );
      setProducts(updatedProducts);
      setMessage({ text: "Product updated successfully", type: "success" });
      setEditMode(false);
      setEditingId(null);
    } else {
      // Add new product
      const newProductWithId = {
        id: Math.max(...products.map(p => p.id), 0) + 1,
        ...newProduct
      };
      setProducts([...products, newProductWithId]);
      setMessage({ text: "Product added successfully", type: "success" });
    }

    // Reset form
    setNewProduct({ productName: "", buyUnitPrice: 0, saleUnitPrice: 0 });
  };

  const handleEdit = (product: any) => {
    setNewProduct({
      productName: product.productName,
      buyUnitPrice: product.buyUnitPrice,
      saleUnitPrice: product.saleUnitPrice,
    });
    setEditMode(true);
    setEditingId(product.id);
  };

  const handleDelete = (id: number) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    setMessage({ text: "Product deleted successfully", type: "success" });
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEditingId(null);
    setNewProduct({ productName: "", buyUnitPrice: 0, saleUnitPrice: 0 });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Product Management</h2>
      
      {message.text && (
        <div className={`p-4 rounded ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {message.text}
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">
          {editMode ? "Edit Product" : "Add New Product"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <Input 
              value={newProduct.productName}
              onChange={(e) => handleProductChange('productName', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Buy Unit Price (Rwf)</label>
            <Input 
              type="number"
              min="0.01"
              step="0.01"
              value={newProduct.buyUnitPrice || ''}
              onChange={(e) => handleProductChange('buyUnitPrice', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Sale Unit Price (Rwf)</label>
            <Input 
              type="number"
              min="0.01"
              step="0.01"
              value={newProduct.saleUnitPrice || ''}
              onChange={(e) => handleProductChange('saleUnitPrice', e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <Button onClick={handleAddProduct}>
            {editMode ? "Update Product" : "Add Product"}
          </Button>
          {editMode && (
            <Button variant="outline" onClick={cancelEdit}>
              Cancel
            </Button>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Product List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buy Unit Price (Rwf)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sale Unit Price (Rwf)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{product.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.productName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.buyUnitPrice} Rwf</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.saleUnitPrice} Rwf</td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </Button>
                    {isOwner && (
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;

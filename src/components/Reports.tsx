
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockProducts } from "@/data/mockData";

const Reports = () => {
  const [reportType, setReportType] = useState("general");
  const [dateRange, setDateRange] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [selectedProductId, setSelectedProductId] = useState(0);
  const [showReport, setShowReport] = useState(false);

  const handleDateChange = (field: string, value: string) => {
    setDateRange({
      ...dateRange,
      [field]: value
    });
  };

  const handleGenerateReport = () => {
    setShowReport(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Reports</h2>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Generate Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Report Type</label>
            <select
              className="w-full p-2 border rounded"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="general">General Report</option>
              <option value="product">Product Specific Report</option>
            </select>
          </div>
          
          {reportType === "product" && (
            <div>
              <label className="block text-sm font-medium mb-1">Select Product</label>
              <select
                className="w-full p-2 border rounded"
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(parseInt(e.target.value))}
              >
                <option value={0}>Select a product</option>
                {mockProducts.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.productName}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <Input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => handleDateChange('startDate', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <Input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => handleDateChange('endDate', e.target.value)}
            />
          </div>
        </div>
        
        <Button className="mt-4" onClick={handleGenerateReport}>
          Generate Report
        </Button>
      </div>

      {showReport && (
        <div className="bg-white p-6 rounded-lg shadow print:shadow-none" id="report-section">
          <div className="flex justify-between items-center mb-6 print:hidden">
            <h3 className="text-lg font-semibold">
              {reportType === "general" ? "General Report" : "Product Report"}
            </h3>
            <Button onClick={handlePrint}>
              Print Report
            </Button>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-xl font-bold">Juice Depot</h2>
            <p className="text-gray-600">
              {reportType === "general" 
                ? `Periodical General Report From: ${dateRange.startDate} to ${dateRange.endDate}`
                : `Periodical Report for ${mockProducts.find(p => p.id === selectedProductId)?.productName || 'Selected Product'} From: ${dateRange.startDate} to ${dateRange.endDate}`
              }
            </p>
          </div>

          {reportType === "general" ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">Product Name</th>
                    <th className="border border-gray-300 px-4 py-2">Purchased (Quantity)</th>
                    <th className="border border-gray-300 px-4 py-2">Purchased Amount (Rwf)</th>
                    <th className="border border-gray-300 px-4 py-2">Sold (Quantity)</th>
                    <th className="border border-gray-300 px-4 py-2">Sold Amount (Rwf)</th>
                    <th className="border border-gray-300 px-4 py-2">Remaining</th>
                  </tr>
                </thead>
                <tbody>
                  {mockProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="border border-gray-300 px-4 py-2">{product.productName}</td>
                      <td className="border border-gray-300 px-4 py-2">20</td>
                      <td className="border border-gray-300 px-4 py-2">10000</td>
                      <td className="border border-gray-300 px-4 py-2">15</td>
                      <td className="border border-gray-300 px-4 py-2">8500</td>
                      <td className="border border-gray-300 px-4 py-2">5</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-semibold">
                    <td className="border border-gray-300 px-4 py-2">Total</td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2">40000 Rwf</td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2">32500 Rwf</td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">Date</th>
                    <th className="border border-gray-300 px-4 py-2">Purchased (Quantity)</th>
                    <th className="border border-gray-300 px-4 py-2">Purchased Amount (Rwf)</th>
                    <th className="border border-gray-300 px-4 py-2">Sold (Quantity)</th>
                    <th className="border border-gray-300 px-4 py-2">Sold Amount (Rwf)</th>
                    <th className="border border-gray-300 px-4 py-2">Remaining</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">2025-05-01</td>
                    <td className="border border-gray-300 px-4 py-2">10</td>
                    <td className="border border-gray-300 px-4 py-2">5000</td>
                    <td className="border border-gray-300 px-4 py-2">8</td>
                    <td className="border border-gray-300 px-4 py-2">4800</td>
                    <td className="border border-gray-300 px-4 py-2">2</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">2025-05-03</td>
                    <td className="border border-gray-300 px-4 py-2">5</td>
                    <td className="border border-gray-300 px-4 py-2">2500</td>
                    <td className="border border-gray-300 px-4 py-2">4</td>
                    <td className="border border-gray-300 px-4 py-2">2400</td>
                    <td className="border border-gray-300 px-4 py-2">1</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">2025-05-05</td>
                    <td className="border border-gray-300 px-4 py-2">8</td>
                    <td className="border border-gray-300 px-4 py-2">4000</td>
                    <td className="border border-gray-300 px-4 py-2">5</td>
                    <td className="border border-gray-300 px-4 py-2">3000</td>
                    <td className="border border-gray-300 px-4 py-2">3</td>
                  </tr>
                  <tr className="bg-gray-100 font-semibold">
                    <td className="border border-gray-300 px-4 py-2">Total</td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2">11500 Rwf</td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2">10200 Rwf</td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-8 text-gray-600">
            <p><strong>Note:</strong></p>
            <ul className="list-disc pl-5">
              <li>Logins are session based</li>
              <li>Both Owner and Worker login form is the same</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;

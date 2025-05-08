
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InventoryManagement from "@/components/InventoryManagement";
import ProductManagement from "@/components/ProductManagement";
import SalesManagement from "@/components/SalesManagement";
import Reports from "@/components/Reports";

interface DashboardProps {
  user: {
    id: number;
    username: string;
    userType: string;
  };
}

const Dashboard = ({ user }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("inventory");
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <Tabs defaultValue="inventory" onValueChange={setActiveTab}>
          <div className="border-b">
            <div className="container mx-auto">
              <TabsList className="h-14">
                <TabsTrigger value="inventory" className="h-14">
                  Inventory
                </TabsTrigger>
                <TabsTrigger value="products" className="h-14">
                  Products
                </TabsTrigger>
                <TabsTrigger value="sales" className="h-14">
                  Sales
                </TabsTrigger>
                <TabsTrigger value="reports" className="h-14">
                  Reports
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          <div className="p-4">
            <TabsContent value="inventory">
              <InventoryManagement isOwner={user.userType === "owner"} />
            </TabsContent>
            
            <TabsContent value="products">
              <ProductManagement isOwner={user.userType === "owner"} />
            </TabsContent>
            
            <TabsContent value="sales">
              <SalesManagement />
            </TabsContent>
            
            <TabsContent value="reports">
              <Reports />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;

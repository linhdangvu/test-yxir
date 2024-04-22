import MyButton from "@/components/base/button";
import TableWidget from "@/components/base/table-widget";
import SidebarPage from "@/components/sidebar/sidebar";
import React from "react";

const HomePage = () => {
  const columns = ["Name", "Age", "Role"]; // Example column names
  const data = [
    { Name: "John", Age: 30, Role: "Engineer" },
    { Name: "Alice", Age: 25, Role: "Manager" },
    { Name: "Bob", Age: 35, Role: "Technician" },
  ];
  return (
    <div>
      <MyButton title="Hello" bgColor="dark" />
      Tableau Widget
      <TableWidget columns={columns} data={data} />
    </div>
  );
};

export default HomePage;

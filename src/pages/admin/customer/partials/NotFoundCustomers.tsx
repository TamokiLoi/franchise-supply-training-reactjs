import { Users } from "lucide-react";

const NotFoundCustomers = ({
  title = "No Customers Found",
  description = "There are no customers to display right now.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      <div className="bg-gray-100 p-4 rounded-full mb-4">
        <Users className="w-10 h-10 text-gray-400" />
      </div>
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="text-sm text-gray-500 mt-1 mb-4">{description}</p>
    </div>
  );
};

export default NotFoundCustomers;

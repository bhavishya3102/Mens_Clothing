"use client";

import { useState, useEffect } from "react";
import { TrashIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { deleteContact, getContacts } from "@/lib/contacts-action";
import { useAuth } from "@/lib/useAuth";
import toast from "react-hot-toast";

export default function AdminPage() {
  const { user, loading: authLoading, isAuthenticated } = useAuth(true);
  const [contactsData, setContactsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await getContacts();
          setContactsData(response?.data);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching contacts:", err);
          setError("Failed to fetch contacts");
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isAuthenticated]);

  if (authLoading) {
    return <Loading />;
  }

  if (loading) {
    return <Loading />;
  }

  if (error || !contactsData) {
    return <Error error={error || "An unexpected error occurred."} />;
  }

  if (contactsData.length === 0) {
    return <Empty />;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contactsData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((contactsData.length || 0) / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mx-auto py-6 px-8">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Contact Submissions
          </h1>
          <div className="text-sm text-gray-500 dark:text-white">
            Total: {contactsData.length} submissions
          </div>
        </div>
        <div className="h-1 w-20 bg-blue-500 mt-2"></div>
      </header>

      <div className="overflow-x-auto max-w-[80vw] mx-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg text-lg">
          <thead className="bg-[#b08355] font-bold">
            <tr>
              <th className="px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs text-black font-bold uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs text-black font-bold  uppercase tracking-wider">Message</th>
              <th className="px-6 py-3 text-right text-xs  text-black font-bold uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentItems.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">{contact.data.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{contact.data.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{contact.data.phone || "Not provided"}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <div className="max-w-xs overflow-hidden text-ellipsis">
                    {contact.data.message}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDelete(contact.id, setContactsData, contactsData)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        <div className="flex mx-auto justify-center gap-4 my-4 items-center w-full">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon size={16} />
            Previous
          </button>
          
          <span className="text-sm text-gray-700 dark:text-white">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRightIcon size={16} />
          </button>
        </div>
    </div>
  );
}

const handleDelete = async (contactId, setContactsData, contactsData) => {
  await deleteContact(contactId);
  setContactsData(contactsData.filter((cont) => cont.id !== contactId));
  toast.success("Contact deleted successfully");
};

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-gray-600">Loading contact submissions...</p>
    </div>
  );
};

const Error = ({ error }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-red-500 text-xl mb-2">Error loading contacts</div>
      <p className="text-gray-600">{error}</p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Try Again
      </button>
    </div>
  );
};

const Empty = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-sm text-center">
        <MailIcon size={48} className="text-gray-300 mx-auto mb-4" />
        <div className="text-gray-700 text-xl font-medium mb-2">
          No contact submissions yet
        </div>
        <p className="text-gray-500">
          New submissions will appear here when received.
        </p>
      </div>
    </div>
  );
};

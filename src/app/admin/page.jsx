import { Suspense } from "react";
import { TrashIcon, MailIcon } from "lucide-react";
import { getContacts } from "@/lib/firebase";

async function fetchContacts() {
  try {
    const response = await getContacts();
    const data = response?.data;
    return { success: true, message: "Data fetched successfully", data }
  } catch (error) {
    return { success: false, message: "Failed to fetch contacts" };
  }
}

export default async function AdminPage() {
  const resp = await fetchContacts();

  if (!resp.success) {
    return <Error error={resp.message || "An unexpected error occurred."} />;
  }

  if (!resp.data || resp.data.length === 0) {
    return <Empty />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="mx-auto py-6 px-8">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Contact Submissions</h1>
            <div className="text-sm text-gray-500">Total: {resp.data.length} submissions</div>
          </div>
          <div className="h-1 w-20 bg-blue-500 mt-2"></div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resp.data.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
    </Suspense>
  );
}

const ContactCard = ({ contact }) => {
  return (
    <div className="border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{contact.data.name}</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs font-medium uppercase text-gray-500 mb-1">Email</p>
          <p className="text-gray-700 truncate">{contact.data.email}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase text-gray-500 mb-1">Phone</p>
          <p className="text-gray-700">{contact.data.phone || "Not provided"}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs font-medium uppercase text-gray-500 mb-1">Message</p>
        <div className="p-3 bg-gray-50 rounded border border-gray-100 max-h-36 overflow-y-auto">
          <p className="text-gray-700 whitespace-pre-line">{contact.data.message}</p>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="p-2 rounded-full hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
          title="Delete contact"
        // onClick={handleDelete}
        >
          <TrashIcon size={18} />
        </button>
      </div>
    </div>
  );
}

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
        <div className="text-gray-700 text-xl font-medium mb-2">No contact submissions yet</div>
        <p className="text-gray-500">New submissions will appear here when received.</p>
      </div>
    </div>
  );
};

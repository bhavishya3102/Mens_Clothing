import { getContacts } from "@/lib/firebase";
import { Suspense } from "react";

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: Contact[];
}

export default async function AdminPage() {
  const resp: ApiResponse = await getContacts();

  if (!resp.success) {
    return <Error error={resp.message || "An unexpected error occurred."} />;
  }

  if (!resp.data || resp.data.length === 0) {
    return <Empty />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Contact Submissions</h1>
        <div className="space-y-4">
          {resp.data.map((contact) => (
            <div key={contact.id} className="border p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold">{contact.name}</h2>
              <p className="text-gray-600">{contact.email}</p>
              <p className="mt-2">{contact.message}</p>
            </div>
          ))}
        </div>
      </div>
    </Suspense>
  );
}

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};

const Error = ({ error }: { error: string }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-red-500 text-xl">{error}</div>
    </div>
  );
};

const Empty = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-gray-500 text-xl">No contact submissions found.</div>
    </div>
  );
};

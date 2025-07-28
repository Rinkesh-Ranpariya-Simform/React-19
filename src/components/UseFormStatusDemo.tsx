import { useFormStatus } from "react-dom";
import { useState } from "react";

export const UseFormStatusDemo = () => {
  const [submissions, setSubmissions] = useState<
    Array<{ id: string; type: string; data: Record<string, string> }>
  >([]);

  const submitContactForm = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    await new Promise((resolve) => setTimeout(resolve, 3000));

    setSubmissions((prev) => [
      ...prev,
      {
        id: `contact-${Date.now()}`,
        type: "Contact Form",
        data: { name, email, message },
      },
    ]);
  };

  const submitNewsletterForm = async (formData: FormData) => {
    const email = formData.get("newsletter-email") as string;

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSubmissions((prev) => [
      ...prev,
      {
        id: `newsletter-${Date.now()}`,
        type: "Newsletter Signup",
        data: { email },
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            useFormStatus Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            useFormStatus provides access to form submission status from any
            component within a form. It enables building smart form components
            that react to submission state.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              📧 Contact Form
            </h2>

            <form action={submitContactForm} className="space-y-4">
              <input type="hidden" name="formType" value="Contact Form" />

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your message..."
                />
              </div>

              <SubmitButton />

              <FormStatusIndicator />
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              📰 Newsletter Signup
            </h2>

            <form action={submitNewsletterForm} className="space-y-4">
              <input type="hidden" name="formType" value="Newsletter" />

              <div>
                <label
                  htmlFor="newsletter-email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="newsletter-email"
                  name="newsletter-email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="your@email.com"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="agree"
                  name="agree"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="agree"
                  className="ml-2 block text-sm text-gray-700"
                >
                  I agree to receive newsletter updates
                </label>
              </div>

              <SubmitButton />

              <FormStatusIndicator />
            </form>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            📝 Form Submissions
          </h3>
          {submissions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No submissions yet. Try submitting the forms above!
            </p>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="p-4 bg-gray-50 rounded border"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">
                      {submission.type}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {submission.id}
                    </span>
                  </div>
                  <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                    {JSON.stringify(submission.data, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">
            🔍 How useFormStatus Works
          </h3>
          <div className="space-y-3 text-blue-800">
            <p>
              <strong>useFormStatus</strong> provides form submission status to
              any component within a form, enabling smart UI components that
              respond to form state.
            </p>
            <p>
              <strong>Key Features:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Access pending state from any component within the form</li>
              <li>Get form data, method, and action information</li>
              <li>
                Build reusable form components that adapt to submission state
              </li>
              <li>No prop drilling needed for form status</li>
              <li>Works with both traditional forms and React Actions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const SubmitButton = () => {
  const { pending, data } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
    >
      {pending ? (
        <>
          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
          Submitting {data?.get("formType") || "form"}...
        </>
      ) : (
        "Submit Form"
      )}
    </button>
  );
};

const FormStatusIndicator = () => {
  const { pending, data, method } = useFormStatus();

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h4 className="text-lg font-semibold text-gray-900 mb-3">
        📊 Form Status (from useFormStatus)
      </h4>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium text-gray-700">Pending:</span>
          <span
            className={`ml-2 px-2 py-1 rounded ${
              pending
                ? "bg-yellow-200 text-yellow-800"
                : "bg-green-200 text-green-800"
            }`}
          >
            {pending ? "Yes" : "No"}
          </span>
        </div>
        <div>
          <span className="font-medium text-gray-700">Method:</span>
          <span className="ml-2 px-2 py-1 bg-blue-200 text-blue-800 rounded">
            {method || "?"}
          </span>
        </div>

        {data && (
          <div className="col-span-2">
            <span className="font-medium text-gray-700">Form Data:</span>
            <div className="mt-1 text-xs bg-white p-2 rounded border">
              {Array.from(data.entries()).map(([key, value]) => {
                const stringValue =
                  value instanceof File ? `File: ${value.name}` : String(value);
                return (
                  <div key={key}>
                    <strong>{key}:</strong> {stringValue.substring(0, 50)}
                    {stringValue.length > 50 ? "..." : ""}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import { useState } from "react";

export const ActionsDemo = () => {
  const [messages, setMessages] = useState<Array<{ id: string; text: string }>>(
    []
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTraditionalSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsProcessing(true);

    const formData = new FormData(e.currentTarget);
    const message = formData.get("traditional-message") as string;

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setMessages((prev) => [
      ...prev,
      { id: `traditional-${Date.now()}`, text: `Traditional: ${message}` },
    ]);
    setIsProcessing(false);
  };

  const submitMessageAction = async (formData: FormData) => {
    const message = formData.get("action-message") as string;

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setMessages((prev) => [
      ...prev,
      { id: `action-${Date.now()}`, text: `Action: ${message}` },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Actions Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Compare traditional form handling with React 19 Actions. Actions
            provide automatic pending states, error handling, and progressive
            enhancement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              ❌ Traditional Form Handling
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Manual state management, error handling, and loading states
            </p>

            <form onSubmit={handleTraditionalSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="traditional-message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <input
                  type="text"
                  id="traditional-message"
                  name="traditional-message"
                  required
                  disabled={isProcessing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter your message..."
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Processing...
                  </>
                ) : (
                  "Submit Traditional"
                )}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              ✅ React 19 Actions
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Automatic pending states, progressive enhancement, and cleaner
              code
            </p>

            <form action={submitMessageAction} className="space-y-4">
              <div>
                <label
                  htmlFor="action-message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <input
                  type="text"
                  id="action-message"
                  name="action-message"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Submit with Action
              </button>
            </form>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            📝 Submitted Messages
          </h3>
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No messages submitted yet. Try submitting using both forms above!
            </p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="p-3 bg-gray-50 rounded border text-sm"
                >
                  {message.text}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">
            🔍 How Actions Work
          </h3>
          <div className="space-y-3 text-blue-800">
            <p>
              <strong>Traditional Approach:</strong> Manual event handling,
              state management for loading/error states, and form reset logic.
            </p>
            <p>
              <strong>React 19 Actions:</strong> Pass async functions directly
              to form action prop. React automatically handles pending states,
              form resets, and progressive enhancement.
            </p>
            <p>
              <strong>Key Benefits:</strong> Less boilerplate code, automatic
              optimizations, and better accessibility with progressive
              enhancement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

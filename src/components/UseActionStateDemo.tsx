import { useActionState } from "react";

type FormState = {
  message: string;
  error?: string;
  success?: string;
};

export const UseActionStateDemo = () => {
  const submitComment = async (
    _prevState: FormState,
    formData: FormData
  ): Promise<FormState> => {
    const comment = formData.get("comment") as string;
    const email = formData.get("email") as string;

    if (!comment.trim()) {
      return {
        message: comment,
        error: "Comment is required",
      };
    }

    if (!email.trim()) {
      return {
        message: comment,
        error: "Email is required",
      };
    }

    if (!email.includes("@")) {
      return {
        message: comment,
        error: "Please enter a valid email address",
      };
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (Math.random() > 0.7) {
      return {
        message: comment,
        error: "Server error: Failed to submit comment. Please try again.",
      };
    }

    return {
      message: "",
      success: "Comment submitted successfully!",
    };
  };

  const [state, action, isPending] = useActionState(submitComment, {
    message: "",
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            useActionState Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            useActionState simplifies form state management by combining form
            actions with state management. It provides automatic pending states,
            error handling, and form persistence.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              📝 Comment Form
            </h2>

            <form action={action} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  disabled={isPending}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Comment
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={4}
                  required
                  disabled={isPending}
                  defaultValue={state.message}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Write your comment here..."
                />
              </div>

              {!isPending && (
                <>
                  {state.error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <span className="text-red-400">❌</span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-red-700">{state.error}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {state.success && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <span className="text-green-400">✅</span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-green-700">
                            {state.success}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              >
                {isPending ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  "Submit Comment"
                )}
              </button>
            </form>
          </div>

          <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              📊 Form State
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-medium text-blue-800">Pending:</span>
                <span
                  className={`px-2 py-1 rounded ${
                    isPending
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {isPending ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-blue-800">Has Error:</span>
                <span
                  className={`px-2 py-1 rounded ${
                    !isPending && state.error
                      ? "bg-red-200 text-red-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {!isPending && state.error ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-blue-800">Has Success:</span>
                <span
                  className={`px-2 py-1 rounded ${
                    !isPending && state.success
                      ? "bg-green-200 text-green-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {!isPending && state.success ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              🔍 How useActionState Works
            </h3>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>useActionState</strong> combines form actions with state
                management, providing a clean way to handle form submissions
                with built-in state tracking.
              </p>
              <p>
                <strong>Key Features:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Automatic pending state management</li>
                <li>Built-in error and success state handling</li>
                <li>Form value persistence during errors</li>
                <li>Progressive enhancement support</li>
                <li>Reduced boilerplate compared to manual state management</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

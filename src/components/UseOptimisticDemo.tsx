import { useState, useOptimistic } from "react";

type Comment = {
  id: string;
  text: string;
  author: string;
  timestamp: Date;
  isPending?: boolean;
};

export const UseOptimisticDemo = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state, newComment: Comment) => [...state, newComment]
  );

  const [regularComments, setRegularComments] = useState<Comment[]>(comments);
  const [isRegularPending, setIsRegularPending] = useState(false);

  const simulateServerDelay = () =>
    new Promise((resolve) => setTimeout(resolve, 2000));

  const handleOptimisticSubmit = async (formData: FormData) => {
    const text = formData.get("optimistic-comment") as string;
    const author = formData.get("optimistic-author") as string;

    if (!text.trim() || !author.trim()) return;

    const newComment: Comment = {
      id: `temp-${Date.now()}`,
      text,
      author,
      timestamp: new Date(),
      isPending: true,
    };

    addOptimisticComment(newComment);

    try {
      await simulateServerDelay();

      const confirmedComment: Comment = {
        ...newComment,
        id: `confirmed-${Date.now()}`,
        isPending: false,
      };

      setComments((prev) => [...prev, confirmedComment]);
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  const handleRegularSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsRegularPending(true);

    const formData = new FormData(e.currentTarget);
    const text = formData.get("regular-comment") as string;
    const author = formData.get("regular-author") as string;

    if (!text.trim() || !author.trim()) {
      setIsRegularPending(false);
      return;
    }

    try {
      await simulateServerDelay();

      const newComment: Comment = {
        id: `regular-${Date.now()}`,
        text,
        author,
        timestamp: new Date(),
      };

      setRegularComments((prev) => [...prev, newComment]);
      e.currentTarget.reset();
    } catch (error) {
      console.error("Failed to submit comment:", error);
    } finally {
      setIsRegularPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            useOptimistic Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Compare regular form submissions with optimistic updates.
            useOptimistic provides instant UI feedback while the server
            processes requests in the background.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              ❌ Regular Form Submission
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Wait for server confirmation before showing new comments
            </p>

            <form onSubmit={handleRegularSubmit} className="space-y-4 mb-6">
              <div>
                <label
                  htmlFor="regular-author"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="regular-author"
                  name="regular-author"
                  required
                  disabled={isRegularPending}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label
                  htmlFor="regular-comment"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Comment
                </label>
                <textarea
                  id="regular-comment"
                  name="regular-comment"
                  rows={3}
                  required
                  disabled={isRegularPending}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Write your comment..."
                />
              </div>

              <button
                type="submit"
                disabled={isRegularPending}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isRegularPending ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  "Submit Comment"
                )}
              </button>
            </form>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {regularComments.map((comment) => (
                <div key={comment.id} className="p-3 bg-gray-50 rounded border">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-gray-900">
                      {comment.author}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              ✅ With useOptimistic
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Instant UI updates with optimistic rendering
            </p>

            <form action={handleOptimisticSubmit} className="space-y-4 mb-6">
              <div>
                <label
                  htmlFor="optimistic-author"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="optimistic-author"
                  name="optimistic-author"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label
                  htmlFor="optimistic-comment"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Comment
                </label>
                <textarea
                  id="optimistic-comment"
                  name="optimistic-comment"
                  rows={3}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Write your comment..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Submit Comment (Optimistic)
              </button>
            </form>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {optimisticComments.map((comment) => (
                <div
                  key={comment.id}
                  className={`p-3 rounded border transition-opacity ${
                    comment.isPending
                      ? "bg-yellow-50 border-yellow-200 opacity-75"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-gray-900 flex items-center">
                      {comment.author}
                      {comment.isPending && (
                        <span className="ml-2 text-xs text-yellow-600 flex items-center">
                          <div className="animate-spin h-3 w-3 border-2 border-yellow-600 border-t-transparent rounded-full mr-1"></div>
                          Pending
                        </span>
                      )}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">
            🔍 How useOptimistic Works
          </h3>
          <div className="space-y-3 text-blue-800">
            <p>
              <strong>Regular Approach:</strong> Users must wait for server
              confirmation before seeing their submitted content, leading to a
              slower, less responsive experience.
            </p>
            <p>
              <strong>useOptimistic:</strong> Immediately shows the user's
              submission in the UI while the server processes the request in the
              background. If the server request fails, the optimistic update can
              be reverted.
            </p>
            <p>
              <strong>Key Benefits:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Instant feedback for better user experience</li>
              <li>Reduced perceived loading time</li>
              <li>Automatic state management for pending updates</li>
              <li>Easy rollback on server errors</li>
              <li>Works seamlessly with React's concurrent features</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

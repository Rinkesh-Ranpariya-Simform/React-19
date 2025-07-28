import { createContext, useState, use } from "react";

type User = {
  id: number;
  name: string;
  role: "admin" | "user" | "guest";
  preferences: {
    language: string;
    notifications: boolean;
  };
};

export const UseWithContextDemo = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            use() with Context
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            React 19's use() hook enables conditional context reading, allowing
            you to consume context only when needed, improving performance and
            enabling more flexible component architectures.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            What's New with use() and Context?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-green-700">
                ✅ React 19 Way
              </h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <pre className="text-sm text-green-800 overflow-x-auto">
                  {`// Conditional context reading
const MyComponent = ({ needsAuth }) => {
  const user = needsAuth ? use(UserContext) : null;
  
  if (!needsAuth) return <PublicView />;
  return <PrivateView user={user} />;
};`}
                </pre>
              </div>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Conditional context consumption</li>
                <li>• Better performance optimization</li>
                <li>• No unnecessary re-renders</li>
                <li>• Flexible component logic</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-orange-700">
                ⚠️ Legacy Way
              </h3>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <pre className="text-sm text-orange-800 overflow-x-auto">
                  {`// Always consumes context
const MyComponent = ({ needsAuth }) => {
  const user = useContext(UserContext); // Always consumed
  
  if (!needsAuth) return <PublicView />;
  return <PrivateView user={user} />;
};`}
                </pre>
              </div>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Always consumes all contexts</li>
                <li>• Unnecessary re-renders</li>
                <li>• Less flexible optimization</li>
                <li>• Fixed consumption pattern</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Interactive Demo
          </h2>
          <ContextDemoProvider />
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-green-900 mb-4">
            Key Benefits
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-green-800 mb-2">
                🚀 Performance Optimization
              </h3>
              <ul className="space-y-1 text-green-700">
                <li>• Conditional context reading</li>
                <li>• Reduced unnecessary re-renders</li>
                <li>• Better memory usage</li>
                <li>• Optimized component updates</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-green-800 mb-2">
                🔧 Flexible Architecture
              </h3>
              <ul className="space-y-1 text-green-700">
                <li>• Dynamic context consumption</li>
                <li>• Conditional rendering logic</li>
                <li>• Better component composition</li>
                <li>• Simplified state management</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-green-800 mb-2">
                💡 Developer Experience
              </h3>
              <ul className="space-y-1 text-green-700">
                <li>• Cleaner component logic</li>
                <li>• Better debugging experience</li>
                <li>• More predictable behavior</li>
                <li>• Enhanced code readability</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserContext = createContext<User | null>(null);

const UserProfile = ({ showProfile }: { showProfile: boolean }) => {
  const user = showProfile ? use(UserContext) : null;

  if (!showProfile) {
    return (
      <div className="p-4 rounded-lg border bg-white text-gray-800 border-gray-300">
        <p>Profile hidden - use() context not called</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 rounded-lg border bg-white text-gray-800 border-gray-300">
        <p>No user data available</p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg border shadow-sm bg-white text-gray-800 border-gray-300">
      <h3 className="text-lg font-semibold mb-4">User Profile</h3>
      <div className="space-y-2">
        <p>
          <span className="font-medium">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-medium">Role:</span> {user.role}
        </p>
        <p>
          <span className="font-medium">Language:</span>{" "}
          {user.preferences.language}
        </p>
        <p>
          <span className="font-medium">Notifications:</span>{" "}
          {user.preferences.notifications ? "Enabled" : "Disabled"}
        </p>
      </div>
    </div>
  );
};

const AdminPanel = ({ showAdmin }: { showAdmin: boolean }) => {
  const user = showAdmin ? use(UserContext) : null;

  if (!showAdmin || !user || user.role !== "admin") {
    return (
      <div className="p-4 rounded-lg border bg-white text-gray-800 border-gray-300">
        <p>
          Admin panel not accessible - insufficient permissions or not shown
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg border shadow-sm bg-white text-gray-800 border-gray-300">
      <h3 className="text-lg font-semibold mb-4">🔧 Admin Panel</h3>
      <div className="space-y-3">
        <button className="px-4 py-2 rounded-md text-white transition-colors bg-blue-600 hover:bg-blue-700">
          Manage Users
        </button>
        <button className="px-4 py-2 rounded-md text-white transition-colors ml-3 bg-green-600 hover:bg-green-700">
          System Settings
        </button>
        <div className="mt-4 p-3 rounded border-l-4 border-blue-600">
          <p className="text-sm">Admin privileges active for {user.name}</p>
        </div>
      </div>
    </div>
  );
};

const ContextDemo = () => {
  const [showProfile, setShowProfile] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          Conditional Context Reading Controls
        </h3>
        <div className="flex flex-wrap gap-3 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showProfile}
              onChange={(e) => setShowProfile(e.target.checked)}
              className="rounded"
            />
            <span className="text-blue-700">Show User Profile</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showAdmin}
              onChange={(e) => setShowAdmin(e.target.checked)}
              className="rounded"
            />
            <span className="text-blue-700">Show Admin Panel</span>
          </label>
        </div>
        <p className="text-blue-700 text-sm">
          Toggle these options to see how use() conditionally reads context.
          When unchecked, the context won't be consumed, demonstrating React
          19's conditional context reading capability.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <UserProfile showProfile={showProfile} />
        <AdminPanel showAdmin={showAdmin} />
      </div>
    </div>
  );
};

const ContextDemoProvider = () => {
  const [currentUser, setCurrentUser] = useState<User>({
    id: 1,
    name: "John Doe",
    role: "admin",
    preferences: {
      language: "English",
      notifications: true,
    },
  });

  const switchUser = (role: "admin" | "user" | "guest") => {
    let userName: string;
    if (role === "admin") {
      userName = "Admin User";
    } else if (role === "user") {
      userName = "Regular User";
    } else {
      userName = "Guest User";
    }

    setCurrentUser((prev) => ({
      ...prev,
      role,
      name: userName,
    }));
  };

  return (
    <UserContext.Provider value={currentUser}>
      <div className="space-y-6">
        <div className="p-6 rounded-lg border shadow-sm bg-white text-gray-800 border-gray-300">
          <h3 className="text-lg font-semibold mb-4">
            Global Context Controls
          </h3>
          <div className="flex flex-wrap gap-3 mb-4">
            <button
              onClick={() => switchUser("admin")}
              className={`px-4 py-2 rounded-md transition-colors ${
                currentUser.role === "admin"
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Admin User
            </button>
            <button
              onClick={() => switchUser("user")}
              className={`px-4 py-2 rounded-md transition-colors ${
                currentUser.role === "user"
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Regular User
            </button>
            <button
              onClick={() => switchUser("guest")}
              className={`px-4 py-2 rounded-md transition-colors ${
                currentUser.role === "guest"
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Guest User
            </button>
          </div>
          <p className="text-sm opacity-75">
            Current user:{" "}
            <span className="font-medium">{currentUser.name}</span> (
            {currentUser.role})
          </p>
        </div>

        <ContextDemo />
      </div>
    </UserContext.Provider>
  );
};

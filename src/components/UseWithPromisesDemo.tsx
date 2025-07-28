import React, { useState, Suspense, use } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Weather {
  temperature: number;
  condition: string;
  city: string;
}

export const UseWithPromisesDemo = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            use() with Promises
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The new use() hook revolutionizes data fetching in React by allowing
            you to "use" promises directly in components, with automatic
            suspense integration and error handling.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            What's New with use() Hook?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-green-700">
                ✅ React 19 Way
              </h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <pre className="text-sm text-green-800 overflow-x-auto">
                  {`// Component using use() hook
const UserProfile = ({ userPromise }) => {
  const user = use(userPromise);
  return <div>{user.name}</div>;
};

// Usage with Suspense
<Suspense fallback={<Loading />}>
  <UserProfile userPromise={fetchUser()} />
</Suspense>`}
                </pre>
              </div>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Direct promise consumption</li>
                <li>• Automatic suspense integration</li>
                <li>• No useEffect needed</li>
                <li>• Built-in error handling</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-orange-700">
                ⚠️ Legacy Way
              </h3>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <pre className="text-sm text-orange-800 overflow-x-auto">
                  {`// Traditional useEffect approach
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUser(userId).then(setUser)
      .finally(() => setLoading(false));
  }, [userId]);
  
  if (loading) return <Loading />;
  return <div>{user?.name}</div>;
};`}
                </pre>
              </div>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Manual state management</li>
                <li>• Complex loading states</li>
                <li>• useEffect dependencies</li>
                <li>• Manual error handling</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Interactive Demo
          </h2>
          <PromiseDemo />
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-purple-900 mb-4">
            Key Benefits
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-purple-800 mb-2">
                🚀 Simplified Data Fetching
              </h3>
              <ul className="space-y-1 text-purple-700">
                <li>• No useState for data</li>
                <li>• No useEffect for fetching</li>
                <li>• Automatic suspense</li>
                <li>• Less boilerplate code</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-purple-800 mb-2">
                ⚡ Better Performance
              </h3>
              <ul className="space-y-1 text-purple-700">
                <li>• Streaming responses</li>
                <li>• Concurrent rendering</li>
                <li>• Optimized re-renders</li>
                <li>• Better caching support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-purple-800 mb-2">
                🛡️ Enhanced Error Handling
              </h3>
              <ul className="space-y-1 text-purple-700">
                <li>• Error boundaries integration</li>
                <li>• Automatic error propagation</li>
                <li>• Consistent error patterns</li>
                <li>• Better debugging experience</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PromiseDemo = () => {
  const [userId, setUserId] = useState(1);
  const [key, setKey] = useState(0);

  const userPromise = fetchUserData(userId);
  const weatherPromise = fetchWeatherData();

  const handleUserChange = (newUserId: number) => {
    setUserId(newUserId);
    setKey((prev) => prev + 1);
  };

  return (
    <div key={key} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex flex-wrap gap-3 mb-4">
          <button
            onClick={() => handleUserChange(1)}
            className={`px-4 py-2 rounded-md transition-colors ${
              userId === 1
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
            }`}
          >
            Load User 1
          </button>
          <button
            onClick={() => handleUserChange(2)}
            className={`px-4 py-2 rounded-md transition-colors ${
              userId === 2
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
            }`}
          >
            Load User 2
          </button>
          <button
            onClick={() => handleUserChange(999)}
            className={`px-4 py-2 rounded-md transition-colors ${
              userId === 999
                ? "bg-red-600 text-white"
                : "bg-white text-red-600 border border-red-600 hover:bg-red-50"
            }`}
          >
            Test Error (User 999)
          </button>
        </div>
        <p className="text-blue-700 text-sm">
          Try different users to see how use() handles promises. User 999 will
          trigger an error to demonstrate error handling.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <PromiseErrorBoundary
          fallback={
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                Error Loading User
              </h3>
              <p className="text-red-700">
                Failed to load user data. Please try a different user.
              </p>
            </div>
          }
        >
          <Suspense fallback={<LoadingCard title="User Profile" />}>
            <UserProfile userPromise={userPromise} />
          </Suspense>
        </PromiseErrorBoundary>

        <Suspense fallback={<WeatherLoading />}>
          <WeatherWidget weatherPromise={weatherPromise} />
        </Suspense>
      </div>
    </div>
  );
};

const fetchUserData = async (userId: number): Promise<User> => {
  await new Promise((resolve) =>
    setTimeout(resolve, 1000 + Math.random() * 1000)
  );
  if (userId === 999) {
    throw new Error("User not found");
  }
  return {
    id: userId,
    name: `User ${userId}`,
    email: `user${userId}@example.com`,
  };
};

const UserProfile = ({ userPromise }: { userPromise: Promise<User> }) => {
  const user = use(userPromise);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">User Profile</h3>
      <div className="space-y-2">
        <p>
          <span className="font-medium">ID:</span> {user.id}
        </p>
        <p>
          <span className="font-medium">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-medium">Email:</span> {user.email}
        </p>
      </div>
    </div>
  );
};

const fetchWeatherData = async (): Promise<Weather> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const conditions = ["Sunny", "Cloudy", "Rainy", "Snowy"] as const;
  return {
    temperature: Math.floor(Math.random() * 30) + 10,
    condition: conditions[Math.floor(Math.random() * conditions.length)],
    city: "New York",
  };
};

const WeatherWidget = ({
  weatherPromise,
}: {
  weatherPromise: Promise<Weather>;
}) => {
  const weather = use(weatherPromise);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "Sunny":
        return "☀️";
      case "Cloudy":
        return "☁️";
      case "Rainy":
        return "🌧️";
      case "Snowy":
        return "❄️";
      default:
        return "🌤️";
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-3">Weather Update</h3>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold">{weather.temperature}°C</p>
          <p className="text-blue-100">{weather.city}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl mb-1">
            {getWeatherIcon(weather.condition)}
          </div>
          <p className="text-blue-100">{weather.condition}</p>
        </div>
      </div>
    </div>
  );
};

const LoadingCard = ({ title }: { title: string }) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
    <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
    <div className="animate-pulse space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  </div>
);

const WeatherLoading = () => (
  <div className="bg-gray-300 p-6 rounded-lg shadow-sm animate-pulse">
    <div className="h-6 bg-gray-400 rounded w-1/3 mb-3"></div>
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <div className="h-8 bg-gray-400 rounded w-16"></div>
        <div className="h-4 bg-gray-400 rounded w-20"></div>
      </div>
      <div className="space-y-2">
        <div className="h-8 w-8 bg-gray-400 rounded"></div>
        <div className="h-4 bg-gray-400 rounded w-16"></div>
      </div>
    </div>
  </div>
);

class PromiseErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log("Promise Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

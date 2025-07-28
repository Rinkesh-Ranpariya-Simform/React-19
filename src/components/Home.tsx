import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: "⚡",
    title: "Actions",
    description:
      "Handle form submissions and server-side processing with progressive enhancement.",
    link: "View details →",
    route: "/actions",
  },
  {
    icon: "🔗",
    title: "useActionState",
    description:
      "Simplify form state management with reduced boilerplate compared to useReducer.",
    link: "View details →",
    route: "/use-action-state",
  },
  {
    icon: "📊",
    title: "useFormStatus",
    description:
      "Manage form submission states with loading indicators and prevent double submissions.",
    link: "View details →",
    route: "/use-form-status",
  },
  {
    icon: "✨",
    title: "useOptimistic",
    description:
      "Create instant UI updates before server confirmation for a smoother experience.",
    link: "View details →",
    route: "/use-optimistic",
  },
  {
    icon: "💬",
    title: "Refs as Props",
    description:
      "Pass refs as regular props to components for more flexible DOM access.",
    link: "View details →",
    route: "/refs-as-props",
  },
  {
    icon: "</>",
    title: "use() with Promises",
    description:
      "Consume promises directly in components for simpler data fetching patterns.",
    link: "View details →",
    route: "/use-with-promises",
  },
  {
    icon: "📚",
    title: "use() with Context",
    description:
      "Read context values conditionally without useContext limitations.",
    link: "View details →",
    route: "/use-with-context",
  },
];

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <button
              key={feature.title}
              className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-8 border border-gray-200 text-left w-full cursor-pointer`}
              onClick={() => navigate(feature.route)}
            >
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-2xl mb-6">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {feature.description}
              </p>

              <div className="text-gray-700 text-sm font-medium hover:text-gray-900 transition-colors duration-200 inline-flex items-center">
                {feature.link}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

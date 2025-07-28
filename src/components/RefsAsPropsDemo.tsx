import React, { useRef } from "react";

export const RefsAsPropsDemo = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Refs as Props
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            React 19 simplifies ref handling by allowing function components to
            receive refs as regular props, eliminating the need for forwardRef
            in most cases.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            What's New in React 19?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-green-700">
                ✅ React 19 Way
              </h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <pre className="text-sm text-green-800 overflow-x-auto">
                  {`const Input = ({ ref, ...props }) => {
  return <input ref={ref} {...props} />;
};

// Usage
<Input ref={inputRef} />`}
                </pre>
              </div>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• No forwardRef needed</li>
                <li>• Simpler component code</li>
                <li>• Better TypeScript experience</li>
                <li>• Reduced boilerplate</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-orange-700">
                ⚠️ Legacy Way
              </h3>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <pre className="text-sm text-orange-800 overflow-x-auto">
                  {`const Input = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

// Usage
<Input ref={inputRef} />`}
                </pre>
              </div>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Requires forwardRef wrapper</li>
                <li>• More complex component code</li>
                <li>• displayName needed for debugging</li>
                <li>• Extra boilerplate</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <MultiRefDemo />
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">
            Key Benefits
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">
                Developer Experience
              </h3>
              <ul className="space-y-2 text-blue-700">
                <li>• Simpler component APIs</li>
                <li>• Better TypeScript inference</li>
                <li>• Less wrapper components</li>
                <li>• Cleaner code organization</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">
                Performance & Maintenance
              </h3>
              <ul className="space-y-2 text-blue-700">
                <li>• Reduced bundle size</li>
                <li>• Fewer component layers</li>
                <li>• Simplified debugging</li>
                <li>• Better component composition</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MultiRefDemo = () => {
  const input1Ref = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);

  const focusInput1 = () => {
    input1Ref.current?.focus();
  };

  const focusInput2 = () => {
    input2Ref.current?.focus();
  };

  const clearInputs = () => {
    if (input1Ref.current) input1Ref.current.value = "";
    if (input2Ref.current) input2Ref.current.value = "";
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">
        Multi-Ref Management Demo
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        <ModernInput
          ref={input1Ref}
          label="Modern Input (React 19)"
          placeholder="Type something here..."
        />

        <LegacyInput
          ref={input2Ref}
          label="Legacy Input (forwardRef)"
          placeholder="Type something here..."
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={focusInput1}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Focus Modern Input
        </button>
        <button
          onClick={focusInput2}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Focus Legacy Input
        </button>
        <button
          onClick={clearInputs}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Clear Inputs
        </button>
      </div>
    </div>
  );
};

const ModernInput = ({
  ref,
  label,
  placeholder,
  ...props
}: {
  ref?: React.Ref<HTMLInputElement>;
  label: string;
  placeholder: string;
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        {...props}
      />
    </div>
  );
};

const LegacyInput = React.forwardRef<
  HTMLInputElement,
  {
    label: string;
    placeholder: string;
  }
>(({ label, placeholder, ...props }, ref) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        {...props}
      />
    </div>
  );
});

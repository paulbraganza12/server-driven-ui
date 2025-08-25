type RetryProps = {
  handleRetry: () => void;
  title?: string;
  message?: string;
};

export const Retry = ({
  handleRetry,
  title = "Something went wrong",
  message = "Please try again later",
}: RetryProps) => {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-8 px-4" data-testid="ui-retry">
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center max-w-md">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.966-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
          <p className="text-red-600 mb-4">{message}</p>
          <button
            onClick={handleRetry}
            aria-label="Retry"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
};

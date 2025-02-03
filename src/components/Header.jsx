export const Header = () => {
    return (
      <header className="bg-[#ccbed7] shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold min-[640px]:text-2xl max-[1023px]:text-[20px]">
            My TodoApp
          </h1>
          {username && (
            <div className="flex items-center space-x-4">
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
    );
  };
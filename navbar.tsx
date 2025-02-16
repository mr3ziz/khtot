import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export default function Navbar() {
  const { user, logoutMutation } = useAuth();

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/">
              <a className="flex items-center">
                <img
                  src="https://www2.0zz0.com/2025/02/16/18/411372336.png"
                  alt="Saudia Airlines Logo"
                  className="h-8"
                />
              </a>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-700">
                  Welcome, {user.name}
                </span>
                <Button
                  variant="outline"
                  onClick={() => logoutMutation.mutate()}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/auth">
                <Button variant="outline">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
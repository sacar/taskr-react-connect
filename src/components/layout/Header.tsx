import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { LogOut, CheckSquare } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="glass border-b border-border/20 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CheckSquare size={32} className="text-primary" />
          <h1 className="text-2xl font-bold gradient-text">TaskFlow</h1>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">Welcome back,</p>
              <p className="text-sm text-muted-foreground">{user.name}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={logout}
              className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
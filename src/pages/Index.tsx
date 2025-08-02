import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { AuthPage } from './AuthPage';
import { TasksPage } from './TasksPage';
import { Header } from '@/components/layout/Header';

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <TasksPage />
    </div>
  );
};

export default Index;

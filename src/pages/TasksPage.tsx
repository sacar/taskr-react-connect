import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { FIND_ALL_TASKS } from '@/graphql/queries';
import { UPDATE_TASK } from '@/graphql/mutations';
import { TaskCard } from '@/components/tasks/TaskCard';
import { CreateTaskForm } from '@/components/tasks/CreateTaskForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Task, UpdateTaskInput } from '@/types/graphql';
import { useToast } from '@/hooks/use-toast';
import { Search, Filter } from 'lucide-react';

export const TasksPage: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed'>('all');

  const { data, loading, error } = useQuery(FIND_ALL_TASKS);
  const [updateTask] = useMutation(UPDATE_TASK, {
    refetchQueries: [{ query: FIND_ALL_TASKS }],
  });

  const tasks: Task[] = data?.findAllTasks || [];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' ||
                         (filterStatus === 'completed' && task.isCompleted) ||
                         (filterStatus === 'pending' && !task.isCompleted);
    
    return matchesSearch && matchesFilter;
  });

  const handleToggleComplete = async (task: Task) => {
    try {
      await updateTask({
        variables: {
          input: {
            // Note: Your schema doesn't include ID in the task response
            // You'll need to modify this based on your actual schema
            id: 'temp-id', // This needs to be updated based on your schema
            isCompleted: !task.isCompleted
          } as UpdateTaskInput
        }
      });

      toast({
        title: task.isCompleted ? "Task marked as pending" : "Task completed!",
        description: `"${task.title}" has been updated.`,
      });
    } catch (error: any) {
      toast({
        title: "Error updating task",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (task: Task) => {
    // Implementation for editing tasks would go here
    toast({
      title: "Edit functionality",
      description: "Edit feature coming soon!",
    });
  };

  const handleDelete = (task: Task) => {
    // Implementation for deleting tasks would go here
    toast({
      title: "Delete functionality",
      description: "Delete feature coming soon!",
    });
  };

  const completedCount = tasks.filter(task => task.isCompleted).length;
  const pendingCount = tasks.filter(task => !task.isCompleted).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Error Loading Tasks</h2>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass card-glow p-6 text-center">
          <h3 className="text-2xl font-bold text-foreground">{tasks.length}</h3>
          <p className="text-muted-foreground">Total Tasks</p>
        </div>
        <div className="glass card-glow p-6 text-center">
          <h3 className="text-2xl font-bold text-warning">{pendingCount}</h3>
          <p className="text-muted-foreground">Pending</p>
        </div>
        <div className="glass card-glow p-6 text-center">
          <h3 className="text-2xl font-bold text-success">{completedCount}</h3>
          <p className="text-muted-foreground">Completed</p>
        </div>
      </div>

      {/* Create Task Form */}
      <CreateTaskForm />

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-muted/50 border-border/50"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('all')}
            size="sm"
          >
            <Filter size={16} />
            All
          </Button>
          <Button
            variant={filterStatus === 'pending' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('pending')}
            size="sm"
          >
            Pending
          </Button>
          <Button
            variant={filterStatus === 'completed' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('completed')}
            size="sm"
          >
            Completed
          </Button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              {searchTerm || filterStatus !== 'all' ? 'No tasks match your criteria' : 'No tasks yet'}
            </h3>
            <p className="text-muted-foreground">
              {searchTerm || filterStatus !== 'all' ? 'Try adjusting your search or filter' : 'Create your first task above to get started!'}
            </p>
          </div>
        ) : (
          filteredTasks.map((task, index) => (
            <TaskCard
              key={index}
              task={task}
              onToggleComplete={() => handleToggleComplete(task)}
              onEdit={() => handleEdit(task)}
              onDelete={() => handleDelete(task)}
            />
          ))
        )}
      </div>
    </div>
  );
};
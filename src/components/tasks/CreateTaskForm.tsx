import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMutation } from '@apollo/client';
import { CREATE_TASK } from '@/graphql/mutations';
import { FIND_ALL_TASKS } from '@/graphql/queries';
import { CreateTaskDto } from '@/types/graphql';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

export const CreateTaskForm: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isCompleted: false,
  });
  const [loading, setLoading] = useState(false);

  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: FIND_ALL_TASKS }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createTask({
        variables: {
          createTaskDto: formData as CreateTaskDto
        }
      });

      setFormData({ title: '', description: '', isCompleted: false });
      toast({
        title: "Task created!",
        description: "Your new task has been added successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error creating task",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Card className="glass card-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Plus size={24} />
          Create New Task
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter task title"
              value={formData.title}
              onChange={handleChange}
              required
              className="bg-muted/50 border-border/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter task description"
              value={formData.description}
              onChange={handleChange}
              required
              className="bg-muted/50 border-border/50 min-h-24"
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading || !formData.title.trim()}
            className="w-full"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
            ) : (
              <>
                <Plus size={18} />
                Create Task
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
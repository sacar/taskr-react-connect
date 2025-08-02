import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Edit, Trash2 } from 'lucide-react';
import { Task } from '@/types/graphql';

interface TaskCardProps {
  task: Task;
  onToggleComplete: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete 
}) => {
  return (
    <Card className={`glass card-glow transition-all duration-300 hover:shadow-lg ${
      task.isCompleted ? 'opacity-75' : ''
    }`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={onToggleComplete}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                  task.isCompleted
                    ? 'bg-success border-success text-success-foreground'
                    : 'border-border hover:border-primary'
                }`}
              >
                {task.isCompleted && <Check size={14} />}
              </button>
              <h3 className={`font-semibold text-lg ${
                task.isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'
              }`}>
                {task.title}
              </h3>
              <Badge variant={task.isCompleted ? "secondary" : "default"}>
                {task.isCompleted ? 'Completed' : 'Pending'}
              </Badge>
            </div>
            <p className={`text-muted-foreground ${
              task.isCompleted ? 'line-through' : ''
            }`}>
              {task.description}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onEdit}
              className="h-8 w-8 hover:bg-primary/10"
            >
              <Edit size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onDelete}
              className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
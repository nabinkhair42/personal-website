import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Author } from "@/lib/markdown";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AvatarGroup({ users, max = 3 }: { users: Author[]; max?: number }) {
  const displayUsers = users.slice(0, max);
  const remainingUsers = Math.max(users.length - max, 0);

  return (
    <div className="flex items-center -space-x-2">
      <TooltipProvider>
        {displayUsers.map((user, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Avatar
                className="inline-block border-2 w-8 h-8 border-background"
              >
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback>
                  {user.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{user.username}</p>
            </TooltipContent>
          </Tooltip>
        ))}
        {remainingUsers > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="inline-block border-2 border-background bg-secondary text-secondary-foreground">
                <AvatarFallback>+{remainingUsers}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{remainingUsers} more {remainingUsers === 1 ? 'author' : 'authors'}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </TooltipProvider>
    </div>
  );
}


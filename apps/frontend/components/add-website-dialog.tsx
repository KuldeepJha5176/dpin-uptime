import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";

interface AddWebsiteDialogProps {
  onAddWebsite: (name: string, url: string) => void;
}

export function AddWebsiteDialog({ onAddWebsite }: AddWebsiteDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a website name",
        variant: "destructive",
      });
      return;
    }
    
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a website URL",
        variant: "destructive",
      });
      return;
    }
    
    // Basic URL validation
    let processedUrl = url;
    if (!processedUrl.startsWith("http://") && !processedUrl.startsWith("https://")) {
        processedUrl = `https://${processedUrl}`;
      }
      
      try {
        new URL(processedUrl);
      } catch (e) {
        toast({
          title: "Error",
          description: "Please enter a valid URL",
          variant: "destructive",
        });
        return;
      }
      
      onAddWebsite(name, processedUrl);
      setName("");
      setUrl("");
      setOpen(false);
      
      toast({
        title: "Success",
        description: "Website added successfully",
      });
    };
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2 px-5 font-medium transition-all duration-300">
            <PlusCircle className="h-4 w-4" />
            Add Website
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Add New Website</DialogTitle>
              <DialogDescription>
                Enter the details of the website you want to monitor
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="My Website"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Website</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
  
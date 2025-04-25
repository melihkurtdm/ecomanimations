
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const EmailCampaignManager = () => {
  const { toast } = useToast();

  const handleSendTestEmail = () => {
    toast({
      title: "Test email sent",
      description: "Check your inbox for the test campaign email",
    });
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Email Campaign Manager</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Campaign Name</label>
              <Input placeholder="Summer Sale 2025" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subject Line</label>
              <Input placeholder="Don't miss our biggest sale of the year!" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email Content</label>
              <Textarea 
                placeholder="Write your email content here..."
                className="min-h-[200px]"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSendTestEmail}>
                Send Test Email
              </Button>
              <Button>
                Schedule Campaign
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default EmailCampaignManager;

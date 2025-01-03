"use client";

import { Card, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";

interface TranscriptViewProps {
  messages: any[];
  className?: string;
  agentName?: string;
}

export function TranscriptView({ messages, className, agentName }: TranscriptViewProps) {
  if (!messages || messages.length === 0) {
    return <p>No transcript available.</p>;
  }

  return (
    <div className={className}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            Transcript
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
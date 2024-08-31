"use client";

import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function ChatTextEditer() {
  const [text, setText] = useState<string>("");

  return (
    <Textarea
      className="max-h-[200px] resize-none overflow-auto"
      value={text}
      onChange={(e) => setText(e.target.value)}
      rows={5}
      placeholder=""
    />
  );
}

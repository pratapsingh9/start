import React, { useState, useEffect, useRef, useCallback } from "react";

interface TerminalProps {
  output: string;
}
type Command = (args: string[]) => void;

interface Commands {
  [key: string]: Command;
}

const Terminal: React.FC<TerminalProps> = ({ ouput }:any) => {
  const [history, sethistory] = useState([]);
  const [currentLine, setCurrentLine] = useState<string>("");
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

    // function
    const scrollToBottom = useCallback(()=>{

    },[])

  return(
    <div>
    </div>
  )
};

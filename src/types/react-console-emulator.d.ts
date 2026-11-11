declare module 'react-console-emulator' {
  import { Component } from 'react';
  import type { CSSProperties, ReactNode } from 'react';
  interface ConsoleProps {
    commands: Record<string, { description: string; usage?: string; fn: (...args: string[]) => ReactNode }>;
    welcomeMessage?: ReactNode;
    promptLabel?: string;
    errorText?: string;
    autoFocus?: boolean;
    noDefaults?: boolean;
    noNewlineParsing?: boolean;
    ignoreCommandCase?: boolean;
    className?: string;
    inputClassName?: string;
    inputAreaClassName?: string;
    messageClassName?: string;
    style?: CSSProperties;
    contentStyle?: CSSProperties;
    inputStyle?: CSSProperties;
    inputAreaStyle?: CSSProperties;
    promptLabelStyle?: CSSProperties;
    messageStyle?: CSSProperties;
  }
  export default class Terminal extends Component<ConsoleProps> {
    clearStdout(): void;
    clearInput(): void;
    scrollToBottom(): void;
    pushToStdout(message: ReactNode, options?: { rawInput: string }): void;
  }
}

declare module 'staticrypt/lib/cryptoEngine.js' {
  const engine: {
    hashPassword(password: string, salt: string): Promise<string>;
  };
  export default engine;
}

declare module 'staticrypt/lib/codec.js' {
  interface DecodeResult {
    success: boolean;
    decoded?: string;
    message?: string;
  }
  const codec: {
    init(engine: unknown): {
      decode(message: string, passwordHash: string, salt: string): Promise<DecodeResult>;
    };
  };
  export default codec;
}

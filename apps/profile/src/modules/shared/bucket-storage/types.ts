export interface ModuleOptions {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
}

export interface ModuleAsyncOptions {
  imports?: any[];
  useFactory?: (...args: any[]) => Promise<ModuleOptions>;
  inject?: any[];
}

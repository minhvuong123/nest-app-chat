declare namespace NodeJS {
  export interface ProcessEnv {
    MSQL_DB_HOST?: string;
    MSQL_DB_USERNAME?: string;
    MSQL_DB_PASSWORD?: string;
    MSQL_DB_PORT?: string;
    MSQL_DB_DATABASE?: string;
  }
}

export interface ApiTesterRequestEntity {
  method: string;
  url: string;
  headers: { key: string; value: string }[];
  bodyType: string;
  body?: string;
  graphql?: {
    query: string;
    variables?: Record<string, unknown>;
    operationName?: string;
  };
  timeout?: number;
}

export interface SavedRequestEntity {
  id?: string;
  name: string;
  description?: string;
  tags?: string[];
  request: ApiTesterRequestEntity;
  userId?: string;
  createdAt?: Date;
}

export const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};

export type HttpStatusCode =
  (typeof HttpStatusCode)[keyof typeof HttpStatusCode];

export const API_PATHS = {
  ADMIN: {
    AUTH: {
      DEFAULT: "api/auth",
      SWITCH_CONTEXT: "api/auth/switch-context",
      REFRESH_TOKEN: "/api/auth/refresh-token",
      LOGOUT: "api/auth/logout",
    },
    CUSTOMER: {
      CUSTOMERS_01: "api/customers/register",
      CUSTOMERS_02: "api/customers",
      CUSTOMERS_03: "api/customers/search",
      CUSTOMERS_0456: (customerId: string) => `api/customers/${customerId}`,
      CUSTOMERS_07: (customerId: string) =>
        `api/customers/${customerId}/restore`,
      CUSTOMERS_08: (customerId: string) =>
        `api/customers/${customerId}/status`,
      CUSTOMERS_09: (keyword: string) => `api/customers/find?
      keyword=${keyword}`,
    },
  },
  CLIENT: {
    AUTH: {
      DEFAULT: "api/customer-auth",
      REFRESH_TOKEN: "/api/customer-auth/refresh-token",
      LOGOUT: "api/customer-auth/logout",
    },
    PUBLIC: {
      CLIENT_01: "/api/clients/franchises",
      CLIENT_02: (franchiseId: string) =>
        `/api/clients/franchises/${franchiseId}/categories`,
      CLIENT_03: (franchiseId: string, categoryId?: string) =>
        `/api/clients/menu?franchiseId=${franchiseId}&categoryId=${categoryId ?? ""}`,
      CLIENT_04: (franchiseId: string, categoryId?: string) =>
        `/api/clients/products?franchiseId=${franchiseId}&categoryId=${categoryId ?? ""}`,
      CLIENT_05: (franchiseId: string, productId: string) =>
        `/api/clients/franchises/${franchiseId}/products/${productId}`,
      CLIENT_06: (franchiseId: string) =>
        `/api/clients/franchises/${franchiseId}`,
    },
  },
};

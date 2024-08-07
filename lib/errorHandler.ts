// lib/errorHandler.ts

type AuthErrorMessages = {
  [key: string]: string;
  CLIENT_SESSION_ERROR: string;
  CLIENT_FETCH_ERROR: string;
  OAUTH_GET_ACCESS_TOKEN_ERROR: string;
  OAUTH_V1_GET_ACCESS_TOKEN_ERROR: string;
  OAUTH_GET_PROFILE_ERROR: string;
  OAUTH_PARSE_PROFILE_ERROR: string;
  OAUTH_CALLBACK_HANDLER_ERROR: string;
  SIGNIN_OAUTH_ERROR: string;
  OAUTH_CALLBACK_ERROR: string;
  SIGNIN_EMAIL_ERROR: string;
  CALLBACK_EMAIL_ERROR: string;
  EMAIL_REQUIRES_ADAPTER_ERROR: string;
  CALLBACK_CREDENTIALS_JWT_ERROR: string;
  CALLBACK_CREDENTIALS_HANDLER_ERROR: string;
  PKCE_ERROR: string;
  INVALID_CALLBACK_URL_ERROR: string;
  JWT_SESSION_ERROR: string;
  SESSION_ERROR: string;
  SIGNOUT_ERROR: string;
  MISSING_NEXTAUTH_API_ROUTE_ERROR: string;
  NO_SECRET: string;
  AUTH_ON_ERROR_PAGE_ERROR: string;
  'Incorrect password': string;
};

const authErrorMessages: AuthErrorMessages = {
  CLIENT_SESSION_ERROR:
    'There was a problem fetching session data. Please try again later.',
  CLIENT_FETCH_ERROR:
    'There was a problem fetching data from the server. Please check your configuration and try again.',
  OAUTH_GET_ACCESS_TOKEN_ERROR:
    'There was an error retrieving the access token. Please check your provider settings.',
  OAUTH_V1_GET_ACCESS_TOKEN_ERROR:
    'There was an error retrieving the access token for the OAuth v1.x provider. Please check your provider settings.',
  OAUTH_GET_PROFILE_ERROR:
    'There was an error retrieving the profile information. Please try again.',
  OAUTH_PARSE_PROFILE_ERROR:
    'There was an error parsing the profile information. This could be due to a provider response issue or user cancellation.',
  OAUTH_CALLBACK_HANDLER_ERROR:
    'There was an issue handling the OAuth callback. Please check the request and response data.',
  SIGNIN_OAUTH_ERROR:
    'There was an error during the OAuth sign-in process. Please check your OAuth configuration and cookie settings.',
  OAUTH_CALLBACK_ERROR:
    'There was an error during the OAuth callback handling. Please ensure the code verifier and state are correct.',
  SIGNIN_EMAIL_ERROR:
    'There was an error sending the sign-in email. Please check your email settings.',
  CALLBACK_EMAIL_ERROR:
    'There was an error during the email callback process. Please check your email settings and JWT configuration.',
  EMAIL_REQUIRES_ADAPTER_ERROR:
    'Email authentication requires a configured database to store verification tokens.',
  CALLBACK_CREDENTIALS_JWT_ERROR:
    'Credentials authentication requires JWT sessions. Please enable JWT sessions or manage users outside of NextAuth.js.',
  CALLBACK_CREDENTIALS_HANDLER_ERROR:
    'No authorize() handler defined for the credential authentication provider.',
  PKCE_ERROR:
    'There was an error setting up PKCE. Please check your PKCE configuration and cookies.',
  INVALID_CALLBACK_URL_ERROR:
    'The callback URL provided is either invalid or not defined. Please check your callback URL configuration.',
  JWT_SESSION_ERROR:
    'There was an error with the JWT session. Please check your NEXTAUTH_SECRET environment variable and session settings.',
  SESSION_ERROR: 'There was an error handling the session. Please try again.',
  SIGNOUT_ERROR:
    'There was an error during the sign-out process. Please try again.',
  MISSING_NEXTAUTH_API_ROUTE_ERROR:
    'The NextAuth.js API route is missing. Please ensure [...nextauth].ts/js is correctly placed inside pages/api/auth.',
  NO_SECRET:
    'In production, a secret property must be defined in your configuration. Please set NEXTAUTH_SECRET in your environment variables.',
  AUTH_ON_ERROR_PAGE_ERROR:
    'There was an error with your custom error page requiring authentication. Please check your middleware and page configuration.',
  'Incorrect password': 'Username or password is not valid, Please try again.',
};

export function getAuthErrorMessage(errorCode: string): string {
  return (
    authErrorMessages[errorCode] ||
    'An unknown error occurred. Please try again later.'
  );
}

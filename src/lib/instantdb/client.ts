/**
 * InstantDB client placeholder for future dynamic features.
 *
 * Rules:
 * - Never expose INSTANTDB_ADMIN_TOKEN to the client
 * - Never import admin SDK in client components
 * - Public app ID only, server-side admin actions only
 */

export const instantDbConfig = {
  appId: process.env.NEXT_PUBLIC_INSTANTDB_APP_ID ?? "",
  enabled: Boolean(process.env.NEXT_PUBLIC_INSTANTDB_APP_ID),
} as const;

export function isInstantDbConfigured(): boolean {
  return instantDbConfig.enabled;
}

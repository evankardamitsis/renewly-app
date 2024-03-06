import { useAuth } from "@clerk/clerk-react";

/**
 * A custom React hook that provides a method to asynchronously retrieve an authentication token using Clerk.
 *
 * @returns A function that can be called to asynchronously retrieve the token.
 */
export function useSupabaseToken() {
    // Hook into Clerk's useAuth to access the getToken method
    const { getToken } = useAuth();

    /**
     * Asynchronously retrieves the token, intended for use with Supabase.
     *
     * @returns {Promise<string | null>} A promise that resolves to the token if successful, or null if an error occurs.
     */
    const fetchToken = async (): Promise<string | null> => {
        try {
            const token = await getToken({ template: 'supabase' });

            return token;
        } catch (error) {
            console.error("Error retrieving token:", error);
            return null;
        }
    };

    return fetchToken;
}

export async function isPlatformAuthenticatorAvailable(): Promise<boolean> {
  if (!window.PublicKeyCredential) return false;
  try {
    const result = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    return !!result;
  } catch (error) {
    console.error('Error checking platform authenticator:', error);
    return false;
  }
} 
import { User } from "@stytch/core/public";

async function deleteUser(userId: string): Promise<any> {
  try {
    const response = await fetch('http://localhost:3001/delete_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_id: userId}),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
}
// eslint-disable-next-line
export const resetUserState = async (user: User | null, stytch: any) => {
  if (user === null) {
    return;
  }

  try {
    stytch.session.revoke();
    await deleteUser(user.user_id);
    window.location.href = "/login";
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};

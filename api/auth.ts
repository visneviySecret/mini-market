async function signup(email: string, password: string) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const message = (data && data.message) || "Ошибка регистрации";
    throw new Error(message);
  }
  return response.json();
}

async function login(email: string, password: string) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const message = (data && data.message) || "Ошибка авторизации";
    throw new Error(message);
  }
  return response.json();
}

export { signup, login };

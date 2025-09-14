export function handleGoogleLogin() {
  const width = 500;
  const height = 600;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;

  const popup = window.open(
    "http://localhost:4000/api/oauth", 
    "Google Login",
    `width=${width},height=${height},top=${top},left=${left}`
  );

    const timer = setInterval(() => {
    //@ts-ignore
    if (popup.closed) {
      clearInterval(timer);
      alert("Login tugadi, cookie o‘rnatildi!");
    }
  }, 500);
}

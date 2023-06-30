const publicKey =
  "BOQdADwEcpRQwOkfVopw8sn7tcslNyqmZQdql8peYS9jaUG6qlzf5X-cpo6rJhQWOWpdwomMRJxXvU80BUP4UIE";

if ("serviceWorker" in navigator) {
  console.log("wroking");
  send().catch((err) => console.error(err));
}

async function send() {
  console.log("registering service worker");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/",
  });
  console.log("registered service worker");

  console.log("registering push)");

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey),
  });
  console.log("registered push");

  console.log("send push notification");
  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: { "Content-Type": "application/json" },
  });
  console.log("sent push notification");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

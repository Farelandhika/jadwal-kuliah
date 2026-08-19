const CACHE_NAME = "college-planner-shell-v4";
const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.webmanifest",
  "./planner-icon.svg",
];
const REMINDER_DB = "college-planner-background";
const REMINDER_STORE = "reminders";
const PERIODIC_SYNC_TAG = "college-planner-reminders";

function openReminderDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(REMINDER_DB, 1);
    request.onupgradeneeded = () =>
      request.result.createObjectStore(REMINDER_STORE, { keyPath: "id" });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function replaceStoredReminders(reminders = []) {
  const database = await openReminderDatabase();
  await new Promise((resolve, reject) => {
    const transaction = database.transaction(REMINDER_STORE, "readwrite");
    const store = transaction.objectStore(REMINDER_STORE);
    store.clear();
    reminders.forEach((reminder) => store.put({ ...reminder, sent: false }));
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
}

async function readStoredReminders() {
  const database = await openReminderDatabase();
  return new Promise((resolve, reject) => {
    const request = database
      .transaction(REMINDER_STORE, "readonly")
      .objectStore(REMINDER_STORE)
      .getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

async function removeStoredReminder(id) {
  const database = await openReminderDatabase();
  await new Promise((resolve, reject) => {
    const transaction = database.transaction(REMINDER_STORE, "readwrite");
    transaction.objectStore(REMINDER_STORE).delete(id);
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;
  event.respondWith(
    caches.match(event.request).then((cached) =>
      cached ||
      fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }),
    ),
  );
});

function notificationOptions(reminder, scheduled = false) {
  const options = {
    body: reminder.body || "Your next class is about to begin.",
    icon: "./planner-icon.svg",
    badge: "./planner-icon.svg",
    tag: reminder.tag || "college-planner-reminder",
    renotify: true,
    requireInteraction: false,
    vibrate: reminder.silent ? undefined : [180, 80, 180],
    silent: Boolean(reminder.silent),
    data: { url: "./index.html", reminderId: reminder.id || "" },
  };

  if (scheduled && "TimestampTrigger" in self && reminder.timestamp) {
    options.showTrigger = new TimestampTrigger(reminder.timestamp);
  }
  return options;
}

async function showPlannerNotification(reminder, scheduled = false) {
  if (!("showNotification" in self.registration)) return;
  try {
    await self.registration.showNotification(
      reminder.title || "Class coming up ✨",
      notificationOptions(reminder, scheduled),
    );
  } catch {
    // A browser may expose the service worker but not notification triggers.
  }
}

async function scheduleReminders(reminders = []) {
  if (!("TimestampTrigger" in self)) return;
  const now = Date.now();
  const upcoming = reminders
    .filter((reminder) => Number(reminder.timestamp) > now + 1000)
    .slice(0, 40);
  await Promise.all(
    upcoming.map((reminder) => showPlannerNotification(reminder, true)),
  );
}

async function checkStoredReminders() {
  // Timestamp-triggered notifications already handle these reminders.
  if ("TimestampTrigger" in self) return;
  const reminders = await readStoredReminders();
  const now = Date.now();
  const due = reminders.filter(
    (reminder) => !reminder.sent && Number(reminder.timestamp) <= now,
  );
  await Promise.all(
    due.map(async (reminder) => {
      await showPlannerNotification(reminder);
      await removeStoredReminder(reminder.id);
    }),
  );
}

async function syncReminders(reminders = []) {
  await replaceStoredReminders(reminders);
  await scheduleReminders(reminders);
}

self.addEventListener("message", (event) => {
  const data = event.data || {};
  if (data.type === "SCHEDULE_REMINDERS") {
    event.waitUntil(
      syncReminders(data.reminders).then(() =>
        event.source?.postMessage({
          type: "BACKGROUND_REMINDERS_STATUS",
          timestampTriggers: "TimestampTrigger" in self,
        }),
      ),
    );
  }
  if (data.type === "SHOW_TEST_NOTIFICATION") {
    event.waitUntil(showPlannerNotification(data.reminder || {}));
  }
});

self.addEventListener("periodicsync", (event) => {
  if (event.tag === PERIODIC_SYNC_TAG)
    event.waitUntil(checkStoredReminders());
});

self.addEventListener("sync", (event) => {
  if (event.tag === PERIODIC_SYNC_TAG)
    event.waitUntil(checkStoredReminders());
});

self.addEventListener("push", (event) => {
  let reminder = {};
  try {
    reminder = event.data ? event.data.json() : {};
  } catch {
    reminder = { body: event.data?.text() || "Your next class is about to begin." };
  }
  event.waitUntil(showPlannerNotification(reminder));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const destination = event.notification.data?.url || "./index.html";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(
      (clients) => {
        const existing = clients.find((client) => "focus" in client);
        return existing ? existing.focus() : self.clients.openWindow(destination);
      },
    ),
  );
});

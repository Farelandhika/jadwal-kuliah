(() => {
  const baseSchedule = {
    Mon: [
      { subject: 'Toksikologi Lingkungan', start: '07:30', end: '09:15', room: 'C2.15' },
      { subject: 'Imunologi', start: '09:20', end: '11:05', room: 'C2.17' },
      { subject: 'Ornitologi', start: '13:55', end: '16:20', room: 'C2.14' }
    ],
    Tue: [{ subject: 'Karsinologi', start: '13:55', end: '16:20', room: 'C2.14' }],
    Wed: [
      { subject: 'Teratologi', start: '09:20', end: '11:05', room: 'C2.16' },
      { subject: 'Taksonomi Invertebrata', start: '11:10', end: '13:50', room: 'C2.14' },
      { subject: 'Morfometrika', start: '13:55', end: '16:20', room: 'Lab. 6' }
    ],
    Thu: [
      { subject: 'Biokimia Vitamin', start: '09:20', end: '11:05', room: 'Lab. 5' },
      { subject: 'Pengantar Biologi Kanker', start: '11:10', end: '13:50', room: 'C2.16' }
    ],
    Fri: [
      { subject: 'Pengelolaan Sumber Daya Alam dan Lingkungan', start: '07:30', end: '09:15', room: 'C2.16' },
      { subject: 'Botani Forensik', start: '09:20', end: '11:10', room: 'C2.16' },
      { subject: 'Kemotaksonomi', start: '13:00', end: '14:45', room: 'C2.14' }
    ]
  };
  const dayKeys = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayNames = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday' };
  const schedule = JSON.parse(localStorage.getItem('collegePlannerSchedule') || 'null') || JSON.parse(JSON.stringify(baseSchedule));
  let activeDay = dayKeys[new Date().getDay()];
  if (!schedule[activeDay]) activeDay = 'Mon';
  let calendarDate = new Date();
  const reminderMinutes = 15;
  let remindersEnabled = localStorage.getItem('collegePlannerReminders') !== 'off';
  let notifiedReminders = {};
  try { notifiedReminders = JSON.parse(localStorage.getItem('collegePlannerNotified') || '{}') || {}; } catch { notifiedReminders = {}; }

  const $ = (id) => document.getElementById(id);
  const pad = (n) => String(n).padStart(2, '0');
  const toMinutes = (time) => { const [h, m] = time.split(':').map(Number); return h * 60 + m; };
  const formatTime = (time) => time.replace(':', '.');
  const getTodayKey = () => dayKeys[new Date().getDay()];
  const getClassState = (item, day = getTodayKey()) => {
    if (day !== getTodayKey()) return 'upcoming';
    const now = new Date(); const mins = now.getHours() * 60 + now.getMinutes();
    if (mins < toMinutes(item.start)) return 'upcoming';
    if (mins >= toMinutes(item.end)) return 'done';
    return 'live';
  };
  const statusLabel = (state) => state === 'live' ? '● Live now' : state === 'done' ? '✓ Completed' : '● Upcoming';
  const dateKey = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

  function saveReminderState() {
    localStorage.setItem('collegePlannerReminders', remindersEnabled ? 'on' : 'off');
    localStorage.setItem('collegePlannerNotified', JSON.stringify(notifiedReminders));
  }

  function updateReminderButton() {
    const button = $('notificationButton');
    if (!button) return;
    const browserSupported = 'Notification' in window;
    const permission = browserSupported ? Notification.permission : 'unsupported';
    const active = remindersEnabled && permission !== 'denied';
    button.classList.toggle('is-enabled', active);
    button.classList.toggle('is-denied', permission === 'denied');
    button.setAttribute('aria-pressed', String(active));
    button.title = permission === 'denied' ? 'Browser notifications are blocked — in-app reminders still work' : active ? `Class reminders on · ${reminderMinutes} minutes before class` : 'Enable class reminders';
  }

  function showNotificationToast(title, message) {
    const toast = $('notificationToast');
    if (!toast) return;
    toast.querySelector('.toast-copy strong').textContent = title;
    toast.querySelector('.toast-copy p').textContent = message;
    toast.classList.add('show');
    clearTimeout(showNotificationToast.timer);
    showNotificationToast.timer = setTimeout(() => toast.classList.remove('show'), 9000);
  }

  function hideNotificationToast() {
    const toast = $('notificationToast');
    if (toast) toast.classList.remove('show');
    clearTimeout(showNotificationToast.timer);
  }

  async function enableReminders() {
    if (!('Notification' in window)) {
      remindersEnabled = true;
      saveReminderState();
      updateReminderButton();
      showNotificationToast('Reminders are ready ♡', 'This browser will show a soft reminder 15 minutes before class.');
      return;
    }
    if (Notification.permission === 'denied') {
      remindersEnabled = true;
      saveReminderState();
      updateReminderButton();
      showNotificationToast('In-app reminders are still on', 'Allow notifications in your browser settings for lock-screen alerts.');
      return;
    }
    let permission = Notification.permission;
    try { if (permission === 'default') permission = await Notification.requestPermission(); } catch { permission = 'denied'; }
    remindersEnabled = true;
    saveReminderState();
    updateReminderButton();
    showNotificationToast(permission === 'granted' ? 'Class reminders enabled ✨' : 'In-app reminders are on ♡', permission === 'granted' ? `You will get an alert ${reminderMinutes} minutes before class.` : 'You can enable browser alerts later from the address-bar settings.');
  }

  function sendClassReminder(item, startTime, key) {
    if (notifiedReminders[key]) return;
    notifiedReminders[key] = Date.now();
    const message = `${item.subject} starts at ${formatTime(startTime)} in ${item.room}.`;
    showNotificationToast('Class coming up ✨', message);
    if ('Notification' in window && Notification.permission === 'granted') {
      try { new Notification(`Class coming up · ${item.subject}`, { body: `Starts at ${formatTime(startTime)} in ${item.room}.`, tag: key }); } catch { /* Browser may block notifications in file mode. */ }
    }
    const cutoff = Date.now() - (1000 * 60 * 60 * 24 * 14);
    Object.keys(notifiedReminders).forEach(storedKey => { if (notifiedReminders[storedKey] < cutoff) delete notifiedReminders[storedKey]; });
    saveReminderState();
  }

  function checkClassReminders() {
    if (!remindersEnabled) return;
    const now = new Date();
    const items = schedule[getTodayKey()] || [];
    items.forEach(item => {
      const [hours, minutes] = item.start.split(':').map(Number);
      const start = new Date(now);
      start.setHours(hours, minutes, 0, 0);
      const minutesUntilStart = (start - now) / 60000;
      if (minutesUntilStart > 0 && minutesUntilStart <= reminderMinutes) sendClassReminder(item, item.start, `${dateKey(now)}-${item.start}-${item.subject}`);
    });
  }

  function updateDateCopy() {
    const now = new Date();
    const full = new Intl.DateTimeFormat('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(now);
    const short = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'short' }).format(now).toUpperCase();
    document.querySelector('.hero-section .eyebrow').innerHTML = `${full} <span>✦</span>`;
    $('todayChip').textContent = short;
  }

  function allClasses() { return Object.entries(schedule).flatMap(([day, items]) => items.map(item => ({ ...item, day }))); }
  function renderToday() {
    const list = $("todayClasses"); const today = schedule[getTodayKey()] || [];
    if (!today.length) { list.innerHTML = '<div class="empty-state"><span>☁︎</span>A quiet day today — enjoy your soft reset ♡</div>'; return; }
    list.innerHTML = today.map(item => { const state = getClassState(item); return `<article class="class-card"><div class="class-time">${formatTime(item.start)} —<br>${formatTime(item.end)}</div><div class="class-info"><h3>${item.subject} <span class="heart-accent">♡</span></h3><p>${item.room}</p></div><span class="class-status status-${state}">${statusLabel(state)}</span></article>`; }).join('');
  }

  function renderWeekly() {
    const list = $('weeklyList'); const items = schedule[activeDay] || [];
    if (!items.length) { list.innerHTML = '<div class="empty-state"><span>✿</span>No classes planned for this day yet.</div>'; return; }
    list.innerHTML = items.map((item, index) => `<div class="week-item"><span class="time">${formatTime(item.start)} — ${formatTime(item.end)}</span><span class="subject">${item.subject}</span><span class="room">${item.room}</span>${item.custom ? `<button class="delete-class" data-day="${activeDay}" data-index="${index}" title="Remove class">×</button>` : ''}</div>`).join('');
    list.querySelectorAll('.delete-class').forEach(btn => btn.addEventListener('click', () => { schedule[btn.dataset.day].splice(Number(btn.dataset.index), 1); saveSchedule(); renderWeekly(); renderToday(); renderCalendar(); updateNextClass(); }));
  }

  function findNextClass() {
    const now = new Date(); const todayKey = getTodayKey(); const nowMins = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
    const todayItems = (schedule[todayKey] || []).map(item => ({ ...item, day: todayKey })).sort((a,b) => toMinutes(a.start) - toMinutes(b.start));
    const upcoming = todayItems.find(item => nowMins < toMinutes(item.end));
    if (upcoming) return { ...upcoming, offset: 0 };
    for (let offset = 1; offset <= 7; offset++) { const key = dayKeys[(now.getDay() + offset) % 7]; if (schedule[key]?.length) return { ...schedule[key][0], day: key, offset }; }
    return null;
  }

  function updateNextClass() {
    const holder = $('nextClassContent'); const next = findNextClass();
    if (!next) { holder.innerHTML = '<div class="next-main"><h3>Nothing scheduled</h3><p class="next-room">Add a class to keep your week blooming ♡</p></div>'; return; }
    const now = new Date(); const currentDay = getTodayKey(); const state = next.day === currentDay ? getClassState(next) : 'upcoming';
    const label = state === 'live' ? '♡ CLASS IS LIVE' : state === 'done' ? '✓ Completed' : `Starts ${next.offset ? `on ${dayNames[next.day]}` : 'soon'}`;
    holder.innerHTML = `<div class="next-main"><h3>${next.subject}</h3><div class="next-time">${formatTime(next.start)} — ${formatTime(next.end)}</div><p class="next-room">Room ${next.room}</p><p class="countdown-label">${state === 'live' ? 'Ends in' : 'Starts in'}</p><div class="countdown" id="countdown">--h --m --s</div><span class="next-state">${label}</span></div>`;
    updateCountdown(next);
  }

  function updateCountdown(next = findNextClass()) {
    const el = $('countdown'); if (!el || !next) return;
    const now = new Date(); const target = new Date(now); const currentKey = getTodayKey();
    let diff;
    if (next.day === currentKey) {
      const currentMins = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
      const isLive = currentMins >= toMinutes(next.start) && currentMins < toMinutes(next.end);
      const targetMins = isLive ? toMinutes(next.end) : toMinutes(next.start);
      target.setHours(Math.floor(targetMins / 60), targetMins % 60, isLive ? 0 : 0, 0); diff = target - now;
    } else {
      const targetIndex = dayKeys.indexOf(next.day); const currentIndex = now.getDay(); let dayDiff = (targetIndex - currentIndex + 7) % 7; if (dayDiff === 0) dayDiff = 7;
      target.setDate(target.getDate() + dayDiff); const [h,m] = next.start.split(':').map(Number); target.setHours(h,m,0,0); diff = target - now;
    }
    if (diff < 0) diff = 0;
    const total = Math.floor(diff / 1000); const h = Math.floor(total / 3600); const m = Math.floor((total % 3600) / 60); const s = total % 60;
    el.textContent = `${pad(h)}h ${pad(m)}m ${pad(s)}s`;
    const state = next.day === currentKey ? getClassState(next) : 'upcoming';
    const progressBar = $('progressBar'); const progressPercent = $('progressPercent'); const progressStatus = $('progressStatus');
    if (state === 'live') { const elapsed = (new Date() - new Date(new Date().setHours(...next.start.split(':').map(Number), 0, 0))) / 1000; const totalDuration = (toMinutes(next.end) - toMinutes(next.start)) * 60; const pct = Math.max(0, Math.min(100, Math.round(elapsed / totalDuration * 100))); progressBar.style.width = `${pct}%`; progressPercent.textContent = `${pct}%`; progressStatus.textContent = `${next.subject} is in motion — keep going, lovely.`; } else { progressBar.style.width = '0%'; progressPercent.textContent = '—'; progressStatus.textContent = 'Your progress will appear when a class is live.'; }
  }

  function renderCalendar() {
    const grid = $('calendarGrid'); const year = calendarDate.getFullYear(); const month = calendarDate.getMonth(); const first = new Date(year, month, 1); const daysInMonth = new Date(year, month + 1, 0).getDate(); const start = (first.getDay() + 6) % 7; const now = new Date();
    $('calendar-title').firstChild.textContent = `${calendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} `;
    let html = ''; for (let i = 0; i < start; i++) html += '<span class="calendar-day muted"></span>';
    for (let day = 1; day <= daysInMonth; day++) { const date = new Date(year, month, day); const key = dayKeys[date.getDay()]; const today = date.toDateString() === now.toDateString(); const hasClass = Boolean(schedule[key]?.length); html += `<span class="calendar-day ${today ? 'today' : ''} ${hasClass ? 'has-class' : ''}">${day}</span>`; }
    grid.innerHTML = html;
  }

  function saveSchedule() { localStorage.setItem('collegePlannerSchedule', JSON.stringify(schedule)); }
  function openModal() { $('modal').classList.add('open'); $('modal').setAttribute('aria-hidden', 'false'); setTimeout(() => document.querySelector('#classForm input[name="subject"]').focus(), 80); }
  function closeModal() { $('modal').classList.remove('open'); $('modal').setAttribute('aria-hidden', 'true'); $('classForm').reset(); }
  function renderSearch(query = '') { const results = $('searchResults'); const q = query.trim().toLowerCase(); if (!q) { results.innerHTML = '<p class="muted-text">Type to search across your whole week ✨</p>'; return; } const matches = allClasses().filter(item => `${item.subject} ${item.room} ${item.day} ${item.start} ${item.end}`.toLowerCase().includes(q)); results.innerHTML = matches.length ? matches.map(item => `<div class="result-item"><strong>${item.subject}</strong><small>${dayNames[item.day] || item.day} · ${formatTime(item.start)}–${formatTime(item.end)} · ${item.room}</small></div>`).join('') : '<p class="muted-text">No classes found. Try another little keyword ♡</p>'; }

  document.querySelectorAll('.day-tab').forEach(tab => tab.addEventListener('click', () => { activeDay = tab.dataset.day; document.querySelectorAll('.day-tab').forEach(t => t.classList.toggle('active', t === tab)); renderWeekly(); }));
  document.querySelectorAll('.theme-toggle').forEach(btn => btn.addEventListener('click', () => { document.body.classList.toggle('dark'); localStorage.setItem('collegePlannerTheme', document.body.classList.contains('dark') ? 'dark' : 'light'); }));
  document.querySelectorAll('.search-trigger').forEach(btn => btn.addEventListener('click', () => { $('searchOverlay').classList.add('open'); $('searchOverlay').setAttribute('aria-hidden', 'false'); setTimeout(() => $('searchInput').focus(), 100); }));
  $('notificationButton')?.addEventListener('click', () => {
    if (remindersEnabled && 'Notification' in window && Notification.permission === 'default') { enableReminders(); return; }
    if (remindersEnabled) {
      remindersEnabled = false;
      saveReminderState();
      updateReminderButton();
      showNotificationToast('Class reminders paused', 'Tap the bell again whenever you want your soft reminders back.');
    } else enableReminders();
  });
  $('closeToast')?.addEventListener('click', hideNotificationToast);
  document.querySelector('.close-search').addEventListener('click', () => { $('searchOverlay').classList.remove('open'); $('searchOverlay').setAttribute('aria-hidden', 'true'); });
  $('searchOverlay').addEventListener('click', e => { if (e.target === $('searchOverlay')) { $('searchOverlay').classList.remove('open'); $('searchOverlay').setAttribute('aria-hidden', 'true'); } });
  $('searchInput').addEventListener('input', e => renderSearch(e.target.value));
  document.querySelectorAll('#openAddTop').forEach(btn => btn.addEventListener('click', openModal));
  $('closeModal').addEventListener('click', closeModal); $('cancelModal').addEventListener('click', closeModal); $('modal').addEventListener('click', e => { if (e.target === $('modal')) closeModal(); });
  $('classForm').addEventListener('submit', e => { e.preventDefault(); const data = Object.fromEntries(new FormData(e.target)); if (toMinutes(data.end) <= toMinutes(data.start)) { alert('End time should be after start time ♡'); return; } schedule[data.day] = schedule[data.day] || []; schedule[data.day].push({ ...data, custom: true }); schedule[data.day].sort((a,b) => toMinutes(a.start) - toMinutes(b.start)); saveSchedule(); activeDay = data.day; document.querySelectorAll('.day-tab').forEach(t => t.classList.toggle('active', t.dataset.day === activeDay)); renderWeekly(); renderToday(); renderCalendar(); updateNextClass(); closeModal(); });
  $('prevMonth').addEventListener('click', () => { calendarDate.setMonth(calendarDate.getMonth() - 1); renderCalendar(); }); $('nextMonth').addEventListener('click', () => { calendarDate.setMonth(calendarDate.getMonth() + 1); renderCalendar(); });
  document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => { document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.section === link.dataset.section)); }));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); $('searchOverlay').classList.remove('open'); $('searchOverlay').setAttribute('aria-hidden', 'true'); } });

  if (localStorage.getItem('collegePlannerTheme') === 'dark') document.body.classList.add('dark');
  document.querySelectorAll('.day-tab').forEach(tab => tab.classList.toggle('active', tab.dataset.day === activeDay));
  updateReminderButton(); updateDateCopy(); renderToday(); renderWeekly(); renderCalendar(); updateNextClass(); checkClassReminders(); setInterval(() => { renderToday(); updateNextClass(); checkClassReminders(); }, 1000);
})();

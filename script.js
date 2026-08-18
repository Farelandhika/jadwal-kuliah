(() => {
  const baseSchedule = {
    Mon: [
      {
        subject: "Toksikologi Lingkungan",
        start: "07:30",
        end: "09:15",
        room: "C2.15",
      },
      { subject: "Imunologi", start: "09:20", end: "11:05", room: "C2.17" },
      { subject: "Ornitologi", start: "13:55", end: "16:20", room: "C2.14" },
    ],
    Tue: [
      { subject: "Karsinologi", start: "13:55", end: "16:20", room: "C2.14" },
    ],
    Wed: [
      { subject: "Teratologi", start: "09:20", end: "11:05", room: "C2.16" },
      {
        subject: "Taksonomi Invertebrata",
        start: "11:10",
        end: "13:50",
        room: "C2.14",
      },
      { subject: "Morfometrika", start: "13:55", end: "16:20", room: "Lab. 6" },
    ],
    Thu: [
      {
        subject: "Biokimia Vitamin",
        start: "09:20",
        end: "11:05",
        room: "Lab. 5",
      },
      {
        subject: "Pengantar Biologi Kanker",
        start: "11:10",
        end: "13:50",
        room: "C2.16",
      },
    ],
    Fri: [
      {
        subject: "Pengelolaan Sumber Daya Alam dan Lingkungan",
        start: "07:30",
        end: "09:15",
        room: "C2.16",
      },
      {
        subject: "Botani Forensik",
        start: "09:20",
        end: "11:10",
        room: "C2.16",
      },
      { subject: "Kemotaksonomi", start: "13:00", end: "14:45", room: "C2.14" },
    ],
  };
  const dayKeys = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayNames = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
  };
  let currentLanguage = localStorage.getItem("collegePlannerLanguage") || "en";
  const languageText = {
    en: {
      home: "Home",
      schedule: "Schedule",
      calendar: "Calendar",
      settings: "Settings",
      mainNavigation: "Main navigation",
      yourDay: "your day at a glance",
      todaysClasses: "Today's Classes",
      planAhead: "plan ahead, gently",
      weekly: "My Weekly Schedule",
      addClass: "+ Add Class",
      nextClass: "NEXT CLASS",
      progressEyebrow: "a little progress every day",
      classProgress: "Class Progress",
      progressEmpty: "Your progress will appear when a class is live.",
      markWins: "mark your little wins",
      classDay: "class day",
      today: "today",
      littleReminder: "little reminder",
      controlRoom: "your little control room",
      plannerSettings: "Planner Settings",
      personalise: "Personalise your space",
      personaliseDesc: "Make every greeting feel like yours.",
      appearance: "Appearance",
      appearanceDesc: "Choose the mood of your planner.",
      scheduleData: "Schedule & data",
      scheduleDataDesc: "Add, edit, or start fresh.",
      deleteClass: "Delete a class",
      deleteClassDesc: "Remove any class from your schedule",
      manageWeek: "manage your week",
      deleteClassTitle: "Delete a class",
      noClassesToDelete: "There are no classes to delete.",
      removeClass: "Remove class",
      backPlanner: "‹ Back to planner",
      notifications: "Notifications & sound",
      notificationsDesc: "Never miss your next class.",
      displayName: "Display name",
      plannerLabel: "Planner label",
      greeting: "Greeting",
      subtitle: "Daily subtitle",
      semester: "Semester label",
      academicYear: "Academic year",
      quote: "Little reminder",
      saveContent: "Save content ♡",
      colourMode: "Colour mode",
      softLight: "Soft light",
      darkMauve: "Dark mauve",
      deviceSetting: "Use device setting",
      language: "Language",
      darkNote:
        "Dark mode keeps the same soft pink feeling, just a little cosier.",
      addClassDesc: "Save it to your weekly planner",
      resetData: "Reset planner data",
      resetDataDesc: "Restore the original schedule and content",
      reminders: "Class reminders",
      remindersDesc: "Show a reminder before each class",
      remindBefore: "Remind me before",
      notificationSound: "Notification sound",
      soundDesc: "Play a gentle sound with reminders",
      test: "Test",
      addSound: "Add a sound from your device",
      volume: "Volume",
      allowNotifications: "Allow browser notifications",
      notificationsEnabled: "Browser notifications enabled ✓",
      notificationsBlocked: "Browser notifications blocked",
      findClass: "find your class",
      searchClass: "Search your class",
      searchPlaceholder: "Subject, room, day, time...",
      searchHint: "Type to search across your whole week ✨",
      modalEyebrow: "make space for your plans",
      modalTitle: "Add a new class",
      subject: "Subject",
      day: "Day",
      room: "Room",
      startTime: "Start time",
      endTime: "End time",
      cancel: "Cancel",
      saveClass: "Save Class ♡",
      statusUpcoming: "● Upcoming",
      statusLive: "● Live now",
      statusDone: "✓ Completed",
      emptyToday: "A quiet day today — enjoy your soft reset ♡",
      emptyDay: "No classes planned for this day yet.",
      classLive: "♡ CLASS IS LIVE",
      startsIn: "Starts in",
      endsIn: "Ends in",
      startsSoon: "Starts soon",
      startsOn: "Starts on",
      roomPrefix: "Room",
      progressLive: "is in motion — keep going, lovely.",
      nothingScheduled: "Nothing scheduled",
      addClassHint: "Add a class to keep your week blooming ♡",
      progressIdle: "Your progress will appear when a class is live.",
      classComing: "Class coming up ✨",
      reminderPaused: "Class reminders paused",
      reminderPausedDesc:
        "Tap the bell again whenever you want your soft reminders back.",
      remindersOn: "Class reminders are on ✨",
      remindersMuted: "Notification sound is muted.",
      soundOn: "Notification sound is on ♫",
      saved: "Your planner content has been saved ♡",
      resetConfirm:
        "Reset all custom content, added classes, theme, and sounds?",
      endAfterStart: "End time should be after start time ♡",
      noResults: "No classes found. Try another little keyword ♡",
      soundTypes: "MP3, MPEG, MP4, WAV, OGG, or M4A",
    },
    id: {
      home: "Beranda",
      schedule: "Jadwal",
      calendar: "Kalender",
      settings: "Pengaturan",
      mainNavigation: "Navigasi utama",
      yourDay: "ringkasan harimu",
      todaysClasses: "Kelas Hari Ini",
      planAhead: "rencanakan dengan lembut",
      weekly: "Jadwal Mingguan Saya",
      addClass: "+ Tambah Kelas",
      nextClass: "KELAS BERIKUTNYA",
      progressEyebrow: "sedikit kemajuan setiap hari",
      classProgress: "Progres Kelas",
      progressEmpty: "Progres akan muncul saat kelas sedang berlangsung.",
      markWins: "tandai pencapaian kecilmu",
      classDay: "hari kuliah",
      today: "hari ini",
      littleReminder: "pengingat kecil",
      controlRoom: "ruang kendalimu",
      plannerSettings: "Pengaturan Planner",
      personalise: "Personalisasi ruangmu",
      personaliseDesc: "Buat setiap sapaan terasa milikmu.",
      appearance: "Tampilan",
      appearanceDesc: "Pilih suasana planner-mu.",
      scheduleData: "Jadwal & data",
      scheduleDataDesc: "Tambah, edit, atau mulai dari awal.",
      deleteClass: "Hapus kelas",
      deleteClassDesc: "Hapus kelas apa pun dari jadwalmu",
      manageWeek: "kelola minggumu",
      deleteClassTitle: "Hapus kelas",
      noClassesToDelete: "Tidak ada kelas yang bisa dihapus.",
      removeClass: "Hapus kelas",
      backPlanner: "‹ Kembali ke planner",
      notifications: "Notifikasi & suara",
      notificationsDesc: "Jangan lewatkan kelas berikutnya.",
      displayName: "Nama tampilan",
      plannerLabel: "Label planner",
      greeting: "Sapaan",
      subtitle: "Subjudul harian",
      semester: "Label semester",
      academicYear: "Tahun akademik",
      quote: "Pengingat kecil",
      saveContent: "Simpan konten ♡",
      colourMode: "Mode warna",
      softLight: "Terang lembut",
      darkMauve: "Mauve gelap",
      deviceSetting: "Ikuti pengaturan perangkat",
      language: "Bahasa",
      darkNote:
        "Mode gelap tetap bernuansa pink lembut, hanya terasa lebih hangat.",
      addClassDesc: "Simpan ke jadwal mingguanmu",
      resetData: "Reset data planner",
      resetDataDesc: "Kembalikan jadwal dan konten awal",
      reminders: "Pengingat kelas",
      remindersDesc: "Tampilkan pengingat sebelum kelas",
      remindBefore: "Ingatkan sebelum",
      notificationSound: "Suara notifikasi",
      soundDesc: "Putar suara lembut bersama pengingat",
      test: "Tes",
      addSound: "Tambahkan nada dari perangkat",
      volume: "Volume",
      allowNotifications: "Izinkan notifikasi browser",
      notificationsEnabled: "Notifikasi browser aktif ✓",
      notificationsBlocked: "Notifikasi browser diblokir",
      findClass: "cari kelasmu",
      searchClass: "Cari kelasmu",
      searchPlaceholder: "Mata kuliah, ruangan, hari, jam...",
      searchHint: "Ketik untuk mencari seluruh jadwal ✨",
      modalEyebrow: "beri ruang untuk rencanamu",
      modalTitle: "Tambah kelas baru",
      subject: "Mata kuliah",
      day: "Hari",
      room: "Ruangan",
      startTime: "Waktu mulai",
      endTime: "Waktu selesai",
      cancel: "Batal",
      saveClass: "Simpan Kelas ♡",
      statusUpcoming: "● Akan datang",
      statusLive: "● Sedang berlangsung",
      statusDone: "✓ Selesai",
      emptyToday: "Hari ini tenang — nikmati jeda lembutmu ♡",
      emptyDay: "Belum ada kelas di hari ini.",
      classLive: "♡ KELAS SEDANG BERLANGSUNG",
      startsIn: "Dimulai dalam",
      endsIn: "Selesai dalam",
      startsSoon: "Segera dimulai",
      startsOn: "Dimulai hari",
      roomPrefix: "Ruangan",
      progressLive: "sedang berlangsung — tetap semangat, ya.",
      nothingScheduled: "Belum ada jadwal",
      addClassHint: "Tambahkan kelas agar minggumu lebih teratur ♡",
      progressIdle: "Progres akan muncul saat kelas sedang berlangsung.",
      classComing: "Kelas sebentar lagi ✨",
      reminderPaused: "Pengingat kelas dijeda",
      reminderPausedDesc:
        "Tekan lonceng lagi kapan pun ingin mengaktifkan pengingat.",
      remindersOn: "Pengingat kelas aktif ✨",
      remindersMuted: "Suara notifikasi dimatikan.",
      soundOn: "Suara notifikasi aktif ♫",
      saved: "Konten planner berhasil disimpan ♡",
      resetConfirm: "Reset semua konten, kelas tambahan, tema, dan suara?",
      endAfterStart: "Waktu selesai harus setelah waktu mulai ♡",
      noResults: "Kelas tidak ditemukan. Coba kata kunci lain ♡",
      soundTypes: "MP3, MPEG, MP4, WAV, OGG, atau M4A",
    },
  };
  const t = (key) =>
    languageText[currentLanguage]?.[key] || languageText.en[key] || key;
  const localizedContentDefaults = {
    en: {
      greeting: "Good morning",
      role: "Student",
      subtitle: "Let's make today productive",
      quote: "Small steps, soft heart, steady progress.",
    },
    id: {
      greeting: "Selamat pagi",
      role: "Mahasiswa",
      subtitle: "Mari buat hari ini lebih produktif",
      quote: "Langkah kecil, hati lembut, kemajuan yang konsisten.",
    },
  };
  const schedule =
    JSON.parse(localStorage.getItem("collegePlannerSchedule") || "null") ||
    JSON.parse(JSON.stringify(baseSchedule));
  let activeDay = dayKeys[new Date().getDay()];
  if (!schedule[activeDay]) activeDay = "Mon";
  let calendarDate = new Date();
  let reminderMinutes = Number(
    localStorage.getItem("collegePlannerReminderMinutes") || 15,
  );
  let remindersEnabled =
    localStorage.getItem("collegePlannerReminders") !== "off";
  let soundEnabled =
    localStorage.getItem("collegePlannerSoundEnabled") !== "off";
  let soundVolume =
    Number(localStorage.getItem("collegePlannerSoundVolume") || 55) / 100;
  if (![5, 10, 15, 30].includes(reminderMinutes)) reminderMinutes = 15;
  if (!Number.isFinite(soundVolume)) soundVolume = 0.55;
  let customSoundData = localStorage.getItem("collegePlannerSoundData") || "";
  let customSoundName = localStorage.getItem("collegePlannerSoundName") || "";
  let customSoundBlob = null;
  let customSoundURL = "";
  let soundDatabasePromise = null;
  let contentSettings = {
    name: "hisna",
    role: "Student",
    greeting: "Good morning",
    subtitle: "Let's make today productive",
    semester: "Semester 5",
    year: "2026",
    quote: "Small steps, soft heart, steady progress.",
  };
  try {
    contentSettings = {
      ...contentSettings,
      ...(JSON.parse(localStorage.getItem("collegePlannerContent") || "{}") ||
        {}),
    };
  } catch {
    /* Keep the gentle defaults when saved content is incomplete. */
  }
  let notifiedReminders = {};
  try {
    notifiedReminders =
      JSON.parse(localStorage.getItem("collegePlannerNotified") || "{}") || {};
  } catch {
    notifiedReminders = {};
  }

  const $ = (id) => document.getElementById(id);
  const pad = (n) => String(n).padStart(2, "0");
  const toMinutes = (time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };
  const formatTime = (time) => time.replace(":", ".");
  const getTodayKey = () => dayKeys[new Date().getDay()];
  const getClassState = (item, day = getTodayKey()) => {
    if (day !== getTodayKey()) return "upcoming";
    const now = new Date();
    const mins = now.getHours() * 60 + now.getMinutes();
    if (mins < toMinutes(item.start)) return "upcoming";
    if (mins >= toMinutes(item.end)) return "done";
    return "live";
  };
  const statusLabel = (state) =>
    state === "live"
      ? t("statusLive")
      : state === "done"
        ? t("statusDone")
        : t("statusUpcoming");
  const dateKey = (date) =>
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

  function escapeHTML(value) {
    return String(value).replace(
      /[&<>'"]/g,
      (character) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        })[character],
    );
  }

  function getDisplayContent() {
    const defaults = localizedContentDefaults[currentLanguage];
    const english = localizedContentDefaults.en;
    return {
      ...contentSettings,
      greeting:
        contentSettings.greeting === english.greeting
          ? defaults.greeting
          : contentSettings.greeting,
      role:
        contentSettings.role === english.role
          ? defaults.role
          : contentSettings.role,
      subtitle:
        contentSettings.subtitle === english.subtitle
          ? defaults.subtitle
          : contentSettings.subtitle,
      quote:
        contentSettings.quote === english.quote
          ? defaults.quote
          : contentSettings.quote,
    };
  }

  function setFirstText(element, value) {
    if (!element) return;
    const textNode = [...element.childNodes].find(
      (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim(),
    );
    if (textNode) textNode.textContent = value;
  }

  function applyLanguage(language = currentLanguage, persist = true) {
    currentLanguage = language === "id" ? "id" : "en";
    if (persist)
      localStorage.setItem("collegePlannerLanguage", currentLanguage);
    document.documentElement.lang = currentLanguage === "id" ? "id" : "en";
    const navLabels = {
      home: t("home"),
      schedule: t("schedule"),
      calendar: t("calendar"),
      settings: t("settings"),
    };
    document.querySelectorAll(".side-nav .nav-link").forEach((link) => {
      const key = link.dataset.section;
      link.innerHTML = `<span>${key === "home" ? "⌂" : key === "schedule" ? "♡" : key === "calendar" ? "▦" : "⚙"}</span> ${navLabels[key]}`;
    });
    document.querySelectorAll(".bottom-nav .nav-link").forEach((link) => {
      const key = link.dataset.section;
      link.innerHTML = `<span>${key === "home" ? "⌂" : key === "schedule" ? "♡" : key === "calendar" ? "▦" : "⚙"}</span><small>${navLabels[key]}</small>`;
    });
    const shortDays = currentLanguage === "id" ? { Mon: "Sen", Tue: "Sel", Wed: "Rab", Thu: "Kam", Fri: "Jum" } : { Mon: "Mon", Tue: "Tue", Wed: "Wed", Thu: "Thu", Fri: "Fri" };
    document.querySelectorAll(".day-tab").forEach((tab) => {
      const label = shortDays[tab.dataset.day] || tab.dataset.day;
      tab.innerHTML = `${label}${tab.dataset.day === "Mon" ? " <span>♡</span>" : ""}`;
    });
    document
      .querySelector(".side-nav")
      ?.setAttribute("aria-label", t("mainNavigation"));
    document
      .querySelector(".search-trigger")
      ?.setAttribute("aria-label", t("searchClass"));
    document
      .querySelector(".theme-toggle")
      ?.setAttribute(
        "aria-label",
        currentLanguage === "id" ? "Ubah mode gelap" : "Toggle dark mode",
      );
    setFirstText(
      document.querySelector(".sidebar-note p"),
      currentLanguage === "id" ? "Pengingat kecil" : "Little reminder",
    );
    setFirstText(
      document.querySelector(".sidebar-footer"),
      currentLanguage === "id"
        ? "dibuat dengan kelembutan"
        : "made with softness",
    );
    const heroBadgeText = document.querySelector(".hero-badge small");
    if (heroBadgeText) heroBadgeText.innerHTML = currentLanguage === "id" ? "belajar<br />dengan ceria" : "study<br />with joy";
    setFirstText(document.querySelector(".today-panel .eyebrow"), t("yourDay"));
    document.querySelector("#today-title") &&
      (document.querySelector("#today-title").innerHTML =
        `${t("todaysClasses")} <span>♡</span>`);
    setFirstText(
      document.querySelector(".weekly-panel .eyebrow"),
      t("planAhead"),
    );
    document.querySelector("#weekly-title") &&
      (document.querySelector("#weekly-title").innerHTML =
        `${t("weekly")} <span>✿</span>`);
    const addTop = $("openAddTop");
    if (addTop) addTop.textContent = t("addClass");
    const nextLabel = document.querySelector(".next-label");
    if (nextLabel)
      nextLabel.innerHTML = `<span class="live-dot"></span> ${t("nextClass")} <b>✨</b>`;
    setFirstText(
      document.querySelector(".progress-panel .eyebrow"),
      t("progressEyebrow"),
    );
    document.querySelector("#progress-title") &&
      (document.querySelector("#progress-title").innerHTML =
        `${t("classProgress")} <span>🌸</span>`);
    if ($("progressStatus")) $("progressStatus").textContent = t("progressIdle");
    setFirstText(
      document.querySelector(".calendar-panel .eyebrow"),
      t("markWins"),
    );
    document
      .querySelectorAll(".calendar-weekdays span")
      .forEach((day, index) => {
        day.textContent = (
          currentLanguage === "id"
            ? ["SEN", "SEL", "RAB", "KAM", "JUM", "SAB", "MIN"]
            : ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
        )[index];
      });
    const legend = document.querySelector(".calendar-legend");
    if (legend)
      legend.innerHTML = `<span class="legend-dot"></span> ${t("classDay")} <span class="legend-today"></span> ${t("today")}`;
    const deviceReminder = document.querySelector(".device-reminder .eyebrow");
    if (deviceReminder) setFirstText(deviceReminder, t("littleReminder"));
    const settingsEyebrow = document.querySelector(".settings-panel .eyebrow");
    if (settingsEyebrow) setFirstText(settingsEyebrow, t("controlRoom"));
    document.querySelector("#settings-title") &&
      (document.querySelector("#settings-title").innerHTML =
        `${t("plannerSettings")} <span>⚙</span>`);
    const cardTitles = document.querySelectorAll(".settings-card-title h3");
    ["personalise", "appearance", "scheduleData", "notifications"].forEach(
      (key, index) => {
        if (cardTitles[index]) cardTitles[index].textContent = t(key);
      },
    );
    const cardDescs = document.querySelectorAll(".settings-card-title p");
    [
      "personaliseDesc",
      "appearanceDesc",
      "scheduleDataDesc",
      "notificationsDesc",
    ].forEach((key, index) => {
      if (cardDescs[index]) cardDescs[index].textContent = t(key);
    });
    const contentLabels = document.querySelectorAll(".settings-fields label");
    [
      "displayName",
      "plannerLabel",
      "greeting",
      "subtitle",
      "semester",
      "academicYear",
      "quote",
    ].forEach((key, index) => setFirstText(contentLabels[index], t(key)));
    if ($("saveContentSettings"))
      $("saveContentSettings").textContent = t("saveContent");
    const selectLabels = document.querySelectorAll(".settings-select-label");
    setFirstText(selectLabels[0], t("colourMode"));
    setFirstText(selectLabels[1], t("language"));
    setFirstText(selectLabels[2], t("remindBefore"));
    if ($("themeSelect")) {
      const options = $("themeSelect").options;
      options[0].textContent = t("softLight");
      options[1].textContent = t("darkMauve");
      options[2].textContent = t("deviceSetting");
    }
    const note = document.querySelector(".settings-inline-note p");
    if (note) note.textContent = t("darkNote");
    const actionButtons = document.querySelectorAll(".settings-action");
    if (actionButtons[0]) {
      actionButtons[0].querySelector("strong").textContent = t("addClass")
        .replace("+ ", "")
        .replace("Tambah ", "Tambah ");
      actionButtons[0].querySelector("small").textContent = t("addClassDesc");
    }
    if (actionButtons[1]) {
      actionButtons[1].querySelector("strong").textContent = t("deleteClass");
      actionButtons[1].querySelector("small").textContent = t("deleteClassDesc");
    }
    if (actionButtons[2]) {
      actionButtons[2].querySelector("strong").textContent = t("resetData");
      actionButtons[2].querySelector("small").textContent = t("resetDataDesc");
    }
    const settingsBack = $("closeSettings"); if (settingsBack) settingsBack.textContent = t("backPlanner");
    const deleteEyebrow = document.querySelector(".delete-schedule-card .eyebrow"); if (deleteEyebrow) deleteEyebrow.textContent = t("manageWeek");
    const deleteTitle = $("deleteScheduleTitle"); if (deleteTitle) deleteTitle.innerHTML = `${t("deleteClassTitle")} <span>♡</span>`;
    const deleteCancel = $("cancelDeleteSchedule"); if (deleteCancel) deleteCancel.textContent = t("cancel");
    const switchRows = document.querySelectorAll(".switch-row");
    if (switchRows[0]) {
      switchRows[0].querySelector("strong").textContent = t("reminders");
      switchRows[0].querySelector("small").textContent = t("remindersDesc");
    }
    if (switchRows[1]) {
      switchRows[1].querySelector("strong").textContent =
        t("notificationSound");
      switchRows[1].querySelector("small").textContent = t("soundDesc");
    }
    const testSound = $("testSound");
    if (testSound) testSound.textContent = t("test");
    const soundFile = document.querySelector(".file-picker small");
    if (soundFile) soundFile.textContent = t("soundTypes");
    const volume = document.querySelector(".volume-label");
    if (volume) setFirstText(volume, t("volume"));
    const permissionButton = $("requestNotificationPermission");
    if (permissionButton && !permissionButton.textContent.includes("✓"))
      permissionButton.textContent = t("allowNotifications");
    const searchEyebrow = document.querySelector(".search-box .eyebrow");
    if (searchEyebrow) searchEyebrow.textContent = t("findClass");
    const searchTitle = document.querySelector(".search-box h2");
    if (searchTitle)
      searchTitle.innerHTML = `${t("searchClass")} <span>♡</span>`;
    if ($("searchInput")) $("searchInput").placeholder = t("searchPlaceholder");
    const modalEyebrow = document.querySelector(".modal-card .eyebrow");
    if (modalEyebrow) modalEyebrow.textContent = t("modalEyebrow");
    const modalTitle = $("modalTitle");
    if (modalTitle) modalTitle.innerHTML = `${t("modalTitle")} <span>🎀</span>`;
    const formLabels = document.querySelectorAll(
      "#classForm > label, #classForm .form-row label",
    );
    ["subject", "day", "room", "startTime", "endTime"].forEach((key, index) =>
      setFirstText(formLabels[index], t(key)),
    );
    const cancel = $("cancelModal");
    if (cancel) cancel.textContent = t("cancel");
    const save = document.querySelector("#classForm .btn-primary");
    if (save) save.textContent = t("saveClass");
    const subjectInput = document.querySelector('#classForm input[name="subject"]');
    const roomInput = document.querySelector('#classForm input[name="room"]');
    if (subjectInput) subjectInput.placeholder = currentLanguage === "id" ? "mis. Ekologi" : "e.g. Ecology";
    if (roomInput) roomInput.placeholder = currentLanguage === "id" ? "mis. C2.18" : "e.g. C2.18";
    document.querySelectorAll("#classForm select option").forEach((option) => {
      const labels =
        currentLanguage === "id"
          ? {
              Mon: "Senin",
              Tue: "Selasa",
              Wed: "Rabu",
              Thu: "Kamis",
              Fri: "Jumat",
            }
          : {
              Mon: "Monday",
              Tue: "Tuesday",
              Wed: "Wednesday",
              Thu: "Thursday",
              Fri: "Friday",
            };
      option.textContent = labels[option.value];
    });
    const searchResults = $("searchResults");
    if (searchResults && !searchResults.querySelector(".result-item"))
      searchResults.innerHTML = `<p class="muted-text">${t("searchHint")}</p>`;
    updateReminderButton();
    applyContentSettings();
    syncSettingsForm();
    updateDateCopy();
  }

  function applyContentSettings() {
    const displayContent = getDisplayContent();
    const heroGreeting = $("heroGreeting");
    if (heroGreeting) {
      heroGreeting.innerHTML = `${escapeHTML(displayContent.greeting)} <span class="greeting-name">${escapeHTML(displayContent.name)}</span>,<br /><span>${escapeHTML(displayContent.role)}</span> <i>♡</i>`;
    }
    const subtitle = document.querySelector(".hero-subtitle");
    if (subtitle)
      subtitle.innerHTML = `${escapeHTML(displayContent.subtitle)} <span>✨</span>`;
    const quote = document.querySelector(".sidebar-note blockquote");
    if (quote) quote.textContent = `“${displayContent.quote}”`;
    const deviceQuote = document.querySelector(".device-reminder-text");
    if (deviceQuote) deviceQuote.textContent = `“${displayContent.quote}”`;
    const semester = document.querySelector(".semester-pill");
    if (semester)
      semester.innerHTML = `${escapeHTML(displayContent.semester)} <span>·</span> ${escapeHTML(displayContent.year)}`;
    const avatar = $("studentAvatar");
    if (avatar)
      avatar.textContent =
        displayContent.name.trim().charAt(0).toUpperCase() || "S";
    document.title = `My College Planner · ${displayContent.role}`;
  }

  function syncSettingsForm() {
    const values = {
      settingName: getDisplayContent().name,
      settingRole: getDisplayContent().role,
      settingGreeting: getDisplayContent().greeting,
      settingSubtitle: getDisplayContent().subtitle,
      settingSemester: contentSettings.semester,
      settingYear: contentSettings.year,
      settingQuote: getDisplayContent().quote,
    };
    Object.entries(values).forEach(([id, value]) => {
      if ($(id)) $(id).value = value;
    });
    if ($("themeSelect"))
      $("themeSelect").value =
        localStorage.getItem("collegePlannerTheme") || "light";
    if ($("languageSelect")) $("languageSelect").value = currentLanguage;
    if ($("settingsReminderToggle"))
      $("settingsReminderToggle").checked = remindersEnabled;
    if ($("reminderLead")) $("reminderLead").value = String(reminderMinutes);
    if ($("settingsSoundToggle"))
      $("settingsSoundToggle").checked = soundEnabled;
    if ($("soundVolume"))
      $("soundVolume").value = String(Math.round(soundVolume * 100));
    if ($("volumeValue"))
      $("volumeValue").textContent = `${Math.round(soundVolume * 100)}%`;
    if ($("soundFileName"))
      $("soundFileName").textContent = customSoundName || t("addSound");
  }

  function showSettingsFeedback(message) {
    const feedback = $("settingsFeedback");
    if (!feedback) return;
    feedback.textContent = message;
    feedback.classList.add("show");
    clearTimeout(showSettingsFeedback.timer);
    showSettingsFeedback.timer = setTimeout(
      () => feedback.classList.remove("show"),
      3500,
    );
  }

  function applyTheme(theme, persist = true) {
    const systemDark =
      theme === "system" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    document.body.classList.toggle("dark", theme === "dark" || systemDark);
    if (persist) localStorage.setItem("collegePlannerTheme", theme);
    if ($("themeSelect")) $("themeSelect").value = theme;
  }

  function openSoundDatabase() {
    if (soundDatabasePromise) return soundDatabasePromise;
    if (!("indexedDB" in window))
      return Promise.reject(new Error("IndexedDB is unavailable"));
    soundDatabasePromise = new Promise((resolve, reject) => {
      const request = indexedDB.open("collegePlannerAssets", 1);
      request.onupgradeneeded = () =>
        request.result.createObjectStore("sounds");
      request.onsuccess = () => resolve(request.result);
      request.onerror = () =>
        reject(request.error || new Error("Unable to open audio storage"));
    });
    return soundDatabasePromise;
  }

  async function loadStoredSound() {
    try {
      const database = await openSoundDatabase();
      const stored = await new Promise((resolve, reject) => {
        const request = database
          .transaction("sounds", "readonly")
          .objectStore("sounds")
          .get("notification");
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
      if (stored?.blob) {
        customSoundBlob = stored.blob;
        customSoundName = stored.name || customSoundName;
        if (customSoundURL) URL.revokeObjectURL(customSoundURL);
        customSoundURL = URL.createObjectURL(customSoundBlob);
        localStorage.setItem("collegePlannerSoundName", customSoundName);
        syncSettingsForm();
      }
    } catch {
      /* The small localStorage fallback remains available. */
    }
  }

  async function storeSoundInDatabase(file) {
    const database = await openSoundDatabase();
    await new Promise((resolve, reject) => {
      const transaction = database.transaction("sounds", "readwrite");
      transaction
        .objectStore("sounds")
        .put({ blob: file, name: file.name, type: file.type }, "notification");
      transaction.oncomplete = resolve;
      transaction.onerror = () =>
        reject(transaction.error || new Error("Unable to save audio"));
      transaction.onabort = () =>
        reject(transaction.error || new Error("Audio save aborted"));
    });
  }

  function deleteStoredSound() {
    if (customSoundURL) URL.revokeObjectURL(customSoundURL);
    customSoundURL = "";
    customSoundBlob = null;
    if ("indexedDB" in window) indexedDB.deleteDatabase("collegePlannerAssets");
  }

  function playReminderSound(force = false) {
    if (!soundEnabled && !force) return;
    const soundSource = customSoundURL || customSoundData;
    if (soundSource) {
      try {
        const audio = new Audio(soundSource);
        audio.volume = Math.max(0, Math.min(1, soundVolume));
        audio
          .play()
          .catch(() =>
            showSettingsFeedback(
              "Klik Test lagi setelah berinteraksi dengan halaman.",
            ),
          );
        return;
      } catch {
        /* Fall back to the soft generated tone. */
      }
    }
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(660, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      880,
      context.currentTime + 0.18,
    );
    gain.gain.setValueAtTime(
      Math.max(0.01, soundVolume * 0.16),
      context.currentTime,
    );
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.55);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.55);
  }

  async function handleSoundFile(file) {
    if (!file) return;
    const extensionLooksAudio =
      /\.(mp3|mpeg|mp4|wav|ogg|m4a|aac|flac|webm)$/i.test(file.name);
    const supportedMime = /^(audio\/|video\/mp4$)/i.test(file.type);
    if (!supportedMime && !extensionLooksAudio) {
      showSettingsFeedback(
        "Pilih file MP3, MPEG, MP4, WAV, OGG, M4A, atau AAC.",
      );
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      showSettingsFeedback("File terlalu besar. Gunakan nada di bawah 20 MB.");
      return;
    }
    try {
      await storeSoundInDatabase(file);
      customSoundBlob = file;
      customSoundName = file.name;
      if (customSoundURL) URL.revokeObjectURL(customSoundURL);
      customSoundURL = URL.createObjectURL(file);
      customSoundData = "";
      localStorage.removeItem("collegePlannerSoundData");
      localStorage.setItem("collegePlannerSoundName", customSoundName);
      syncSettingsForm();
      showSettingsFeedback(`Nada “${file.name}” tersimpan di perangkat ini ♡`);
    } catch {
      /* Fallback for older/private browsers where IndexedDB is disabled. */
      if (file.size > 2 * 1024 * 1024) {
        showSettingsFeedback(
          "Penyimpanan browser penuh. Coba file audio di bawah 2 MB.",
        );
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        try {
          customSoundData = reader.result;
          customSoundName = file.name;
          localStorage.setItem("collegePlannerSoundData", customSoundData);
          localStorage.setItem("collegePlannerSoundName", customSoundName);
          syncSettingsForm();
          showSettingsFeedback(
            `Nada “${file.name}” tersimpan sebagai fallback ♡`,
          );
        } catch {
          showSettingsFeedback(
            "Nada tidak bisa disimpan. Hapus data lama atau gunakan file lebih kecil.",
          );
        }
      };
      reader.onerror = () =>
        showSettingsFeedback("File audio tidak bisa dibaca oleh browser ini.");
      reader.readAsDataURL(file);
    }
  }

  function saveReminderState() {
    localStorage.setItem(
      "collegePlannerReminders",
      remindersEnabled ? "on" : "off",
    );
    localStorage.setItem(
      "collegePlannerNotified",
      JSON.stringify(notifiedReminders),
    );
    localStorage.setItem(
      "collegePlannerReminderMinutes",
      String(reminderMinutes),
    );
    localStorage.setItem(
      "collegePlannerSoundEnabled",
      soundEnabled ? "on" : "off",
    );
    localStorage.setItem(
      "collegePlannerSoundVolume",
      String(Math.round(soundVolume * 100)),
    );
  }

  function updateReminderButton() {
    const button = $("notificationButton");
    if (!button) return;
    const browserSupported = "Notification" in window;
    const permission = browserSupported
      ? Notification.permission
      : "unsupported";
    const active = remindersEnabled && permission !== "denied";
    button.classList.toggle("is-enabled", active);
    button.classList.toggle("is-denied", permission === "denied");
    button.setAttribute("aria-pressed", String(active));
    if ($("settingsReminderToggle"))
      $("settingsReminderToggle").checked = remindersEnabled;
    const permissionButton = $("requestNotificationPermission");
    if (permissionButton)
      permissionButton.textContent =
        permission === "granted"
          ? t("notificationsEnabled")
          : permission === "denied"
            ? t("notificationsBlocked")
            : t("allowNotifications");
    button.title =
      permission === "denied"
        ? currentLanguage === "id"
          ? "Notifikasi browser diblokir — pengingat dalam aplikasi tetap aktif"
          : "Browser notifications are blocked — in-app reminders still work"
        : active
          ? `${t("reminders")} · ${reminderMinutes} ${currentLanguage === "id" ? "menit sebelum kelas" : "minutes before class"}`
          : currentLanguage === "id"
            ? "Aktifkan pengingat kelas"
            : "Enable class reminders";
  }

  function showNotificationToast(title, message) {
    const toast = $("notificationToast");
    if (!toast) return;
    toast.querySelector(".toast-copy strong").textContent = title;
    toast.querySelector(".toast-copy p").textContent = message;
    toast.classList.add("show");
    clearTimeout(showNotificationToast.timer);
    showNotificationToast.timer = setTimeout(
      () => toast.classList.remove("show"),
      9000,
    );
  }

  function hideNotificationToast() {
    const toast = $("notificationToast");
    if (toast) toast.classList.remove("show");
    clearTimeout(showNotificationToast.timer);
  }

  async function enableReminders() {
    if (!("Notification" in window)) {
      remindersEnabled = true;
      saveReminderState();
      updateReminderButton();
      showNotificationToast(
        currentLanguage === "id" ? "Pengingat siap ♡" : "Reminders are ready ♡",
        currentLanguage === "id"
          ? `Browser akan mengingatkan ${reminderMinutes} menit sebelum kelas.`
          : `This browser will show a soft reminder ${reminderMinutes} minutes before class.`,
      );
      return;
    }
    if (Notification.permission === "denied") {
      remindersEnabled = true;
      saveReminderState();
      updateReminderButton();
      showNotificationToast(
        currentLanguage === "id"
          ? "Pengingat dalam aplikasi tetap aktif"
          : "In-app reminders are still on",
        currentLanguage === "id"
          ? "Izinkan notifikasi dari pengaturan browser untuk peringatan layar kunci."
          : "Allow notifications in your browser settings for lock-screen alerts.",
      );
      return;
    }
    let permission = Notification.permission;
    try {
      if (permission === "default")
        permission = await Notification.requestPermission();
    } catch {
      permission = "denied";
    }
    remindersEnabled = true;
    saveReminderState();
    updateReminderButton();
    showNotificationToast(
      permission === "granted"
        ? currentLanguage === "id"
          ? "Pengingat kelas aktif ✨"
          : "Class reminders enabled ✨"
        : currentLanguage === "id"
          ? "Pengingat dalam aplikasi aktif ♡"
          : "In-app reminders are on ♡",
      permission === "granted"
        ? currentLanguage === "id"
          ? `Kamu akan mendapat peringatan ${reminderMinutes} menit sebelum kelas.`
          : `You will get an alert ${reminderMinutes} minutes before class.`
        : currentLanguage === "id"
          ? "Kamu bisa mengaktifkan notifikasi dari pengaturan di bilah alamat."
          : "You can enable browser alerts later from the address-bar settings.",
    );
  }

  function sendClassReminder(item, startTime, key) {
    if (notifiedReminders[key]) return;
    notifiedReminders[key] = Date.now();
    const message = currentLanguage === "id" ? `${item.subject} dimulai pukul ${formatTime(startTime)} di ${item.room}.` : `${item.subject} starts at ${formatTime(startTime)} in ${item.room}.`;
    showNotificationToast(t("classComing"), message);
    playReminderSound();
    if ("Notification" in window && Notification.permission === "granted") {
      try {
        new Notification(`${t("classComing")} · ${item.subject}`, {
          body: currentLanguage === "id" ? `Dimulai pukul ${formatTime(startTime)} di ${item.room}.` : `Starts at ${formatTime(startTime)} in ${item.room}.`,
          tag: key,
        });
      } catch {
        /* Browser may block notifications in file mode. */
      }
    }
    const cutoff = Date.now() - 1000 * 60 * 60 * 24 * 14;
    Object.keys(notifiedReminders).forEach((storedKey) => {
      if (notifiedReminders[storedKey] < cutoff)
        delete notifiedReminders[storedKey];
    });
    saveReminderState();
  }

  function checkClassReminders() {
    if (!remindersEnabled) return;
    const now = new Date();
    const items = schedule[getTodayKey()] || [];
    items.forEach((item) => {
      const [hours, minutes] = item.start.split(":").map(Number);
      const start = new Date(now);
      start.setHours(hours, minutes, 0, 0);
      const minutesUntilStart = (start - now) / 60000;
      if (minutesUntilStart > 0 && minutesUntilStart <= reminderMinutes)
        sendClassReminder(
          item,
          item.start,
          `${dateKey(now)}-${item.start}-${item.subject}`,
        );
    });
  }

  function updateDateCopy() {
    const now = new Date();
    const locale = currentLanguage === "id" ? "id-ID" : "en-US";
    const full = new Intl.DateTimeFormat(locale, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(now);
    const short = new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "short",
    })
      .format(now)
      .toUpperCase();
    document.querySelector(".hero-section .eyebrow").innerHTML =
      `${full} <span>✦</span>`;
    $("todayChip").textContent = short;
  }

  function allClasses() {
    return Object.entries(schedule).flatMap(([day, items]) =>
      items.map((item) => ({ ...item, day })),
    );
  }
  function renderToday() {
    const list = $("todayClasses");
    const today = schedule[getTodayKey()] || [];
    if (!today.length) {
      list.innerHTML = `<div class="empty-state"><span>☁︎</span>${t("emptyToday")}</div>`;
      return;
    }
    list.innerHTML = today
      .map((item) => {
        const state = getClassState(item);
        return `<article class="class-card"><div class="class-time">${formatTime(item.start)} —<br>${formatTime(item.end)}</div><div class="class-info"><h3>${item.subject} <span class="heart-accent">♡</span></h3><p>${item.room}</p></div><span class="class-status status-${state}">${statusLabel(state)}</span></article>`;
      })
      .join("");
  }

  function renderWeekly() {
    const list = $("weeklyList");
    const items = schedule[activeDay] || [];
    if (!items.length) {
      list.innerHTML =
        `<div class="empty-state"><span>✿</span>${t("emptyDay")}</div>`;
      return;
    }
    list.innerHTML = items
      .map(
        (item, index) =>
          `<div class="week-item"><span class="time">${formatTime(item.start)} — ${formatTime(item.end)}</span><span class="subject">${item.subject}</span><span class="room">${item.room}</span><button class="delete-class" data-day="${activeDay}" data-index="${index}" title="${t("removeClass")}">×</button></div>`,
      )
      .join("");
    list.querySelectorAll(".delete-class").forEach((btn) =>
      btn.addEventListener("click", () => {
        schedule[btn.dataset.day].splice(Number(btn.dataset.index), 1);
        saveSchedule();
        renderWeekly();
        renderToday();
        renderCalendar();
        updateNextClass();
      }),
    );
  }

  function renderDeleteScheduleList() {
    const list = $("deleteScheduleList");
    if (!list) return;
    const order = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const localizedDays = currentLanguage === "id" ? { Mon: "Senin", Tue: "Selasa", Wed: "Rabu", Thu: "Kamis", Fri: "Jumat", Sat: "Sabtu", Sun: "Minggu" } : { ...dayNames, Sat: "Saturday", Sun: "Sunday" };
    const entries = order.flatMap((day) => (schedule[day] || []).map((item, index) => ({ day, item, index })));
    if (!entries.length) { list.innerHTML = `<p class="delete-empty">${t("noClassesToDelete")}</p>`; return; }
    list.innerHTML = entries.map(({ day, item, index }) => `<div class="delete-schedule-item"><span class="delete-day">${localizedDays[day] || day}<br>${formatTime(item.start)}–${formatTime(item.end)}</span><span><strong>${escapeHTML(item.subject)}</strong><small>${escapeHTML(item.room)}</small></span><button type="button" class="remove-schedule-item" data-day="${day}" data-index="${index}" title="${t("removeClass")}">×</button></div>`).join("");
    list.querySelectorAll(".remove-schedule-item").forEach((button) => button.addEventListener("click", () => {
      schedule[button.dataset.day].splice(Number(button.dataset.index), 1);
      saveSchedule();
      renderDeleteScheduleList();
      renderWeekly(); renderToday(); renderCalendar(); updateNextClass();
      showSettingsFeedback(currentLanguage === "id" ? "Kelas berhasil dihapus ♡" : "Class removed ♡");
    }));
  }

  function openDeleteScheduleModal() {
    renderDeleteScheduleList();
    $("deleteScheduleModal")?.classList.add("open");
    $("deleteScheduleModal")?.setAttribute("aria-hidden", "false");
  }

  function closeDeleteScheduleModal() {
    $("deleteScheduleModal")?.classList.remove("open");
    $("deleteScheduleModal")?.setAttribute("aria-hidden", "true");
  }

  function toggleSettingsView(show, shouldScroll = true) {
    document.body.classList.toggle("settings-open", show);
    if (show && shouldScroll) setTimeout(() => $("settings")?.scrollIntoView({ behavior: "smooth", block: "start" }), 40);
    if (!show && shouldScroll) setTimeout(() => $("home")?.scrollIntoView({ behavior: "smooth", block: "start" }), 40);
  }

  function findNextClass() {
    const now = new Date();
    const todayKey = getTodayKey();
    const nowMins =
      now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
    const todayItems = (schedule[todayKey] || [])
      .map((item) => ({ ...item, day: todayKey }))
      .sort((a, b) => toMinutes(a.start) - toMinutes(b.start));
    const upcoming = todayItems.find((item) => nowMins < toMinutes(item.end));
    if (upcoming) return { ...upcoming, offset: 0 };
    for (let offset = 1; offset <= 7; offset++) {
      const key = dayKeys[(now.getDay() + offset) % 7];
      if (schedule[key]?.length)
        return { ...schedule[key][0], day: key, offset };
    }
    return null;
  }

  function updateNextClass() {
    const holder = $("nextClassContent");
    const next = findNextClass();
    if (!next) {
      holder.innerHTML =
        `<div class="next-main"><h3>${t("nothingScheduled")}</h3><p class="next-room">${t("addClassHint")}</p></div>`;
      return;
    }
    const now = new Date();
    const currentDay = getTodayKey();
    const state = next.day === currentDay ? getClassState(next) : "upcoming";
    const localizedDayNames = currentLanguage === "id" ? { Mon: "Senin", Tue: "Selasa", Wed: "Rabu", Thu: "Kamis", Fri: "Jumat" } : dayNames;
    const label = state === "live" ? t("classLive") : state === "done" ? t("statusDone") : (next.offset ? `${t("startsOn")} ${localizedDayNames[next.day]}` : t("startsSoon"));
    holder.innerHTML = `<div class="next-main"><h3>${next.subject}</h3><div class="next-time">${formatTime(next.start)} — ${formatTime(next.end)}</div><p class="next-room">${t("roomPrefix")} ${next.room}</p><p class="countdown-label">${state === "live" ? t("endsIn") : t("startsIn")}</p><div class="countdown" id="countdown">--h --m --s</div><span class="next-state">${label}</span></div>`;
    updateCountdown(next);
  }

  function updateCountdown(next = findNextClass()) {
    const el = $("countdown");
    if (!el || !next) return;
    const now = new Date();
    const target = new Date(now);
    const currentKey = getTodayKey();
    let diff;
    if (next.day === currentKey) {
      const currentMins =
        now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
      const isLive =
        currentMins >= toMinutes(next.start) &&
        currentMins < toMinutes(next.end);
      const targetMins = isLive ? toMinutes(next.end) : toMinutes(next.start);
      target.setHours(
        Math.floor(targetMins / 60),
        targetMins % 60,
        isLive ? 0 : 0,
        0,
      );
      diff = target - now;
    } else {
      const targetIndex = dayKeys.indexOf(next.day);
      const currentIndex = now.getDay();
      let dayDiff = (targetIndex - currentIndex + 7) % 7;
      if (dayDiff === 0) dayDiff = 7;
      target.setDate(target.getDate() + dayDiff);
      const [h, m] = next.start.split(":").map(Number);
      target.setHours(h, m, 0, 0);
      diff = target - now;
    }
    if (diff < 0) diff = 0;
    const total = Math.floor(diff / 1000);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    el.textContent = `${pad(h)}h ${pad(m)}m ${pad(s)}s`;
    const state = next.day === currentKey ? getClassState(next) : "upcoming";
    const progressBar = $("progressBar");
    const progressPercent = $("progressPercent");
    const progressStatus = $("progressStatus");
    if (state === "live") {
      const elapsed =
        (new Date() -
          new Date(
            new Date().setHours(...next.start.split(":").map(Number), 0, 0),
          )) /
        1000;
      const totalDuration = (toMinutes(next.end) - toMinutes(next.start)) * 60;
      const pct = Math.max(
        0,
        Math.min(100, Math.round((elapsed / totalDuration) * 100)),
      );
      progressBar.style.width = `${pct}%`;
      progressPercent.textContent = `${pct}%`;
      progressStatus.textContent = `${next.subject} ${t("progressLive")}`;
    } else {
      progressBar.style.width = "0%";
      progressPercent.textContent = "—";
      progressStatus.textContent = t("progressIdle");
    }
  }

  function renderCalendar() {
    const grid = $("calendarGrid");
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const first = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const start = (first.getDay() + 6) % 7;
    const now = new Date();
    $("calendar-title").firstChild.textContent =
      `${calendarDate.toLocaleDateString(currentLanguage === "id" ? "id-ID" : "en-US", { month: "long", year: "numeric" })} `;
    let html = "";
    for (let i = 0; i < start; i++)
      html += '<span class="calendar-day muted"></span>';
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const key = dayKeys[date.getDay()];
      const today = date.toDateString() === now.toDateString();
      const hasClass = Boolean(schedule[key]?.length);
      html += `<span class="calendar-day ${today ? "today" : ""} ${hasClass ? "has-class" : ""}">${day}</span>`;
    }
    grid.innerHTML = html;
  }

  function saveSchedule() {
    localStorage.setItem("collegePlannerSchedule", JSON.stringify(schedule));
  }
  function openModal() {
    $("modal").classList.add("open");
    $("modal").setAttribute("aria-hidden", "false");
    setTimeout(
      () => document.querySelector('#classForm input[name="subject"]').focus(),
      80,
    );
  }
  function closeModal() {
    $("modal").classList.remove("open");
    $("modal").setAttribute("aria-hidden", "true");
    $("classForm").reset();
  }
  function renderSearch(query = "") {
    const results = $("searchResults");
    const q = query.trim().toLowerCase();
    if (!q) {
      results.innerHTML =
        `<p class="muted-text">${t("searchHint")}</p>`;
      return;
    }
    const matches = allClasses().filter((item) =>
      `${item.subject} ${item.room} ${item.day} ${item.start} ${item.end}`
        .toLowerCase()
        .includes(q),
    );
    results.innerHTML = matches.length
      ? matches
          .map(
            (item) =>
              `<div class="result-item"><strong>${item.subject}</strong><small>${(currentLanguage === "id" ? { Mon: "Senin", Tue: "Selasa", Wed: "Rabu", Thu: "Kamis", Fri: "Jumat" } : dayNames)[item.day] || item.day} · ${formatTime(item.start)}–${formatTime(item.end)} · ${item.room}</small></div>`,
          )
          .join("")
      : `<p class="muted-text">${t("noResults")}</p>`;
  }

  document.querySelectorAll(".day-tab").forEach((tab) =>
    tab.addEventListener("click", () => {
      activeDay = tab.dataset.day;
      document
        .querySelectorAll(".day-tab")
        .forEach((t) => t.classList.toggle("active", t === tab));
      renderWeekly();
    }),
  );
  document.querySelectorAll(".theme-toggle").forEach((btn) =>
    btn.addEventListener("click", () => {
      const current =
        localStorage.getItem("collegePlannerTheme") ||
        (document.body.classList.contains("dark") ? "dark" : "light");
      applyTheme(current === "dark" ? "light" : "dark");
    }),
  );
  document.querySelectorAll(".search-trigger").forEach((btn) =>
    btn.addEventListener("click", () => {
      $("searchOverlay").classList.add("open");
      $("searchOverlay").setAttribute("aria-hidden", "false");
      setTimeout(() => $("searchInput").focus(), 100);
    }),
  );
  $("notificationButton")?.addEventListener("click", () => {
    if (
      remindersEnabled &&
      "Notification" in window &&
      Notification.permission === "default"
    ) {
      enableReminders();
      return;
    }
    if (remindersEnabled) {
      remindersEnabled = false;
      saveReminderState();
      updateReminderButton();
      showNotificationToast(
        t("reminderPaused"),
        t("reminderPausedDesc"),
      );
    } else enableReminders();
  });
  $("closeToast")?.addEventListener("click", hideNotificationToast);
  $("saveContentSettings")?.addEventListener("click", () => {
    contentSettings = {
      name: $("settingName").value.trim() || "Student",
      role: $("settingRole").value.trim() || "Student",
      greeting: $("settingGreeting").value.trim() || "Good morning",
      subtitle:
        $("settingSubtitle").value.trim() || "Let's make today productive",
      semester: $("settingSemester").value.trim() || "Semester 5",
      year: $("settingYear").value.trim() || "2026",
      quote:
        $("settingQuote").value.trim() ||
        "Small steps, soft heart, steady progress.",
    };
    localStorage.setItem(
      "collegePlannerContent",
      JSON.stringify(contentSettings),
    );
    applyContentSettings();
    showSettingsFeedback(t("saved"));
  });
  $("themeSelect")?.addEventListener("change", (event) =>
    applyTheme(event.target.value),
  );
  $("languageSelect")?.addEventListener("change", (event) => {
    applyLanguage(event.target.value);
    renderToday(); renderWeekly(); renderCalendar(); updateNextClass();
    renderSearch($("searchInput").value);
    if ($("deleteScheduleModal")?.classList.contains("open")) renderDeleteScheduleList();
    showSettingsFeedback(currentLanguage === "id" ? "Bahasa Indonesia aktif ♡" : "English is now active ♡");
  });
  $("settingsAddClass")?.addEventListener("click", openModal);
  $("settingsResetData")?.addEventListener("click", () => {
    if (
      !window.confirm(
        t("resetConfirm"),
      )
    )
      return;
    deleteStoredSound();
    [
      "collegePlannerSchedule",
      "collegePlannerContent",
      "collegePlannerTheme",
      "collegePlannerReminders",
      "collegePlannerReminderMinutes",
      "collegePlannerNotified",
      "collegePlannerSoundEnabled",
      "collegePlannerSoundVolume",
      "collegePlannerSoundData",
      "collegePlannerSoundName",
    ].forEach((key) => localStorage.removeItem(key));
    window.location.reload();
  });
  $("settingsReminderToggle")?.addEventListener("change", (event) => {
    remindersEnabled = event.target.checked;
    saveReminderState();
    updateReminderButton();
    if (
      remindersEnabled &&
      "Notification" in window &&
      Notification.permission === "default"
    )
      enableReminders();
    else
      showSettingsFeedback(
        remindersEnabled
          ? t("remindersOn")
          : t("reminderPaused"),
      );
  });
  $("reminderLead")?.addEventListener("change", (event) => {
    reminderMinutes = Number(event.target.value) || 15;
    saveReminderState();
    showSettingsFeedback(currentLanguage === "id" ? `Aku akan mengingatkan ${reminderMinutes} menit sebelum kelas.` : `I will remind you ${reminderMinutes} minutes before class.`);
  });
  $("settingsSoundToggle")?.addEventListener("change", (event) => {
    soundEnabled = event.target.checked;
    saveReminderState();
    showSettingsFeedback(
      soundEnabled
        ? t("soundOn")
        : t("remindersMuted"),
    );
  });
  $("soundVolume")?.addEventListener("input", (event) => {
    soundVolume = Number(event.target.value) / 100;
    $("volumeValue").textContent = `${event.target.value}%`;
    saveReminderState();
  });
  $("testSound")?.addEventListener("click", () => {
    playReminderSound(true);
    showSettingsFeedback(
      customSoundName
        ? `${currentLanguage === "id" ? "Memutar" : "Playing"} “${customSoundName}” ♫`
        : (currentLanguage === "id" ? "Memutar nada planner lembut ♫" : "Playing the soft planner tone ♫"),
    );
  });
  $("settingsSoundFile")?.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    handleSoundFile(file).finally(() => {
      event.target.value = "";
    });
  });
  $("requestNotificationPermission")?.addEventListener(
    "click",
    enableReminders,
  );
  $("settingsDeleteClass")?.addEventListener("click", openDeleteScheduleModal);
  $("closeDeleteSchedule")?.addEventListener("click", closeDeleteScheduleModal);
  $("cancelDeleteSchedule")?.addEventListener("click", closeDeleteScheduleModal);
  $("deleteScheduleModal")?.addEventListener("click", (event) => { if (event.target === $("deleteScheduleModal")) closeDeleteScheduleModal(); });
  $("closeSettings")?.addEventListener("click", () => { toggleSettingsView(false); document.querySelectorAll(".nav-link").forEach((link) => link.classList.toggle("active", link.dataset.section === "home")); });
  document.querySelector(".close-search").addEventListener("click", () => {
    $("searchOverlay").classList.remove("open");
    $("searchOverlay").setAttribute("aria-hidden", "true");
  });
  $("searchOverlay").addEventListener("click", (e) => {
    if (e.target === $("searchOverlay")) {
      $("searchOverlay").classList.remove("open");
      $("searchOverlay").setAttribute("aria-hidden", "true");
    }
  });
  $("searchInput").addEventListener("input", (e) =>
    renderSearch(e.target.value),
  );
  document
    .querySelectorAll("#openAddTop")
    .forEach((btn) => btn.addEventListener("click", openModal));
  $("closeModal").addEventListener("click", closeModal);
  $("cancelModal").addEventListener("click", closeModal);
  $("modal").addEventListener("click", (e) => {
    if (e.target === $("modal")) closeModal();
  });
  $("classForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    if (toMinutes(data.end) <= toMinutes(data.start)) {
      alert(t("endAfterStart"));
      return;
    }
    schedule[data.day] = schedule[data.day] || [];
    schedule[data.day].push({ ...data, custom: true });
    schedule[data.day].sort((a, b) => toMinutes(a.start) - toMinutes(b.start));
    saveSchedule();
    activeDay = data.day;
    document
      .querySelectorAll(".day-tab")
      .forEach((t) =>
        t.classList.toggle("active", t.dataset.day === activeDay),
      );
    renderWeekly();
    renderToday();
    renderCalendar();
    updateNextClass();
    closeModal();
  });
  $("prevMonth").addEventListener("click", () => {
    calendarDate.setMonth(calendarDate.getMonth() - 1);
    renderCalendar();
  });
  $("nextMonth").addEventListener("click", () => {
    calendarDate.setMonth(calendarDate.getMonth() + 1);
    renderCalendar();
  });
  document.querySelectorAll(".nav-link").forEach((link) =>
    link.addEventListener("click", (event) => {
      event.preventDefault();
      document
        .querySelectorAll(".nav-link")
        .forEach((l) =>
          l.classList.toggle(
            "active",
            l.dataset.section === link.dataset.section,
          ),
        );
      const section = link.dataset.section;
      toggleSettingsView(section === "settings", false);
      setTimeout(() => $(section)?.scrollIntoView({ behavior: "smooth", block: "start" }), 40);
    }),
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      closeDeleteScheduleModal();
      $("searchOverlay").classList.remove("open");
      $("searchOverlay").setAttribute("aria-hidden", "true");
    }
  });

  applyLanguage(currentLanguage, false);
  applyTheme(localStorage.getItem("collegePlannerTheme") || "light", false);
  const initialSettingsView = window.location.hash === "#settings";
  toggleSettingsView(initialSettingsView, false);
  if (initialSettingsView) document.querySelectorAll(".nav-link").forEach((link) => link.classList.toggle("active", link.dataset.section === "settings"));
  loadStoredSound();
  if (window.matchMedia) {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener?.("change", () => {
        if (
          (localStorage.getItem("collegePlannerTheme") || "light") === "system"
        )
          applyTheme("system", false);
      });
  }
  document
    .querySelectorAll(".day-tab")
    .forEach((tab) =>
      tab.classList.toggle("active", tab.dataset.day === activeDay),
    );
  updateReminderButton();
  updateDateCopy();
  renderToday();
  renderWeekly();
  renderCalendar();
  updateNextClass();
  checkClassReminders();
  setInterval(() => {
    renderToday();
    updateNextClass();
    checkClassReminders();
  }, 1000);
})();

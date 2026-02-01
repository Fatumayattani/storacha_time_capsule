import "./style.css"

type TimeCapsule = {
  unlockDate: string
  passphrase: string
  message: string
}

const STORAGE_KEY = "timecapsule:v1"

const form = document.getElementById("capsule-form") as HTMLFormElement | null
const statusEl = document.getElementById("status") as HTMLElement | null
const revealEl = document.getElementById("reveal") as HTMLElement | null

const unlockBtn = document.getElementById("unlock-btn") as HTMLButtonElement | null
const unlockInput = document.getElementById("unlock-passphrase") as HTMLInputElement | null

const unlockDateInput = document.getElementById("unlock-date") as HTMLInputElement | null
const passphraseInput = document.getElementById("passphrase") as HTMLInputElement | null
const messageInput = document.getElementById("message") as HTMLTextAreaElement | null

function todayISO(): string {
  return new Date().toISOString().split("T")[0]
}

function saveCapsule(capsule: TimeCapsule): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(capsule))
}

function loadCapsule(): TimeCapsule | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as TimeCapsule
  } catch {
    return null
  }
}

form?.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault()

  if (!unlockDateInput || !passphraseInput || !messageInput || !statusEl) return

  const capsule: TimeCapsule = {
    unlockDate: unlockDateInput.value,
    passphrase: passphraseInput.value,
    message: messageInput.value
  }

  saveCapsule(capsule)
  statusEl.textContent = `Capsule locked until ${capsule.unlockDate}`
})

unlockBtn?.addEventListener("click", () => {
  if (!unlockInput || !revealEl) return

  const capsule = loadCapsule()
  if (!capsule) {
    revealEl.textContent = "No capsule found."
    return
  }

  if (todayISO() < capsule.unlockDate) {
    revealEl.textContent = "Too early. Come back later."
    return
  }

  if (unlockInput.value !== capsule.passphrase) {
    revealEl.textContent = "Wrong secret phrase."
    return
  }

  revealEl.textContent = capsule.message
})

const speech = new SpeechSynthesisUtterance();
const voiceSelect = document.querySelector("select");
let voices = [];

// Function to populate voices
function populateVoices() {
  voices = window.speechSynthesis.getVoices();

  // Clear existing options
  voiceSelect.innerHTML = "";

  // Populate select with voices
  voices.forEach((voice, i) => {
    voiceSelect.options[i] = new Option(voice.name, i);
  });

  // Set initial voice
  if (voices.length > 0) {
    speech.voice = voices[0];
    voiceSelect.selectedIndex = 0;
  }
}

// Initialize voices
populateVoices();

// Handle dynamic voice loading
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

// Handle voice selection
voiceSelect.addEventListener("change", () => {
  const selectedIndex = voiceSelect.value;
  if (voices[selectedIndex]) {
    speech.voice = voices[selectedIndex];
  }
});

// Handle speak button click
document.querySelector("button").addEventListener("click", () => {
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Get new text and speak
  speech.text = document.querySelector("textarea").value;

  // Add error handling
  try {
    window.speechSynthesis.speak(speech);
  } catch (error) {
    console.error("Speech synthesis error:", error);
  }
});

// Reset speech synthesis if page is hidden/shown
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    window.speechSynthesis.cancel();
  }
});

const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
let deferredPrompt;

// Add an event handler for the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default mini-infobar from appearing on mobile
  event.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = event;
  // Update UI to notify the user they can install the PWA
  butInstall.style.display = 'block';

  butInstall.addEventListener('click', async () => {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    // We've used the prompt, so it can't be used again
    deferredPrompt = null;
  });
});

// Add an event handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('App was installed.');
  // Hide the install button
  butInstall.style.display = 'none';
});

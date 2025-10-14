// Settings Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const backButton = document.getElementById('back-to-home');
    const saveButton = document.getElementById('save-settings');
    const resetButton = document.getElementById('reset-settings');
    const childNameInput = document.getElementById('child-name');

    // Load saved settings
    loadSettings();

    // Back to Home button
    backButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    // Save Settings button
    saveButton.addEventListener('click', function() {
        saveSettings();
        showNotification('Settings saved successfully!');
    });

    // Reset Settings button
    resetButton.addEventListener('click', function() {
        resetToDefaults();
        showNotification('Settings reset to defaults!');
    });

    // Load settings from localStorage
    function loadSettings() {
        const savedSettings = localStorage.getItem('echoSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            childNameInput.value = settings.childName || 'Zoe';
        }
    }

    // Save settings to localStorage
    function saveSettings() {
        const settings = {
            childName: childNameInput.value
        };
        localStorage.setItem('echoSettings', JSON.stringify(settings));
    }

    // Reset settings to defaults
    function resetToDefaults() {
        childNameInput.value = 'Zoe';
        saveSettings();
    }

    // Show notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #155724;
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 8px 20px rgba(21, 87, 36, 0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
});

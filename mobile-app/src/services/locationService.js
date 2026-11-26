// Real GPS Location Service — Uses browser Geolocation API
// Works in both browser (Chrome/Firefox) and Capacitor Android APK

/**
 * Get the device's current GPS location.
 * Returns { lat, lng, alt, accuracy } or throws an error with a user-friendly message.
 */
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('GPS is not supported on this device or browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: parseFloat(position.coords.latitude.toFixed(6)),
          lng: parseFloat(position.coords.longitude.toFixed(6)),
          alt: position.coords.altitude ? parseFloat(position.coords.altitude.toFixed(1)) : null,
          accuracy: parseFloat((position.coords.accuracy || 0).toFixed(1)),
          timestamp: new Date().toISOString(),
        });
      },
      (error) => {
        let message = 'Unable to retrieve GPS location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'GPS access was denied. Please allow location permission in your browser/device settings.';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'GPS position is unavailable. Move to an open area and try again.';
            break;
          case error.TIMEOUT:
            message = 'GPS request timed out. Ensure you have a clear view of the sky.';
            break;
        }
        reject(new Error(message));
      },
      {
        enableHighAccuracy: true,   // Use GPS chip (not just cell/Wi-Fi)
        timeout: 15000,             // 15 second timeout
        maximumAge: 30000,          // Accept a cached fix up to 30s old
      }
    );
  });
};

/**
 * Watch the device's location continuously.
 * Returns a watchId that can be passed to stopWatchingLocation().
 */
export const watchLocation = (onUpdate, onError) => {
  if (!navigator.geolocation) {
    onError(new Error('GPS not supported.'));
    return null;
  }
  return navigator.geolocation.watchPosition(
    (position) => {
      onUpdate({
        lat: parseFloat(position.coords.latitude.toFixed(6)),
        lng: parseFloat(position.coords.longitude.toFixed(6)),
        alt: position.coords.altitude ? parseFloat(position.coords.altitude.toFixed(1)) : null,
        accuracy: parseFloat((position.coords.accuracy || 0).toFixed(1)),
        timestamp: new Date().toISOString(),
      });
    },
    (error) => onError(error),
    { enableHighAccuracy: true, maximumAge: 10000 }
  );
};

export const stopWatchingLocation = (watchId) => {
  if (watchId !== null && navigator.geolocation) {
    navigator.geolocation.clearWatch(watchId);
  }
};

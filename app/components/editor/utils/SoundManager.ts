export const createSoundManager = (soundUrl: string = 'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3') => {
    let audioElement: HTMLAudioElement | null = null;
  
    const playNotificationSound = (): void => {
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
      audioElement = new Audio(soundUrl);
      audioElement.play().catch(error => console.error('Error playing audio:', error));
    };
  
    const stopNotificationSound = (): void => {
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
    };
  
  
    return {
      playNotificationSound,
      stopNotificationSound
    };
  };
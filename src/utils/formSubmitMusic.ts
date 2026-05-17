export interface MusicFormData {
  artistName: string;
  email: string;
  phone: string;
  spotifyUrl: string;
  primaryNeed: string;
  budget: string;
  goals: string;
}

const MUSIC_WEBHOOK_URL =
  'https://n8n.spurlocksolutions.ai/webhook/4af9ba75-music-474b-artists-735f3d7a985b';

const PENDING_STORAGE_KEY = 'pendingMusicFormSubmissions';

/**
 * Submit music funnel form data via multiple approaches for reliability.
 */
export async function submitMusicForm(
  formData: MusicFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('Submitting music form data to webhook:', formData);

    const formDataWithMeta = {
      ...formData,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      source: 'music-funnel',
      hostname: window.location.hostname,
      sourceUrl: window.location.href,
    };

    try {
      const directResponse = await fetch(MUSIC_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: window.location.origin,
        },
        mode: 'cors',
        body: JSON.stringify(formDataWithMeta),
      });

      if (directResponse.ok) {
        console.log('Music form submitted successfully via direct request');
        return { success: true };
      }
      console.log('Direct request failed, trying alternate methods...');
    } catch (directError) {
      console.warn('Direct webhook submission failed:', directError);
    }

    try {
      const formElement = document.createElement('form');
      formElement.method = 'POST';
      formElement.action = MUSIC_WEBHOOK_URL;
      formElement.target = '_blank';
      formElement.style.display = 'none';

      for (const [key, value] of Object.entries(formDataWithMeta)) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(value);
        formElement.appendChild(input);
      }

      document.body.appendChild(formElement);
      formElement.submit();
      document.body.removeChild(formElement);

      console.log('Music form submitted via form post method');
      return { success: true };
    } catch (formError) {
      console.warn('Form post submission failed:', formError);
    }

    try {
      const storedSubmissions = JSON.parse(localStorage.getItem(PENDING_STORAGE_KEY) || '[]');
      storedSubmissions.push(formDataWithMeta);
      localStorage.setItem(PENDING_STORAGE_KEY, JSON.stringify(storedSubmissions));

      console.log('Music form data saved to local storage for backup');
      return { success: true };
    } catch (storageError) {
      console.error('All submission methods failed:', storageError);
      return {
        success: false,
        error: 'All submission methods failed. Please try again or contact us directly.',
      };
    }
  } catch (error) {
    console.error('Error submitting music form:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

# **App Name**: Emergency Seva

## Core Features:

- Initial Setup: On first launch, guide users to select their country, province, and district within Nepal. Gracefully handle 'Coming Soon' locations, ensuring the app remains functional and stable. Use local storage to persist these settings for future use.
- Emergency Numbers Display: Display emergency contact numbers based on the selected province/district, prioritizing a simple, clean user interface optimized for all ages. The primary language is Nepali, with an optional English translation.
- Click-to-Call and Share: Enable users to directly call emergency numbers with a single tap and also share contact details with others, improving accessibility during critical situations.
- Offline Access: Implement a local database/cache solution to provide offline access to emergency numbers, enhancing reliability for users with limited or no internet connectivity.
- Admin Notifications: Allows administrators to send push notifications via Firebase Cloud Messaging for announcements like missing person alerts, disaster warnings, and blood requests, optimizing real-time information dissemination. LLM tool validates notification text for clarity and relevance.
- User Feedback Mechanism: Incorporate a feature that allows users to submit feedback and report incorrect numbers. Collect reports and save it to Firestore. Provide easy and low bandwidth methods to report a number and collect location and device metadata when necessary for further verification.
- Dark Mode: Provide a toggle for users to switch between light and dark mode, accommodating different preferences and reducing eye strain in low-light conditions.

## Style Guidelines:

- Primary color: Soft blue (#A8D0E6), inspired by the serene skies of Nepal, for calm and reliability.
- Background color: Light gray (#F0F4F8), offering a clean and gentle backdrop that ensures readability and reduces eye strain.
- Accent color: Warm orange (#F77F00), derived from the vibrant colors of Nepali textiles, to highlight critical CTAs and provide visual focus.
- Headline font: 'PT Sans' (sans-serif) for clarity; Body font: 'PT Sans' (sans-serif) ensures readability, especially for longer Nepali text. Note: currently only Google Fonts are supported.
- Use simple, universally recognizable icons to represent different emergency services, optimizing understanding across all demographics in Nepal.
- A clean, straightforward layout optimized for low-end Android devices, ensuring ease of use and accessibility.
- Subtle, non-intrusive animations for transitions to enhance the user experience without compromising performance or battery life.
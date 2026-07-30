/*
 * GitHub Contribution Configuration
 *
 * This file contains the configuration for the GitHub contribution graph.
 * Update the username to match your GitHub profile.
 */

export const githubConfig = {
  username: 'atishkr25',
  apiUrl: 'https://github-contributions-api.jogruber.de/v4',

  // Display settings
  title: 'GitHub Activity',
  subtitle: 'coding journey over the past year',

  // Chart settings
  blockSize: 11,
  blockMargin: 3,
  fontSize: 12,
  maxLevel: 4,

  // Month labels
  months: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],

  // Weekday labels (empty for weekends, M for Monday, etc.)
  weekdays: ['', 'M', '', 'W', '', 'F', ''],

  // Total count label template
  totalCountLabel: '{{count}} contributions in 2026 on GitHub.',

  // Theme configuration for dark and light modes
  theme: {
    dark: [
      'rgba(255, 255, 255, 0.05)', // Very dark for no contributions
      '#0e4429', // Level 1
      '#006d32', // Level 2
      '#26a641', // Level 3
      '#39d353', // Level 4
    ],
    light: [
      'rgba(0, 0, 0, 0.05)', // No contributions
      'rgba(0, 0, 0, 0.15)', // Level 1
      'rgba(0, 0, 0, 0.3)', // Level 2
      'rgba(0, 0, 0, 0.6)', // Level 3
      'rgba(0, 0, 0, 0.9)', // Level 4
    ],
  },

  // Error state configuration
  errorState: {
    title: 'Unable to load GitHub contributions',
    description: 'Check out my profile directly for the latest activity',
    buttonText: 'View on GitHub',
  },

  // Loading state configuration
  loadingState: {
    title: 'Loading contributions...',
    description: 'Fetching your GitHub activity data',
  },
};
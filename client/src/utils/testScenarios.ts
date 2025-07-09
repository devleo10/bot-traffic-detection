// Test Scenarios for Connection Security
// This file helps you simulate different connection scenarios for testing

/**
 * This function simulates different network conditions and security scenarios
 * for testing how your app responds to various types of connections.
 */
export const simulateScenario = (scenarioName: string) => {
  // Clear any previous simulations
  localStorage.removeItem('TEST_SLOW_NETWORK');
  localStorage.removeItem('TEST_INSECURE_CONNECTION');
  localStorage.removeItem('TEST_BOT_SIGNALS');
  localStorage.removeItem('TEST_VPN_CONNECTION');
  localStorage.removeItem('TEST_TOR_CONNECTION');
  localStorage.removeItem('TEST_DATACENTER_IP');
  
  // Apply the selected scenario
  switch(scenarioName) {
    case 'slow-network':
      localStorage.setItem('TEST_SLOW_NETWORK', 'true');
      console.log('🔶 Testing slow network scenario (connection speed < 1 Mbps)');
      break;
    case 'insecure-connection':
      localStorage.setItem('TEST_INSECURE_CONNECTION', 'true');
      console.log('🔴 Testing insecure connection scenario (non-HTTPS)');
      break;
    case 'bot-signals':
      localStorage.setItem('TEST_BOT_SIGNALS', 'true');
      console.log('🤖 Testing bot signals scenario (suspicious browser fingerprint)');
      break;
    case 'vpn-connection':
      localStorage.setItem('TEST_VPN_CONNECTION', 'true');
      console.log('🔒 Testing VPN connection scenario');
      break;
    case 'tor-connection':
      localStorage.setItem('TEST_TOR_CONNECTION', 'true');
      console.log('🧅 Testing Tor connection scenario');
      break;
    case 'datacenter-ip':
      localStorage.setItem('TEST_DATACENTER_IP', 'true');
      console.log('🖥️ Testing datacenter IP scenario (AWS, Azure, etc.)');
      break;
    case 'secure-connection':
      console.log('✅ Testing secure connection scenario (default good user)');
      break;
    default:
      console.log('❓ Unknown scenario, using default secure connection');
  }
};

/**
 * Clear all test scenarios and return to normal behavior
 */
export const clearTestScenarios = () => {
  localStorage.removeItem('TEST_SLOW_NETWORK');
  localStorage.removeItem('TEST_INSECURE_CONNECTION');
  localStorage.removeItem('TEST_BOT_SIGNALS');
  localStorage.removeItem('TEST_VPN_CONNECTION');
  localStorage.removeItem('TEST_TOR_CONNECTION');
  localStorage.removeItem('TEST_DATACENTER_IP');
  console.log('🧹 Cleared all test scenarios');
};

/**
 * Helper to check what test scenario is currently active
 */
export const getCurrentTestScenario = () => {
  if (localStorage.getItem('TEST_SLOW_NETWORK')) return 'slow-network';
  if (localStorage.getItem('TEST_INSECURE_CONNECTION')) return 'insecure-connection';
  if (localStorage.getItem('TEST_BOT_SIGNALS')) return 'bot-signals';
  if (localStorage.getItem('TEST_VPN_CONNECTION')) return 'vpn-connection';
  if (localStorage.getItem('TEST_TOR_CONNECTION')) return 'tor-connection';
  if (localStorage.getItem('TEST_DATACENTER_IP')) return 'datacenter-ip';
  return 'secure-connection';
};

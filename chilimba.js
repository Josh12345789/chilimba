// chilimba.js

// Function to find who gets the money in the current round
function getCurrentRecipient(group) {
  // Find the member whose position matches the current cycle round
  return group.members.find(member => member.position === group.currentCycleRound);
}

// Function to check who hasn't paid yet for the current round
function getDefaulters(group) {
  return group.members.filter(member => !member.hasPaidCurrentRound);
}

// Function to generate the WhatsApp Reminder notification message
function generateWhatsAppReminder(group) {
  const recipient = getCurrentRecipient(group);
  const unpaidMembers = getDefaulters(group);
  
  let message = `*🇿🇲 ${group.groupName} UPDATE - ROUND ${group.currentCycleRound}* \n\n`;
  message += `💰 *This Round's Payout goes to:* ${recipient.name}\n`;
  message += `💵 *Amount:* K${group.totalPoolValue}\n\n`;
  message += `🚨 *Pending Contributions (K${group.contributionAmount} each):*\n`;
  
  if (unpaidMembers.length === 0) {
    message += `✅ Everyone has paid! Ready to disburse.`;
  } else {
    unpaidMembers.forEach(member => {
      message += `❌ @${member.name} \n`;
    });
    message += `\nPlease send your MoMo to the admin to complete the round!`;
  }
  
  return message;
}

// --- TEST RUNNING THE SCRIPT ---
const recipient = getCurrentRecipient(chilimbaGroup);
console.log(`Current round recipient is: ${recipient.name}`);

const reminderText = generateWhatsAppReminder(chilimbaGroup);
console.log("\n--- Generated WhatsApp Message --- \n");
console.log(reminderText);
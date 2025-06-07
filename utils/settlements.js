function calculateSettlements(transactions) {
  const simplifiedTransactions = transactions.map((tx) => ({
    user: tx.user._id.toString(),
    amount: tx.amount,
    allocation: {
      members: tx.allocation.members.map((member) => ({
        user: member.user._id.toString(),
        amount: member.amount,
      })),
    },
  }));

  const balances = {};

  for (const tx of simplifiedTransactions) {
    const payer = tx.user;
    balances[payer] = (balances[payer] || 0) + tx.amount;

    for (const member of tx.allocation.members) {
      balances[member.user] = (balances[member.user] || 0) - member.amount;
    }
  }

  const creditors = [];
  const debtors = [];

  for (const user in balances) {
    const rounded = Math.round(balances[user] * 100) / 100; // Round to 2 decimals to avoid float issues
    if (rounded > 0) creditors.push([user, rounded]); // User is owed money
    else if (rounded < 0) debtors.push([user, -rounded]); // User owes money
  }

  const settlements = [];
  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const [debtor, debtAmt] = debtors[i];
    const [creditor, creditAmt] = creditors[j];
    const payment = Math.min(debtAmt, creditAmt);

    settlements.push({
      from: debtor,
      to: creditor,
      amount: Math.round(payment * 100) / 100,
    });

    debtors[i][1] -= payment;
    creditors[j][1] -= payment;

    // Math.abs(...) is to handle small floating-point errors. In JS (and most programming languages), floating point arithmetic can result in tiny rounding errors
    if (Math.abs(debtors[i][1]) < 0.01) {
      i++;
    }

    if (Math.abs(creditors[j][1]) < 0.01) {
      j++;
    }
  }

  return settlements;
}

export default calculateSettlements;

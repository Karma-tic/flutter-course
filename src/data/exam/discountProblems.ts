import { DiscountProblemItem } from '../../types';

export const discountProblemsData: DiscountProblemItem[] = [
  {
    id: 'disc-1',
    title: '1. Standard Percentage Discount',
    type: 'Percentage',
    problemStatement: 'Calculate the final payable amount when a product priced at originalPrice receives a discount of discountPercent%.',
    formula: 'discountAmount = (originalPrice * discountPercent) / 100; payable = originalPrice - discountAmount;',
    sampleInputOutput: 'Input: originalPrice = 120.0, discountPercent = 15.0 -> Output: Discount = $18.00, Payable = $102.00',
    dartCode: `double calculatePercentageDiscount(double original, double percent) {
  double discount = (original * percent.clamp(0.0, 100.0)) / 100.0;
  return original - discount;
}`,
    kotlinCode: `fun calculatePercentageDiscount(original: Double, percent: Double): Double {
    val discount = (original * percent.coerceIn(0.0, 100.0)) / 100.0
    return original - discount
}`,
  },
  {
    id: 'disc-2',
    title: '2. Flat Amount Discount',
    type: 'Flat',
    problemStatement: 'A store offers a flat $25 voucher off any purchase. If the bill is less than $25, the payable amount should be $0.00.',
    formula: 'payable = max(0.0, originalPrice - flatDiscount);',
    sampleInputOutput: 'Input: originalPrice = 80.0, voucher = 25.0 -> Output: Payable = $55.00',
    dartCode: `double calculateFlatDiscount(double original, double voucher) {
  double payable = original - voucher;
  return payable < 0.0 ? 0.0 : payable;
}`,
    kotlinCode: `fun calculateFlatDiscount(original: Double, voucher: Double): Double {
    return Math.max(0.0, original - voucher)
}`,
  },
  {
    id: 'disc-3',
    title: '3. Tiered Volume Discount (Slab Rates)',
    type: 'Tiered',
    problemStatement: 'Calculate discounts based on spending tiers: Bill < $100 -> 0%; $100 to $499.99 -> 10%; $500 to $999.99 -> 20%; $1000+ -> 30%.',
    formula: 'Tiered if-else evaluation based on boundary thresholds.',
    sampleInputOutput: 'Input: bill = 650.0 -> Output: Discount (20%) = $130.00, Payable = $520.00',
    dartCode: `double calculateTieredDiscount(double bill) {
  double rate = 0.0;
  if (bill >= 1000.0) {
    rate = 0.30;
  } else if (bill >= 500.0) {
    rate = 0.20;
  } else if (bill >= 100.0) {
    rate = 0.10;
  }
  return bill - (bill * rate);
}`,
    kotlinCode: `fun calculateTieredDiscount(bill: Double): Double {
    val rate = when {
        bill >= 1000.0 -> 0.30
        bill >= 500.0 -> 0.20
        bill >= 100.0 -> 0.10
        else -> 0.0
    }
    return bill - (bill * rate)
}`,
  },
  {
    id: 'disc-4',
    title: '4. Buy 2, Get 1 Free (B2G1)',
    type: 'Promotional',
    problemStatement: 'For every 3 items purchased, the 3rd item is free. Calculate total bill for totalItems each costing unitPrice.',
    formula: 'freeItems = totalItems ~/ 3; payableItems = totalItems - freeItems; total = payableItems * unitPrice;',
    sampleInputOutput: 'Input: totalItems = 7, unitPrice = $10.0 -> Output: 2 Free, 5 Paid -> Total = $50.00',
    dartCode: `double calculateB2G1(int totalItems, double unitPrice) {
  int freeItems = totalItems ~/ 3;
  int payableItems = totalItems - freeItems;
  return payableItems * unitPrice;
}`,
    kotlinCode: `fun calculateB2G1(totalItems: Int, unitPrice: Double): Double {
    val freeItems = totalItems / 3
    val payableItems = totalItems - freeItems
    return payableItems * unitPrice
}`,
  },
  {
    id: 'disc-5',
    title: '5. Buy 3, Get 2 Free (B3G2)',
    type: 'Promotional',
    problemStatement: 'In groups of 5 items (3 + 2), 2 items are free. Calculate bill for totalItems at unitPrice.',
    formula: 'sets = totalItems ~/ 5; freeItems = sets * 2; payableItems = totalItems - freeItems; total = payableItems * unitPrice;',
    sampleInputOutput: 'Input: totalItems = 12, unitPrice = $20.0 -> Output: sets = 2 (4 free) -> 8 paid -> Total = $160.00',
    dartCode: `double calculateB3G2(int totalItems, double unitPrice) {
  int sets = totalItems ~/ 5;
  int remainder = totalItems % 5;
  int freeItems = sets * 2;
  int payableItems = (sets * 3) + remainder;
  return payableItems * unitPrice;
}`,
    kotlinCode: `fun calculateB3G2(totalItems: Int, unitPrice: Double): Double {
    val sets = totalItems / 5
    val remainder = totalItems % 5
    val payableItems = (sets * 3) + remainder
    return payableItems * unitPrice
}`,
  },
  {
    id: 'disc-6',
    title: '6. Discount Followed by GST / Sales Tax',
    type: 'Tax & Compliance',
    problemStatement: 'A product has an original price, receives a 20% discount, and then an 18% GST is levied on the discounted net price.',
    formula: 'discountedPrice = original * (1 - discRate); gst = discountedPrice * (gstRate); final = discountedPrice + gst;',
    sampleInputOutput: 'Input: original = $200.0, disc = 20%, gst = 18% -> Output: discounted = $160.0, gst = $28.80 -> Final = $188.80',
    dartCode: `double calculatePriceWithTax(double original, double discountPercent, double taxPercent) {
  double discountedPrice = original - (original * discountPercent / 100.0);
  double tax = (discountedPrice * taxPercent) / 100.0;
  return discountedPrice + tax;
}`,
    kotlinCode: `fun calculatePriceWithTax(original: Double, discountPercent: Double, taxPercent: Double): Double {
    val discountedPrice = original - (original * discountPercent / 100.0)
    val tax = (discountedPrice * taxPercent) / 100.0
    return discountedPrice + tax
}`,
  },
  {
    id: 'disc-7',
    title: '7. Promo Code with Maximum Cap',
    type: 'Coupon',
    problemStatement: 'Coupon "SAVE20" gives 20% discount up to a maximum cap of $50.',
    formula: 'discount = min(cap, (bill * 20) / 100); payable = bill - discount;',
    sampleInputOutput: 'Input: bill = $400.0 -> 20% = $80.0, capped at $50.0 -> Payable = $350.00',
    dartCode: `double applyCappedCoupon(double bill, double percent, double maxCap) {
  double calculatedDiscount = (bill * percent) / 100.0;
  double actualDiscount = calculatedDiscount > maxCap ? maxCap : calculatedDiscount;
  return bill - actualDiscount;
}`,
    kotlinCode: `fun applyCappedCoupon(bill: Double, percent: Double, maxCap: Double): Double {
    val calculatedDiscount = (bill * percent) / 100.0
    val actualDiscount = Math.min(calculatedDiscount, maxCap)
    return bill - actualDiscount
}`,
  },
  {
    id: 'disc-8',
    title: '8. Senior Citizen / Student Concession Waiver',
    type: 'Concession',
    problemStatement: 'Senior citizens (age >= 60) or students with valid ID receive an extra 15% concession off the ticket price.',
    formula: 'if (age >= 60 || isStudent) bill *= 0.85;',
    sampleInputOutput: 'Input: fare = $100.0, age = 65, isStudent = false -> Output: Payable = $85.00',
    dartCode: `double calculateConcessionFare(double baseFare, int age, bool isStudent) {
  if (age >= 60 || isStudent) {
    return baseFare * 0.85; // 15% concession
  }
  return baseFare;
}`,
    kotlinCode: `fun calculateConcessionFare(baseFare: Double, age: Int, isStudent: Boolean): Double {
    return if (age >= 60 || isStudent) baseFare * 0.85 else baseFare
}`,
  },
  {
    id: 'disc-9',
    title: '9. Festival Compound Discount (Successive Discounts)',
    type: 'Compound',
    problemStatement: 'A product has an initial 20% store discount, and during the festival weekend, an additional 10% is applied on the discounted price.',
    formula: 'price1 = original * (1 - d1); final = price1 * (1 - d2);',
    sampleInputOutput: 'Input: original = $100.0, d1 = 20%, d2 = 10% -> Output: $100 -> $80 -> $72.00 (NOT $70!)',
    dartCode: `double calculateSuccessiveDiscounts(double original, double d1Percent, double d2Percent) {
  double afterFirst = original - (original * d1Percent / 100.0);
  double afterSecond = afterFirst - (afterFirst * d2Percent / 100.0);
  return afterSecond;
}`,
    kotlinCode: `fun calculateSuccessiveDiscounts(original: Double, d1Percent: Double, d2Percent: Double): Double {
    val afterFirst = original - (original * d1Percent / 100.0)
    return afterFirst - (afterFirst * d2Percent / 100.0)
}`,
  },
  {
    id: 'disc-10',
    title: '10. Minimum Purchase Threshold Condition',
    type: 'Conditional',
    problemStatement: 'Customers get a $30 discount, but ONLY if their cart subtotal is at least $150.',
    formula: 'if (subtotal >= 150.0) payable = subtotal - 30.0 else payable = subtotal;',
    sampleInputOutput: 'Input: subtotal = $140.0 -> Output: $140.00; Input: subtotal = $160.0 -> Output: $130.00',
    dartCode: `double calculateThresholdDiscount(double subtotal) {
  if (subtotal >= 150.0) {
    return subtotal - 30.0;
  }
  return subtotal;
}`,
    kotlinCode: `fun calculateThresholdDiscount(subtotal: Double): Double {
    return if (subtotal >= 150.0) subtotal - 30.0 else subtotal
}`,
  },
  {
    id: 'disc-11',
    title: '11. Free Delivery Fee Waiver on Cart Threshold',
    type: 'Delivery',
    problemStatement: 'Standard delivery fee is $15. If order value is $75 or more, delivery is FREE ($0). Calculate final bill.',
    formula: 'delivery = (orderValue >= 75.0) ? 0.0 : 15.0; payable = orderValue + delivery;',
    sampleInputOutput: 'Input: order = $60.0 -> Bill = $75.00; Input: order = $80.0 -> Bill = $80.00',
    dartCode: `double calculateTotalWithDelivery(double orderValue) {
  double deliveryFee = orderValue >= 75.0 ? 0.0 : 15.0;
  return orderValue + deliveryFee;
}`,
    kotlinCode: `fun calculateTotalWithDelivery(orderValue: Double): Double {
    val deliveryFee = if (orderValue >= 75.0) 0.0 else 15.0
    return orderValue + deliveryFee
}`,
  },
  {
    id: 'disc-12',
    title: '12. Early Bird Registration Discount',
    type: 'Time-Based',
    problemStatement: 'Students enrolling more than 30 days before course start get a 25% early bird discount; 15-30 days gets 10%; < 15 days gets 0%.',
    formula: 'Tiered evaluation based on daysBeforeStart integer.',
    sampleInputOutput: 'Input: fee = $1000.0, days = 35 -> Output: $750.00',
    dartCode: `double calculateEarlyBirdFee(double fee, int daysBeforeStart) {
  if (daysBeforeStart >= 30) {
    return fee * 0.75;
  } else if (daysBeforeStart >= 15) {
    return fee * 0.90;
  }
  return fee;
}`,
    kotlinCode: `fun calculateEarlyBirdFee(fee: Double, daysBeforeStart: Int): Double {
    return when {
        daysBeforeStart >= 30 -> fee * 0.75
        daysBeforeStart >= 15 -> fee * 0.90
        else -> fee
    }
}`,
  },
  {
    id: 'disc-13',
    title: '13. Online Payment vs Cash-on-Delivery (COD) Incentive',
    type: 'Payment Method',
    problemStatement: 'Users paying via Online Card/UPI get an extra 5% instant cashback/discount; COD orders pay full price + $5 handling fee.',
    formula: 'online: bill * 0.95; cod: bill + 5.0;',
    sampleInputOutput: 'Input: bill = $100.0, isOnline = true -> Output: $95.00',
    dartCode: `double calculatePaymentMethodTotal(double bill, bool isOnlinePayment) {
  if (isOnlinePayment) {
    return bill * 0.95; // 5% discount
  } else {
    return bill + 5.0; // $5 COD fee
  }
}`,
    kotlinCode: `fun calculatePaymentMethodTotal(bill: Double, isOnlinePayment: Boolean): Double {
    return if (isOnlinePayment) bill * 0.95 else bill + 5.0
}`,
  },
  {
    id: 'disc-14',
    title: '14. Wholesale Bulk Quantity Discount',
    type: 'Wholesale',
    problemStatement: 'Single item price is $10. Buying 50-99 units drops price to $8.50 each. Buying 100+ units drops price to $7.00 each.',
    formula: 'unitPrice = if (qty >= 100) 7.0 else if (qty >= 50) 8.5 else 10.0; total = qty * unitPrice;',
    sampleInputOutput: 'Input: quantity = 60 -> Output: 60 * $8.50 = $510.00',
    dartCode: `double calculateWholesaleTotal(int quantity) {
  double unitPrice = 10.0;
  if (quantity >= 100) {
    unitPrice = 7.0;
  } else if (quantity >= 50) {
    unitPrice = 8.50;
  }
  return quantity * unitPrice;
}`,
    kotlinCode: `fun calculateWholesaleTotal(quantity: Int): Double {
    val unitPrice = when {
        quantity >= 100 -> 7.0
        quantity >= 50 -> 8.50
        else -> 10.0
    }
    return quantity * unitPrice
}`,
  },
  {
    id: 'disc-15',
    title: '15. Loyalty Membership Points Redemption',
    type: 'Loyalty',
    problemStatement: 'Every 100 loyalty points equals $1 discount. A user can redeem points up to a maximum of 50% of their total bill.',
    formula: 'pointsValue = points / 100.0; maxUsable = bill * 0.50; discount = min(pointsValue, maxUsable); payable = bill - discount;',
    sampleInputOutput: 'Input: bill = $100.0, points = 8000 ($80 value) -> Capped at $50 -> Payable = $50.00',
    dartCode: `double redeemLoyaltyPoints(double bill, int points) {
  double pointsValue = points / 100.0;
  double maxDiscountAllowed = bill * 0.50;
  double actualDiscount = pointsValue > maxDiscountAllowed ? maxDiscountAllowed : pointsValue;
  return bill - actualDiscount;
}`,
    kotlinCode: `fun redeemLoyaltyPoints(bill: Double, points: Int): Double {
    val pointsValue = points / 100.0
    val maxDiscountAllowed = bill * 0.50
    val actualDiscount = Math.min(pointsValue, maxDiscountAllowed)
    return bill - actualDiscount
}`,
  },
  {
    id: 'disc-16',
    title: '16. Trade-in Device Exchange Valuation',
    type: 'Exchange',
    problemStatement: 'Customer purchases a new smartphone for $800. Their old phone exchange value is $220. Calculate final balance.',
    formula: 'payable = max(0.0, newDevicePrice - exchangeValuation);',
    sampleInputOutput: 'Input: newPrice = $800.0, exchange = $220.0 -> Output: $580.00',
    dartCode: `double calculateExchangeBalance(double newPrice, double exchangeValue) {
  return (newPrice - exchangeValue).clamp(0.0, double.infinity);
}`,
    kotlinCode: `fun calculateExchangeBalance(newPrice: Double, exchangeValue: Double): Double {
    return Math.max(0.0, newPrice - exchangeValue)
}`,
  },
  {
    id: 'disc-17',
    title: '17. Cash Bill Rounding (Rounding to Nearest 5 Cents / Currency Unit)',
    type: 'Rounding',
    problemStatement: 'In cash transactions, rounding to the nearest 0.05 currency unit is required.',
    formula: 'rounded = (total * 20).roundToDouble() / 20;',
    sampleInputOutput: 'Input: $12.33 -> Output: $12.35; Input: $12.31 -> Output: $12.30',
    dartCode: `double roundToNearestFiveCents(double amount) {
  return (amount * 20.0).roundToDouble() / 20.0;
}`,
    kotlinCode: `fun roundToNearestFiveCents(amount: Double): Double {
    return Math.round(amount * 20.0).toDouble() / 20.0
}`,
  },
  {
    id: 'disc-18',
    title: '18. Combo Bundle Package Discount',
    type: 'Bundle',
    problemStatement: 'Course A is $200, Course B is $150. Buying both as a "Full Stack Bundle" gives an automatic 30% bundle discount.',
    formula: 'total = (hasA && hasB) ? (priceA + priceB) * 0.70 : individualSum;',
    sampleInputOutput: 'Input: both courses -> ($200 + $150 = $350) * 0.70 = $245.00',
    dartCode: `double calculateBundleDiscount(bool hasCourseA, bool hasCourseB) {
  double priceA = 200.0;
  double priceB = 150.0;
  if (hasCourseA && hasCourseB) {
    return (priceA + priceB) * 0.70; // 30% off combo
  }
  return (hasCourseA ? priceA : 0.0) + (hasCourseB ? priceB : 0.0);
}`,
    kotlinCode: `fun calculateBundleDiscount(hasCourseA: Boolean, hasCourseB: Boolean): Double {
    val priceA = 200.0
    val priceB = 150.0
    return if (hasCourseA && hasCourseB) {
        (priceA + priceB) * 0.70
    } else {
        (if (hasCourseA) priceA else 0.0) + (if (hasCourseB) priceB else 0.0)
    }
}`,
  },
  {
    id: 'disc-19',
    title: '19. Black Friday Flash Sale with Minimum Cart Cap',
    type: 'Flash Sale',
    problemStatement: '50% off on all items, but total discount per customer cannot exceed $150.',
    formula: 'discount = min(150.0, cartTotal * 0.50); payable = cartTotal - discount;',
    sampleInputOutput: 'Input: cartTotal = $500.0 -> 50% = $250 -> Capped at $150 -> Payable = $350.00',
    dartCode: `double calculateFlashSale(double cartTotal) {
  double calculatedDiscount = cartTotal * 0.50;
  double cappedDiscount = calculatedDiscount > 150.0 ? 150.0 : calculatedDiscount;
  return cartTotal - cappedDiscount;
}`,
    kotlinCode: `fun calculateFlashSale(cartTotal: Double): Double {
    val calculatedDiscount = cartTotal * 0.50
    val cappedDiscount = Math.min(150.0, calculatedDiscount)
    return cartTotal - cappedDiscount
}`,
  },
  {
    id: 'disc-20',
    title: '20. Progressive Multi-Bracket Income / Bill Slabs',
    type: 'Progressive Slab',
    problemStatement: 'Progressive discount: First $100 has 0% discount; next $400 ($101-$500) gets 10%; any amount above $500 gets 25%.',
    formula: 'Calculate discount in slices for each bracket.',
    sampleInputOutput: 'Input: bill = $700.0 -> First 100 = $0; Next 400 * 0.10 = $40; Remaining 200 * 0.25 = $50 -> Total Disc = $90 -> Payable = $610.00',
    dartCode: `double calculateProgressiveSlabDiscount(double bill) {
  double discount = 0.0;
  if (bill > 500.0) {
    discount += (bill - 500.0) * 0.25;
    discount += 400.0 * 0.10; // $40 for the 100-500 slice
  } else if (bill > 100.0) {
    discount += (bill - 100.0) * 0.10;
  }
  return bill - discount;
}`,
    kotlinCode: `fun calculateProgressiveSlabDiscount(bill: Double): Double {
    var discount = 0.0
    if (bill > 500.0) {
        discount += (bill - 500.0) * 0.25
        discount += 400.0 * 0.10
    } else if (bill > 100.0) {
        discount += (bill - 100.0) * 0.10
    }
    return bill - discount
}`,
  },
];


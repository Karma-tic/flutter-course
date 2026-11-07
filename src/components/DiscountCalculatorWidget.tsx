import React, { useState } from 'react';
import { Calculator, Percent, DollarSign, Receipt, Sparkles } from 'lucide-react';

export const DiscountCalculatorWidget: React.FC = () => {
  const [originalPrice, setOriginalPrice] = useState<number>(1000);
  const [discountPercent, setDiscountPercent] = useState<number>(15);
  const [taxPercent, setTaxPercent] = useState<number>(18);
  const [couponCode, setCouponCode] = useState<string>('SAVE50');
  const [appliedCouponValue, setAppliedCouponValue] = useState<number>(50);

  // Calculations
  const discountAmount = (originalPrice * discountPercent) / 100;
  const priceAfterDiscount = Math.max(0, originalPrice - discountAmount);
  const couponDiscount = Math.min(priceAfterDiscount, appliedCouponValue);
  const taxableAmount = Math.max(0, priceAfterDiscount - couponDiscount);
  const taxAmount = (taxableAmount * taxPercent) / 100;
  const finalPayable = taxableAmount + taxAmount;
  const totalSavings = originalPrice > 0 ? originalPrice - finalPayable + taxAmount : 0;

  const handleCouponApply = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'SAVE50') {
      setAppliedCouponValue(50);
    } else if (code === 'FLUTTER100') {
      setAppliedCouponValue(100);
    } else if (code === 'SUPER200') {
      setAppliedCouponValue(200);
    } else {
      setAppliedCouponValue(0);
    }
  };

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-neutral-200 bg-neutral-50 px-6 py-4 dark:border-neutral-800 dark:bg-neutral-950/60">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-flutter-500/10 text-flutter-600 dark:text-flutter-400">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
            Interactive Commercial Discount & Bill Calculator
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Experiment with prices, tiered percentages, coupons, and tax/GST with live step-by-step breakdown
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
        {/* Left Inputs */}
        <div className="md:col-span-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              Original Item Price (₹ / $)
            </label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                <DollarSign className="h-4 w-4" />
              </span>
              <input
                type="number"
                min="0"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-4 py-2.5 text-sm text-neutral-900 focus:border-flutter-500 focus:outline-hidden dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Discount (%)
              </label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                  <Percent className="h-4 w-4" />
                </span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Math.min(100, Math.max(0, Number(e.target.value))))}
                  className="w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-4 py-2.5 text-sm text-neutral-900 focus:border-flutter-500 focus:outline-hidden dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Tax / GST (%)
              </label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                  <Receipt className="h-4 w-4" />
                </span>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={taxPercent}
                  onChange={(e) => setTaxPercent(Math.min(50, Math.max(0, Number(e.target.value))))}
                  className="w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-4 py-2.5 text-sm text-neutral-900 focus:border-flutter-500 focus:outline-hidden dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              Coupon Code (Try: SAVE50, FLUTTER100, SUPER200)
            </label>
            <div className="mt-1 flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm uppercase text-neutral-900 focus:border-flutter-500 focus:outline-hidden dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
              />
              <button
                type="button"
                onClick={handleCouponApply}
                className="rounded-xl bg-neutral-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                Apply
              </button>
            </div>
            {appliedCouponValue > 0 ? (
              <span className="mt-1 inline-block text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                ✓ Coupon applied: -${appliedCouponValue.toFixed(2)} off!
              </span>
            ) : couponCode.trim() ? (
              <span className="mt-1 inline-block text-[11px] font-medium text-amber-600 dark:text-amber-400">
                Invalid code. Try &ldquo;SAVE50&rdquo; or &ldquo;FLUTTER100&rdquo;.
              </span>
            ) : null}
          </div>
        </div>

        {/* Right Bill Receipt */}
        <div className="md:col-span-6 rounded-xl border border-neutral-200 bg-neutral-50/70 p-5 dark:border-neutral-800 dark:bg-neutral-950/40 space-y-3">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-2.5 dark:border-neutral-800">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Invoice Item Breakdown
            </span>
            <span className="rounded-full bg-flutter-100 px-2 py-0.5 text-[10px] font-bold text-flutter-800 dark:bg-flutter-900/60 dark:text-flutter-300">
              Live Computed
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
              <span>Original Base Price:</span>
              <span className="font-mono font-medium text-neutral-900 dark:text-neutral-100">
                ${originalPrice.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
              <span>Discount ({discountPercent}%):</span>
              <span className="font-mono font-medium text-red-600 dark:text-red-400">
                -${discountAmount.toFixed(2)}
              </span>
            </div>

            {appliedCouponValue > 0 && (
              <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                <span>Coupon ({couponCode.toUpperCase()}):</span>
                <span className="font-mono font-medium text-red-600 dark:text-red-400">
                  -${couponDiscount.toFixed(2)}
                </span>
              </div>
            )}

            <div className="flex justify-between border-t border-dashed border-neutral-200 pt-2 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
              <span>Taxable Subtotal:</span>
              <span className="font-mono font-medium text-neutral-900 dark:text-neutral-100">
                ${taxableAmount.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
              <span>Tax / GST ({taxPercent}%):</span>
              <span className="font-mono font-medium text-neutral-900 dark:text-neutral-100">
                +${taxAmount.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-neutral-300 pt-3 text-sm font-bold text-neutral-900 dark:border-neutral-700 dark:text-neutral-100">
              <span>Total Payable Amount:</span>
              <span className="font-mono text-base text-flutter-600 dark:text-flutter-400">
                ${finalPayable.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Formula Walkthrough */}
          <div className="mt-3 rounded-lg bg-neutral-100/90 p-3 text-[11px] text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400 space-y-1">
            <div className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-flutter-500" />
              Under the Hood Math:
            </div>
            <div>
              1. Discount = ${originalPrice} × {discountPercent}% = <span className="font-mono">${discountAmount.toFixed(2)}</span>
            </div>
            <div>
              2. Tax = (${taxableAmount.toFixed(2)}) × {taxPercent}% = <span className="font-mono">${taxAmount.toFixed(2)}</span>
            </div>
            <div>
              3. Final = ${taxableAmount.toFixed(2)} + ${taxAmount.toFixed(2)} = <span className="font-mono font-bold text-neutral-900 dark:text-neutral-100">${finalPayable.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


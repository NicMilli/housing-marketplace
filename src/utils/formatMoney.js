let formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
    trailingZeroDisplay: 'lessPrecision',
   // maximumFractionDigits: 0,
})

export default function formatMoney(price) {
    return formatter.format(price)
  }
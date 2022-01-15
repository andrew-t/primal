export function isPrime(n) {
	const m = Math.sqrt(n);
	for (let i = 2; i <= m; i++)
		if (n % i == 0) return false;
	return true;
}

export const primes = [];
for (let i = 10000; i < 100000; ++i)
	if (isPrime(i)) primes.push(i);

import { digitGenerator } from "./pi"

describe('Calculates PI correctly', () => {
    test('first digit matches', () => {
        const digits = digitGenerator()
        expect(digits.next().value).toBe(3)
    })

    test('first 10 decimal places matche', () => {
        const expectedDecimals = [1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9]
        const digits = digitGenerator()
        digits.next()
        expectedDecimals.forEach(d => {
            expect(digits.next().value).toBe(d)
        });
    })
})
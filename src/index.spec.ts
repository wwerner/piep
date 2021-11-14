import { foo } from "."

describe('Sample Test', () => {
    test('returns foo', () => {
        expect(foo()).toBe('foo')
    })
})